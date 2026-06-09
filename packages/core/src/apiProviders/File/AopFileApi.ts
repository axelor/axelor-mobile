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

import RNFS from 'react-native-fs';
import {sanitizeFileName} from '../../utils';
import {getNetInfo} from '../../api/net-info-utils';
import {
  FileApi,
  FileApiCredentials,
  FileRef,
  FileInitData,
  LocalFile,
} from './FileApiProvider';
import {
  buildCookie,
  downloadUrlToPath,
  metaFileContentUrl,
  metaFileDownloadUrl,
  openLocalFile,
  saveUrlToDevice,
} from './utils';

export class AopFileApi implements FileApi {
  static isOnlineAvailable = true;
  private credentials: FileApiCredentials | undefined;

  constructor() {}

  init({userId: _, ...data}: FileInitData): void {
    this.credentials = data;
  }

  reset(): void {
    this.credentials = undefined;
  }

  async isAvailable(): Promise<boolean> {
    if (!AopFileApi.isOnlineAvailable) return false;

    const {isConnected} = await getNetInfo();
    return !!isConnected;
  }

  async getDisplayUri(ref: FileRef): Promise<string | null> {
    if (this.credentials?.baseUrl == null) return null;
    return metaFileContentUrl(this.credentials.baseUrl, ref);
  }

  async getLocalCopy(ref: FileRef): Promise<LocalFile | null> {
    if (this.credentials?.baseUrl == null) return null;

    const url = metaFileContentUrl(this.credentials.baseUrl, ref);
    const path = `${RNFS.DocumentDirectoryPath}/${sanitizeFileName(
      ref.fileName,
    )}`;
    const saved = await downloadUrlToPath(
      url,
      path,
      buildCookie(this.credentials),
    );

    return saved != null ? {path: saved, fileName: ref.fileName} : null;
  }

  async openInExternalApp(ref: FileRef): Promise<void> {
    const local = await this.getLocalCopy(ref);
    if (local == null) return;

    await openLocalFile(local.path);
  }

  async saveToDevice(ref: FileRef): Promise<boolean> {
    if (this.credentials?.baseUrl == null) return false;

    return saveUrlToDevice(
      metaFileDownloadUrl(this.credentials.baseUrl, ref),
      ref.fileName,
      buildCookie(this.credentials),
    );
  }
}
