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

import {axiosApiProvider} from '../../apiProviders';

export async function fetchJsonFieldsOfModel({modelName}: {modelName: string}) {
  if (modelName == null) {
    return null;
  }

  return axiosApiProvider.post({
    url: 'ws/rest/com.axelor.meta.db.MetaJsonField/search',
    data: {
      data: {
        criteria: [
          {
            fieldName: 'model',
            operator: '=',
            value: modelName,
          },
        ],
      },
      limit: null,
    },
  });
}

export async function fetchData({
  modelName,
  domain,
  searchValue = null,
  page = 0,
  searchFields,
}: {
  modelName: string;
  domain?: string;
  searchValue?: string;
  page?: number;
  searchFields?: string[];
}) {
  if (modelName == null) {
    return null;
  }

  let criteria = [];

  if (searchValue != null) {
    searchFields.forEach(_field => {
      criteria.push({
        fieldName: _field,
        operator: 'like',
        value: searchValue,
      });
    });
  }

  return axiosApiProvider.post({
    url: `ws/rest/${modelName}/search`,
    data: {
      data: {
        _domain: domain,
        criteria: [
          {
            criteria,
            operator: 'or',
          },
        ],
      },
      fields: searchFields,
      limit: 10,
      offset: 10 * page,
      translate: true,
    },
  });
}

export async function fetchModelFields({
  modelName,
}: {
  modelName: string;
}): Promise<string[]> {
  if (modelName == null) {
    return null;
  }

  return axiosApiProvider
    .get({
      url: `ws/meta/fields/${modelName}`,
    })
    .catch(console.warn)
    .then(res => res?.data?.data)
    .then(res => res?.fields)
    .then(_fields => {
      if (!Array.isArray(_fields)) {
        return [];
      }

      return _fields.filter(_item => _item.nameColumn);
    })
    .then(targetFields => targetFields.map(_item => _item.name));
}
