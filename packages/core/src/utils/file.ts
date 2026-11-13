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

export const sanitizeFileName = (name: string) =>
  name
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[ :*?"<>|\\]/g, '_');

export const sanitizeLocalFileName = (name: string) =>
  sanitizeFileName(name)?.replace(/[^a-zA-Z0-9._\-()]/g, '_');

/*
 * What a module knows about a file id it gave out, such as the temporary id
 * of a file picked offline: `path` while the file is only on the device
 * (absolute, without `file://`), then `serverId` once the server has it.
 */
export type LocalFileLookup = {path: string} | {serverId: number};

export type LocalFileResolver = (fileId: number) => LocalFileLookup | null;

let localFileResolver: LocalFileResolver | null = null;

export const registerLocalFileResolver = (
  resolver: LocalFileResolver | null,
) => {
  localFileResolver = resolver;
};

const resolveLocalFile = (fileId: number): LocalFileLookup | null =>
  fileId != null ? (localFileResolver?.(fileId) ?? null) : null;

export const getLocalFilePath = (fileId: number): string | null => {
  const localFile = resolveLocalFile(fileId);

  return localFile != null && 'path' in localFile ? localFile.path : null;
};

// The id to ask the server for: the real id of a file uploaded under another id.
export const getServerFileId = (fileId: number): number => {
  const localFile = resolveLocalFile(fileId);

  return localFile != null && 'serverId' in localFile
    ? localFile.serverId
    : fileId;
};
