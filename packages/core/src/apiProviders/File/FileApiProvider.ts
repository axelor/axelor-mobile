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

export interface FileRef {
  id: number;
  fileName: string;
  isMetaFile?: boolean;
}

export interface BinaryImageRef {
  model: string;
  id: number;
  version: number;
  field: string;
}

export interface LocalFile {
  path: string;
  fileName: string;
  mimeType?: string;
}

export interface FileApiCredentials {
  baseUrl: string;
  token: string;
  jsessionId?: string;
}

export interface FileInitData extends FileApiCredentials {
  userId: number;
}

export interface FileApi {
  init(data: FileInitData): void;
  reset(ref?: FileRef): void;
  isAvailable(): Promise<boolean>;
  getDisplayUri(ref: FileRef): Promise<string | null>;
  getBinaryImageUri(ref: BinaryImageRef): Promise<string | null>;
  getLocalCopy(ref: FileRef): Promise<LocalFile | null>;
  openInExternalApp(ref: FileRef): Promise<void>;
  saveToDevice(ref: FileRef): Promise<boolean>;
}
