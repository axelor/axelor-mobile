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
import {getNetInfo} from '../../api/net-info-utils';
import {uploadBase64} from '../../api/metafile-api';
import {
  ActionApi,
  ActionApiCredentials,
  UploadedMetaFile,
  UploadFile,
} from './ActionApiProvider';
import {ActionRequest} from './utils';

export class AosActionApi implements ActionApi {
  private credentials: ActionApiCredentials | undefined;

  constructor() {}

  static isOnlineAvailable = true;

  init(credentials: ActionApiCredentials): void {
    this.credentials = credentials;
  }

  reset(): void {
    this.credentials = undefined;
  }

  async isAvailable(): Promise<boolean> {
    const {isConnected} = await getNetInfo();

    return new Promise(resolve => {
      if (!AosActionApi.isOnlineAvailable) {
        resolve(false);
      } else {
        resolve(isConnected);
      }
    });
  }

  resolvePending(request: ActionRequest): Promise<ActionRequest | null> {
    return Promise.resolve(request);
  }

  send(request: ActionRequest): Promise<any> {
    return axios[request.method](request.url, request.body);
  }

  upload(file: UploadFile): Promise<UploadedMetaFile> {
    if (this.credentials == null) {
      return Promise.reject(
        new Error('Cannot upload a file before the user is logged in.'),
      );
    }

    return uploadBase64(file, this.credentials);
  }

  synchronize(): Promise<void> {
    return new Promise(resolve => {
      resolve();
    });
  }
}
