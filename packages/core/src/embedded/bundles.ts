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

import axios from 'axios';
import RNFS from 'react-native-fs';
import {PROTOCOL_VERSION} from './protocol';

export type EmbeddedBundle = {
  id: string;
  version: string;
  /* file:// URL of the folder holding index.html, ending with a slash */
  dir: string;
};

export type EmbeddedManifestFile = {
  path: string;
  size: number;
  sha256: string;
};

export type EmbeddedManifest = {
  id: string;
  version: string;
  protocol: number;
  entry: string;
  files: EmbeddedManifestFile[];
};

const MANIFEST_FILE = 'manifest.json';
const COMPLETE_MARKER = '.complete';
const CURRENT_FILE = 'current.json';

const MANIFEST_TIMEOUT_MS = 15_000;
const FILE_TIMEOUT_MS = 60_000;

/* Manifest values end up in file system paths, so they must stay inside the app folder */
const SAFE_VERSION = /^[A-Za-z0-9._+-]+$/;
const SAFE_SEGMENT = /^[A-Za-z0-9._@-]+$/;

export class BundleError extends Error {
  constructor(
    message: string,
    readonly code: string,
  ) {
    super(message);
  }
}

function isSafeVersion(version: string): boolean {
  return SAFE_VERSION.test(version) && version !== '.' && version !== '..';
}

function isSafeFilePath(path: string): boolean {
  const segments = path.split('/');
  return segments.every(
    segment =>
      SAFE_SEGMENT.test(segment) && segment !== '.' && segment !== '..',
  );
}

function parseManifest(content: string): EmbeddedManifest {
  const manifest = JSON.parse(content) as Partial<EmbeddedManifest>;
  if (
    typeof manifest.id !== 'string' ||
    typeof manifest.version !== 'string' ||
    typeof manifest.entry !== 'string' ||
    !Array.isArray(manifest.files)
  ) {
    throw new BundleError('Invalid embedded app manifest', 'bad_manifest');
  }
  if (
    !isSafeVersion(manifest.version) ||
    !manifest.files.every(
      file => typeof file?.path === 'string' && isSafeFilePath(file.path),
    )
  ) {
    throw new BundleError(
      'Embedded app manifest has an unsafe version or file path',
      'bad_manifest',
    );
  }
  return manifest as EmbeddedManifest;
}

function joinUrl(base: string, path: string): string {
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

function appRoot(appId: string): string {
  return `${RNFS.DocumentDirectoryPath}/embedded/${appId}`;
}

/* Files the app displays (files.url) are kept next to its versions, so the WebView can read them */
const FILES_CACHE = '.files';

export function filesCacheDir(appId: string): string {
  return `${appRoot(appId)}/${FILES_CACHE}`;
}

/* file:// URL of everything the app's WebView may read: its versions and its file cache */
export function appFolderUrl(appId: string): string {
  return `file://${appRoot(appId)}/`;
}

function toBundle(appId: string, version: string): EmbeddedBundle {
  return {
    id: appId,
    version,
    dir: `file://${appRoot(appId)}/${version}/`,
  };
}

async function isComplete(versionDir: string): Promise<boolean> {
  return RNFS.exists(`${versionDir}/${COMPLETE_MARKER}`);
}

export async function readCachedBundle(
  appId: string,
): Promise<EmbeddedBundle | null> {
  const currentPath = `${appRoot(appId)}/${CURRENT_FILE}`;
  if (!(await RNFS.exists(currentPath))) {
    return null;
  }
  const {version} = JSON.parse(await RNFS.readFile(currentPath, 'utf8')) as {
    version?: string;
  };
  if (
    version == null ||
    !isSafeVersion(version) ||
    !(await isComplete(`${appRoot(appId)}/${version}`))
  ) {
    return null;
  }
  return toBundle(appId, version);
}

/* The previous version is kept too: a screen may still be running it */
async function removeOtherVersions(appId: string, keepVersions: string[]) {
  const entries = await RNFS.readDir(appRoot(appId));
  await Promise.all(
    entries
      .filter(
        entry =>
          entry.isDirectory() &&
          entry.name !== FILES_CACHE &&
          !keepVersions.includes(entry.name),
      )
      .map(entry => RNFS.unlink(entry.path)),
  );
}

export type DownloadOptions = {
  appId: string;
  /* Folder of the app inside the AOS webapp, e.g. "embed-demo" */
  remotePath: string;
  baseUrl: string;
  onProgress?: (downloadedFiles: number, totalFiles: number) => void;
};

const syncsInProgress = new Map<string, Promise<EmbeddedBundle>>();

/*
 * One sync per app at a time: a prefetch after login and a screen opening the
 * same app share the download instead of writing the same files twice.
 */
export function syncDownloadedBundle(
  options: DownloadOptions,
): Promise<EmbeddedBundle> {
  const running = syncsInProgress.get(options.appId);
  if (running != null) {
    return running;
  }
  const sync = runSync(options).finally(() =>
    syncsInProgress.delete(options.appId),
  );
  syncsInProgress.set(options.appId, sync);
  return sync;
}

/*
 * Goes through axios without the app's interceptors: requests still carry the
 * session from the native cookie jar, like every other API call.
 */
const fileClient = axios.create({timeout: FILE_TIMEOUT_MS});

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = String(reader.result ?? '');
      resolve(dataUrl.slice(dataUrl.indexOf(',') + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export type DownloadedFile = {
  contentType: string | null;
  /* From Content-Disposition, when the server names the file */
  fileName: string | null;
};

function readFileName(disposition: unknown): string | null {
  if (typeof disposition !== 'string') {
    return null;
  }
  const encoded = disposition.match(/filename\*\s*=\s*[^']*''([^;]+)/i);
  if (encoded != null) {
    try {
      return decodeURIComponent(encoded[1].trim());
    } catch {
      return null;
    }
  }
  const plain = disposition.match(/filename\s*=\s*"?([^";]+)"?/i);
  return plain != null ? plain[1].trim() : null;
}

export async function downloadToFile(
  url: string,
  target: string,
): Promise<DownloadedFile> {
  const response = await fileClient.get(url, {responseType: 'blob'});
  await RNFS.writeFile(target, await blobToBase64(response.data), 'base64');
  const contentType = response.headers?.['content-type'];
  return {
    contentType: typeof contentType === 'string' ? contentType : null,
    fileName: readFileName(response.headers?.['content-disposition']),
  };
}

/*
 * Makes sure the latest published version is cached, downloading it when it is not.
 * Files go to a temporary folder and are checked against the manifest hashes; the
 * version only becomes current once every file is there and verified.
 */
async function runSync({
  appId,
  remotePath,
  baseUrl,
  onProgress,
}: DownloadOptions): Promise<EmbeddedBundle> {
  const remoteRoot = joinUrl(baseUrl, remotePath);
  const response = await fileClient.get(joinUrl(remoteRoot, MANIFEST_FILE), {
    timeout: MANIFEST_TIMEOUT_MS,
  });
  const manifest = parseManifest(
    typeof response?.data === 'string'
      ? response.data
      : JSON.stringify(response?.data),
  );

  if (manifest.id !== appId) {
    throw new BundleError(
      `Manifest is for ${manifest.id}, expected ${appId}`,
      'bad_manifest',
    );
  }
  if (manifest.protocol !== PROTOCOL_VERSION) {
    throw new BundleError(
      `App needs bridge protocol ${manifest.protocol}, this app supports ${PROTOCOL_VERSION}`,
      'bad_version',
    );
  }

  const versionDir = `${appRoot(appId)}/${manifest.version}`;
  if (!(await isComplete(versionDir))) {
    const partialDir = `${versionDir}.part`;
    if (await RNFS.exists(partialDir)) {
      await RNFS.unlink(partialDir);
    }

    let downloadedFiles = 0;
    for (const file of manifest.files) {
      const target = `${partialDir}/${file.path}`;
      await RNFS.mkdir(target.slice(0, target.lastIndexOf('/')));
      await downloadToFile(joinUrl(remoteRoot, file.path), target).catch(
        error => {
          throw new BundleError(
            `Download of ${file.path} failed: ${error?.message ?? error}`,
            'download_failed',
          );
        },
      );
      /* A lost session redirects to the login page, which fails this check too */
      const sha256 = await RNFS.hash(target, 'sha256');
      if (sha256 !== file.sha256) {
        throw new BundleError(
          `${file.path} does not match its manifest hash`,
          'hash_mismatch',
        );
      }
      downloadedFiles += 1;
      onProgress?.(downloadedFiles, manifest.files.length);
    }

    await RNFS.writeFile(
      `${partialDir}/${MANIFEST_FILE}`,
      JSON.stringify(manifest),
      'utf8',
    );
    if (await RNFS.exists(versionDir)) {
      await RNFS.unlink(versionDir);
    }
    await RNFS.moveFile(partialDir, versionDir);
    await RNFS.writeFile(`${versionDir}/${COMPLETE_MARKER}`, '', 'utf8');
  }

  const previous = await readCachedBundle(appId).catch(() => null);
  await RNFS.writeFile(
    `${appRoot(appId)}/${CURRENT_FILE}`,
    JSON.stringify({version: manifest.version}),
    'utf8',
  );
  await removeOtherVersions(
    appId,
    previous != null
      ? [manifest.version, previous.version]
      : [manifest.version],
  );

  return toBundle(appId, manifest.version);
}
