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

  async getDisplayUri(ref: FileRef): Promise<string | null> {
    const _fileApi = await getAvailableFileApi(this.fileApis);
    return _fileApi.getDisplayUri(ref);
  }

  async getBinaryImageUri(ref: BinaryImageRef): Promise<string | null> {
    const _fileApi = await getAvailableFileApi(this.fileApis);
    return _fileApi.getBinaryImageUri(ref);
  }

  async getLocalCopy(ref: FileRef): Promise<LocalFile | null> {
    const _fileApi = await getAvailableFileApi(this.fileApis);
    return _fileApi.getLocalCopy(ref);
  }

  async openInExternalApp(ref: FileRef): Promise<void> {
    const _fileApi = await getAvailableFileApi(this.fileApis);
    return _fileApi.openInExternalApp(ref);
  }

  async saveToDevice(ref: FileRef): Promise<boolean> {
    const _fileApi = await getAvailableFileApi(this.fileApis);
    return _fileApi.saveToDevice(ref);
  }
}
