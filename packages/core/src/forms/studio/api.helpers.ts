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

import {axiosApiProvider} from '../../apiProviders';

const createJsonFieldsOfModelCriteria = (modelName: string, type?: string) => {
  const criteria = [
    {
      fieldName: 'model',
      operator: '=',
      value: modelName,
    },
    {
      fieldName: 'isVisibleInMobileApp',
      operator: '=',
      value: true,
    },
  ];

  if (type != null) {
    criteria.push({
      fieldName: 'modelField',
      operator: '=',
      value: type,
    });
  }

  return criteria;
};

export async function fetchJsonFieldsOfModel({
  modelName,
  type,
}: {
  modelName: string;
  type?: string;
}) {
  if (modelName == null) {
    return null;
  }

  return axiosApiProvider.post({
    url: 'ws/rest/com.axelor.meta.db.MetaJsonField/search',
    data: {
      data: {
        operator: 'and',
        criteria: createJsonFieldsOfModelCriteria(modelName, type),
      },
      limit: null,
    },
  });
}

export async function fetchObject({
  modelName,
  id,
}: {
  modelName: string;
  id: number;
}) {
  if (modelName == null || id == null) {
    return null;
  }

  return axiosApiProvider.get({
    url: `ws/rest/${modelName}/${id}`,
  });
}

export async function fetchObjectModelTypes({modelName}: {modelName: string}) {
  if (modelName == null) {
    return null;
  }

  return axiosApiProvider.post({
    url: 'ws/rest/com.axelor.meta.db.MetaField/search',
    data: {
      data: {
        operator: 'and',
        criteria: [
          {
            fieldName: 'metaModel.fullName',
            operator: '=',
            value: modelName,
          },
          {
            fieldName: 'json',
            operator: '=',
            value: true,
          },
        ],
      },
      limit: null,
    },
  });
}

export async function updateJsonFieldsObject({
  modelName,
  id,
  version,
  values,
}: {
  modelName: string;
  id: number;
  version: number;
  values: any;
}) {
  if (modelName == null || id == null) {
    return null;
  }

  return axiosApiProvider.post({
    url: `ws/rest/${modelName}`,
    data: {
      data: {
        id: id,
        version: version,
        ...values,
      },
    },
  });
}

export async function fetchData({
  modelName,
  domain,
  searchValue = null,
  page = 0,
  criteria = [],
  searchFields,
}: {
  modelName: string;
  domain?: string;
  searchValue?: string;
  page?: number;
  criteria?: any[];
  searchFields?: string[];
}) {
  if (modelName == null) {
    return null;
  }

  let combinedCriteria = [...criteria];

  if (searchValue != null) {
    const searchCriteria = searchFields.map(_field => ({
      fieldName: _field,
      operator: 'like',
      value: searchValue,
    }));

    combinedCriteria.push({
      criteria: searchCriteria,
      operator: 'or',
    });
  }

  return axiosApiProvider
    .post({
      url: `ws/rest/${modelName}/search`,
      data: {
        data: {
          _domain: domain,
          criteria: combinedCriteria,
        },
        fields: searchFields,
        limit: 10,
        offset: 10 * page,
        translate: true,
      },
    })
    .then(res => res?.data?.data);
}

export async function fetchMetaConfig({
  modelName,
}: {
  modelName: string;
}): Promise<any> {
  if (modelName == null) {
    return null;
  }

  return axiosApiProvider
    .get({
      url: `ws/meta/fields/${modelName}`,
    })
    .catch(console.warn);
}

export async function fetchModelFields({
  modelName,
}: {
  modelName: string;
}): Promise<string[]> {
  if (modelName == null) {
    return null;
  }

  return fetchMetaConfig({modelName})
    .then(res => res?.data?.data)
    .then(res => res?.fields)
    .then(_fields => {
      if (!Array.isArray(_fields)) {
        return [];
      }

      return _fields.filter(_item => _item.nameColumn);
    })
    .then(targetFields => targetFields.map(_item => _item.name))
    .then(res => (res.length > 0 ? res : ['name']));
}

interface SelectionItem {
  title: string;
  value: string;
}

export async function fetchSelectionOptions({
  modelName,
  attrsPanelName,
  fieldName,
}: {
  modelName: string;
  attrsPanelName: string;
  fieldName: string;
}): Promise<SelectionItem[]> {
  if (modelName == null) {
    return null;
  }

  return fetchMetaConfig({modelName})
    .then(res => res?.data?.data)
    .then(res => res?.jsonFields)
    .then(_attrsPanels => _attrsPanels?.[attrsPanelName])
    .then(_panel => _panel?.[fieldName])
    .then(_field => _field?.selectionList)
    .then(_selection => {
      if (!Array.isArray(_selection)) {
        return [];
      }

      return _selection
        .sort((a, b) => a.order - b.order)
        .map(_item => ({
          title: _item?.title as string,
          value: _item?.value as string,
        }));
    });
}

export async function executeButtonAction(
  actions: string,
  model: string,
  object: any,
) {
  return axiosApiProvider.post({
    url: 'ws/action',
    data: {
      action: actions,
      data: {
        context: {...object},
      },
      model,
    },
  });
}
