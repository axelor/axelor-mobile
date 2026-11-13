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

import {ActionRequest} from './utils';

export interface ActionApiCredentials {
  baseUrl: string;
  token: string;
  jsessionId?: string;
}

export interface UploadFile {
  base64: string;
  name: string;
  size: number;
  type: string;
}

export type UploadedMetaFile = {
  id: number;
  fileName: string;
} & Record<string, unknown>;

export interface ActionApi {
  // Receives the session of the user once the login is complete.
  init(credentials: ActionApiCredentials): void;
  // Forgets the session when the user logs out.
  reset(): void;
  isAvailable(): Promise<boolean>;
  /*
   * Called on every provider before a request is sent. Returns the request
   * with the data this provider still holds (such as files waiting to be
   * uploaded) replaced by their server values, the request unchanged when it
   * holds nothing, or null when that data cannot be sent yet: the request is
   * then given to this provider to keep.
   */
  resolvePending(request: ActionRequest): Promise<ActionRequest | null>;
  send(request: ActionRequest): Promise<any>;
  // Creates a MetaFile from the given file and returns it.
  upload(file: UploadFile): Promise<UploadedMetaFile>;
  synchronize(onEnd?: () => void): Promise<void>;
}
