/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {
  errorCodes,
  isErrorWithCode,
  pick,
  types,
} from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import type {FileHandle, UploadRequest} from '@axelor/app-bridge';
import {uploadFile} from '@axelor/app-bridge/protocol';
import type {CameraPhoto} from '../features/cameraSlice';
import {downloadToFile, filesCacheDir} from './bundles';
import {HostError} from './protocol';

/* A picked file as the host keeps it; the page only gets its handle */
export type PickedFile = {
  uri: string;
  name: string;
  type: string;
  size: number;
  /* Written by the host (camera photos); deleted when the page closes */
  temporary?: boolean;
};

const DEFAULT_TYPE = 'application/octet-stream';

export async function pickDocuments(
  accept: string[] | undefined,
  multiple: boolean,
): Promise<PickedFile[] | null> {
  try {
    const picked = await pick({
      type: accept != null && accept.length > 0 ? accept : [types.allFiles],
      allowMultiSelection: multiple,
    });
    return picked.map(file => ({
      uri: file.uri,
      name: file.name ?? 'file',
      type: file.type ?? DEFAULT_TYPE,
      size: file.size ?? 0,
    }));
  } catch (error) {
    if (
      isErrorWithCode(error) &&
      error.code === errorCodes.OPERATION_CANCELED
    ) {
      return null;
    }
    throw error;
  }
}

/* The camera hands back base64; it is written to a file so it uploads like any picked file */
export async function savePhoto(photo: CameraPhoto): Promise<PickedFile> {
  const path = `${RNFS.CachesDirectoryPath}/${Date.now()}-${photo.name}`;
  await RNFS.writeFile(path, photo.base64, 'base64');
  return {
    uri: `file://${path}`,
    name: photo.name,
    type: photo.type || DEFAULT_TYPE,
    size: photo.size,
    temporary: true,
  };
}

export function toHandle(ref: string, file: PickedFile): FileHandle {
  return {ref, name: file.name, type: file.type, size: file.size};
}

type UploadContext = {
  baseUrl: string;
  csrfToken: string | null;
  onProgress?: (sent: number, total: number) => void;
};

/*
 * Uploads from the file's URI: fetch gives a native-backed Blob, so the content is
 * not copied into JavaScript. Requests use the app's cookie jar for the session.
 */
export async function uploadPickedFile(
  file: PickedFile,
  request: UploadRequest,
  {baseUrl, csrfToken, onProgress}: UploadContext,
): Promise<unknown> {
  const {path, ...options} = request;
  const endpoint = (path ?? 'ws/files/upload').replace(/^\/+/, '');
  /* Requests carry the user's session, so they only go to the AOS server */
  if (/^[a-z][a-z0-9+.-]*:/i.test(endpoint)) {
    throw new HostError('forbidden', `${endpoint} is outside the AOS server`);
  }
  const url = `${baseUrl.replace(/\/+$/, '')}/${endpoint}`;
  const blob = await (await fetch(file.uri)).blob();
  return uploadFile(
    {
      blob,
      name: file.name,
      type: file.type,
      /* React Native reads a { uri, name, type } form part from disk */
      appendTo: (form, field) =>
        form.append(field, {
          uri: file.uri,
          name: file.name,
          type: file.type,
        } as unknown as Blob),
    },
    {
      url,
      headers: csrfToken != null ? {'X-CSRF-Token': csrfToken} : {},
      withCredentials: true,
    },
    {...options, onProgress},
  );
}

const FILES_CACHE_LIMIT_BYTES = 50 * 1024 * 1024;

/*
 * Only types the page displays keep an extension; anything else is stored without
 * one, so a file named e.g. page.html is never read as a web page.
 */
const DISPLAY_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.bmp',
  '.svg',
  '.pdf',
]);

/* Used when the server does not name the file */
const EXTENSIONS: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
  'application/pdf': '.pdf',
};

/* djb2: a short, stable file name for a path */
function hashPath(path: string): string {
  let hash = 5381;
  for (let index = 0; index < path.length; index += 1) {
    hash = (hash * 33 + path.charCodeAt(index)) % 4294967296;
  }
  return `${hash.toString(16).padStart(8, '0')}-${path.length}`;
}

async function findCached(cacheDir: string, key: string) {
  if (!(await RNFS.exists(cacheDir))) {
    return null;
  }
  const entries = await RNFS.readDir(cacheDir);
  return (
    entries.find(
      entry =>
        entry.isFile() &&
        !entry.name.endsWith('.part') &&
        entry.name.split('.')[0] === key,
    ) ?? null
  );
}

/* Keeps the cache under its limit by removing the least recently written files, except the one just added */
async function trimCache(cacheDir: string, keepPath: string) {
  const entries = (await RNFS.readDir(cacheDir)).filter(
    entry => entry.isFile() && entry.path !== keepPath,
  );
  let total = entries.reduce((sum, entry) => sum + Number(entry.size), 0);
  const oldestFirst = [...entries].sort(
    (left, right) =>
      (left.mtime?.getTime() ?? 0) - (right.mtime?.getTime() ?? 0),
  );
  for (const entry of oldestFirst) {
    if (total <= FILES_CACHE_LIMIT_BYTES) {
      break;
    }
    await RNFS.unlink(entry.path);
    total -= Number(entry.size);
  }
}

type FileUrlContext = {
  baseUrl: string | null;
  refresh: boolean;
  /* Called before downloading; rejects when AOS cannot be reached */
  ensureOnline: () => Promise<void>;
};

const downloadsInProgress = new Map<string, Promise<string>>();

/*
 * A local copy of a file served by AOS, as a file:// URL the app's WebView can load.
 * It is downloaded once with the app's session and reused, also offline. Calls for
 * the same file while it downloads share that download.
 */
export function cachedFileUrl(
  appId: string,
  path: string,
  context: FileUrlContext,
): Promise<string> {
  const endpoint = path.replace(/^\/+/, '');
  if (/^[a-z][a-z0-9+.-]*:/i.test(endpoint)) {
    return Promise.reject(
      new HostError('forbidden', `${endpoint} is outside the AOS server`),
    );
  }
  const inProgressKey = `${appId}:${endpoint}`;
  const running = downloadsInProgress.get(inProgressKey);
  if (running != null) {
    return running;
  }
  const download = resolveFileUrl(appId, endpoint, context).finally(() =>
    downloadsInProgress.delete(inProgressKey),
  );
  downloadsInProgress.set(inProgressKey, download);
  return download;
}

async function resolveFileUrl(
  appId: string,
  endpoint: string,
  {baseUrl, refresh, ensureOnline}: FileUrlContext,
): Promise<string> {
  const cacheDir = filesCacheDir(appId);
  const key = hashPath(endpoint);
  const cached = await findCached(cacheDir, key);
  if (cached != null && !refresh) {
    return `file://${cached.path}`;
  }

  await ensureOnline();
  if (baseUrl == null) {
    throw new HostError('offline', 'Not connected to a server');
  }
  await RNFS.mkdir(cacheDir);
  const partialPath = `${cacheDir}/${key}.part`;
  const {contentType, fileName} = await downloadToFile(
    `${baseUrl.replace(/\/+$/, '')}/${endpoint}`,
    partialPath,
  ).catch((error: {message?: string; response?: {status?: number}}) => {
    const status = error?.response?.status;
    const message = error?.message ?? `Download of ${endpoint} failed`;
    throw new HostError(
      status === 404
        ? 'not_found'
        : status === 401 || status === 403
          ? 'forbidden'
          : status == null
            ? 'network'
            : 'server',
      message,
    );
  });
  /* A lost session answers with the login page instead of the file */
  if (contentType?.startsWith('text/html')) {
    await RNFS.unlink(partialPath).catch(() => undefined);
    throw new HostError('forbidden', `${endpoint} returned a web page`);
  }
  /* file:// has no Content-Type, so the WebView reads the type from the extension */
  const mimeType = (contentType ?? '').split(';')[0].trim();
  const namedExtension = fileName
    ?.match(/\.[A-Za-z0-9]{1,8}$/)?.[0]
    ?.toLowerCase();
  const extension = namedExtension ?? EXTENSIONS[mimeType] ?? '';
  const target = `${cacheDir}/${key}${
    DISPLAY_EXTENSIONS.has(extension) ? extension : ''
  }`;
  if (cached != null) {
    await RNFS.unlink(cached.path).catch(() => undefined);
  }
  await RNFS.moveFile(partialPath, target);
  await trimCache(cacheDir, target);
  return `file://${target}`;
}

export async function deleteTemporaryFiles(files: Iterable<PickedFile>) {
  for (const file of files) {
    if (file.temporary) {
      await RNFS.unlink(file.uri.replace(/^file:\/\//, '')).catch(
        () => undefined,
      );
    }
  }
}
