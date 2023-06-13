/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import axios, {AxiosResponse} from 'axios';
import {createStandardSearch, Criteria} from '../apiProviders';
import {DocumentPickerResponse} from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const CHUNK_SIZE = 1024 * 1024; // Chunk size in bytes (1MB)

const createCriteria = (listFiles): Criteria[] => {
  if (Array.isArray(listFiles)) {
    return [
      {
        operator: 'or',
        criteria: listFiles.map(item => {
          const criteria: Criteria = {
            fieldName: 'id',
            operator: '=',
            value: item.id,
          };

          return criteria;
        }),
      },
    ];
  }

  return [];
};

export async function fetchFileDetails({listFiles, isMetaFile}) {
  const model = isMetaFile
    ? 'com.axelor.meta.db.MetaFile'
    : 'com.axelor.dms.db.DMSFile';

  return createStandardSearch({
    model: model,
    criteria: createCriteria(listFiles),
    fieldKey: 'core_metaFile',
    numberElementsByPage: null,
    page: 0,
  });
}

export async function uploadFile(file: DocumentPickerResponse) {
  if (file == null) {
    return;
  }

  return new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
      const filePath = file.uri.replace('file://', '');
      const fileData = await RNFS.readFile(filePath, 'ascii');

      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      let currentChunk = 0;
      let fileId;

      while (currentChunk < totalChunks) {
        const start = currentChunk * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = fileData.slice(start, end);

        const headers = {
          'Content-Type': 'application/octet-stream',
          'Content-Length': String(chunk.length),
          'X-File-Name': file.name,
          'X-File-Type': file.type,
          'X-File-Size': String(file.size),
          'X-File-Offset': String(start),
        };

        if (fileId) {
          headers['X-File-Id'] = fileId;
        }

        const response = await axios.post('ws/files/upload', chunk, {headers});

        if (response.data.fileId) {
          fileId = response.data.fileId;
        } else if (response.data.id) {
          resolve(response);
        }

        currentChunk++;
      }
    } catch (error) {
      reject(error);
    }
  });
}
