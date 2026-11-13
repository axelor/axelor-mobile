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
  BinaryImageRef,
  FileApi,
  FileInitData,
  FileRef,
  LocalFile,
} from './FileApiProvider';

async function getAvailableFileApi(fileApis: FileApi[]): Promise<FileApi> {
  for (const _fileApi of fileApis) {
    if (await _fileApi.isAvailable()) return _fileApi;
  }

  throw new Error('No provider available, please check your configuration.');
}

/*
 * Picks the provider for a file: the one that holds it when a provider says
 * so, otherwise the first available one, with the reference resolved by
 * every provider on the way.
 */
async function getFileApiForRef(
  fileApis: FileApi[],
  ref: FileRef,
): Promise<{fileApi: FileApi; resolvedRef: FileRef}> {
  let resolvedRef = ref;

  for (const _fileApi of fileApis) {
    const result = await _fileApi.resolvePending(resolvedRef);

    if (result == null) {
      return {fileApi: _fileApi, resolvedRef};
    }

    resolvedRef = result;
  }

  return {fileApi: await getAvailableFileApi(fileApis), resolvedRef};
}

export class GatewayFileApi implements FileApi {
  private fileApis: FileApi[];

  constructor(...fileApis: FileApi[]) {
    this.fileApis = fileApis;
  }

  init(data: FileInitData): void {
    this.fileApis.forEach(_fileApi => _fileApi.init(data));
  }

  reset(ref?: FileRef): void {
    this.fileApis.forEach(_fileApi => _fileApi.reset(ref));
  }

  async isAvailable(): Promise<boolean> {
    const _fileApi = await getAvailableFileApi(this.fileApis);
    return _fileApi.isAvailable();
  }

  async resolvePending(ref: FileRef): Promise<FileRef | null> {
    let resolvedRef: FileRef | null = ref;

    for (const _fileApi of this.fileApis) {
      resolvedRef = await _fileApi.resolvePending(resolvedRef);

      if (resolvedRef == null) {
        return null;
      }
    }

    return resolvedRef;
  }

  async getDisplayUri(ref: FileRef): Promise<string | null> {
    const {fileApi, resolvedRef} = await getFileApiForRef(this.fileApis, ref);
    return fileApi.getDisplayUri(resolvedRef);
  }

  async getBinaryImageUri(ref: BinaryImageRef): Promise<string | null> {
    const _fileApi = await getAvailableFileApi(this.fileApis);
    return _fileApi.getBinaryImageUri(ref);
  }

  async getLocalCopy(ref: FileRef): Promise<LocalFile | null> {
    const {fileApi, resolvedRef} = await getFileApiForRef(this.fileApis, ref);
    return fileApi.getLocalCopy(resolvedRef);
  }

  async openInExternalApp(ref: FileRef): Promise<void> {
    const {fileApi, resolvedRef} = await getFileApiForRef(this.fileApis, ref);
    return fileApi.openInExternalApp(resolvedRef);
  }

  async saveToDevice(ref: FileRef): Promise<boolean> {
    const {fileApi, resolvedRef} = await getFileApiForRef(this.fileApis, ref);
    return fileApi.saveToDevice(resolvedRef);
  }
}
