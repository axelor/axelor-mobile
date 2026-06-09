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

import {useMemo} from 'react';
import {AopFileApi} from './AopFileApi';
import {FileApi} from './FileApiProvider';

class FileProvider {
  constructor(private fileApi: FileApi) {
    this.fileApi = fileApi;
  }

  setFileApi(newFileApi: FileApi) {
    this.fileApi = newFileApi;
  }

  getFileApi(): FileApi {
    return this.fileApi;
  }
}

export function useFileApi(): FileApi {
  return useMemo(() => fileProvider.getFileApi(), []);
}

export function getFileApi(): FileApi {
  return fileProvider.getFileApi();
}

export function registerFileApi(fileApi: FileApi) {
  fileProvider.setFileApi(fileApi);
}

export const fileProvider = new FileProvider(new AopFileApi());
