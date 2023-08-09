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

import {
  axiosApiProvider,
  createStandardSearch,
  Criteria,
} from '../apiProviders';
import {DocumentPickerResponse} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

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

export async function uploadFile(
  file: DocumentPickerResponse,
  {baseUrl, jsessionId, token, returnBase64String},
) {
  if (file == null) {
    return;
  }

  return new Promise<any>(async (resolve, reject) => {
    try {
      const base64Data = await RNFS.readFile(file.uri, 'base64');

      if (returnBase64String) {
        resolve(`data:${file.type};base64,${base64Data}`);
      }

      const headers = {
        'Content-Type': 'application/octet-stream',
        'Content-Length': String(file.size),
        'X-File-Name': file.name,
        'X-File-Type': file.type,
        'X-File-Size': String(file.size),
        'X-File-Offset': String(0),
        'x-csrf-token': token,
        Cookie: `CSRF-TOKEN=${token}; ${jsessionId}`,
      };

      const response: any = await RNFetchBlob.fetch(
        'POST',
        `${baseUrl}ws/files/upload`,
        headers,
        base64Data,
      );

      const metaFile = JSON.parse(response.data);

      if (Object.keys(metaFile).includes('id')) {
        resolve(metaFile);
      } else {
        throw Error('no metafile created');
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function deleteMetaFile(fileId: number) {
  return axiosApiProvider.delete({
    url: `ws/rest/com.axelor.meta.db.MetaFile/${fileId}`,
  });
}
