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

import {checkNullString} from '../../utils';
import {
  axiosApiProvider,
  createStandardSearch,
  Criteria,
} from '../../apiProviders';
import {JSONObject} from '../types';

const CACHE_KEY_SEPARATOR = '#';
const modelMetaCaches = new Map<string, Map<string, Promise<any>>>();

/**
 * Model metadata only changes when the instance is redeployed, so each request is
 * sent once per key for the whole session and every caller shares its result.
 * Storing the promise also deduplicates concurrent callers, and a failed request
 * is dropped from the cache to stay retryable.
 */
const cachedRequest = (
  cacheName: string,
  key: string,
  request: () => Promise<any>,
): Promise<any> => {
  let cache = modelMetaCaches.get(cacheName);

  if (cache == null) {
    cache = new Map();
    modelMetaCaches.set(cacheName, cache);
  }

  const cached = cache.get(key);

  if (cached != null) return cached;

  const _cache = cache;

  const pending = request().catch(error => {
    _cache.delete(key);
    console.warn(error);
    return undefined;
  });

  cache.set(key, pending);

  return pending;
};

/**
 * Drops the cached metadata of the given model, or of every model when none is
 * given. Called on logout so that a new session never reads the metadata of the
 * previous one, and available to force a refresh after a studio update.
 */
export function clearModelMetaCaches(modelName?: string) {
  modelMetaCaches.forEach(cache => {
    if (modelName == null) {
      cache.clear();
      return;
    }

    cache.forEach((_, key) => {
      if (
        key === modelName ||
        key.startsWith(modelName + CACHE_KEY_SEPARATOR)
      ) {
        cache.delete(key);
      }
    });
  });
}

const createJsonFieldsOfModelCriteria = (modelName: string, type?: string) => {
  const criteria: Criteria[] = [
    {fieldName: 'model', operator: '=', value: modelName},
    {fieldName: 'isVisibleInMobileApp', operator: '=', value: true},
  ];

  if (type != null) {
    criteria.push({fieldName: 'modelField', operator: '=', value: type});
  }

  return criteria;
};

const EMPTY_ROLES_DOMAIN = 'self.roles IS EMPTY';
const ROLES_DOMAIN =
  `${EMPTY_ROLES_DOMAIN} OR EXISTS (SELECT 1 FROM MetaJsonField _field ` +
  'JOIN _field.roles _role WHERE _field.id = self.id ' +
  'AND _role.id IN (:userRoleIds))';

export async function fetchJsonFieldsOfModel({
  modelName,
  type,
  userRoleIds,
}: {
  modelName: string;
  type?: string;
  userRoleIds?: number[] | null;
}) {
  if (modelName == null) return null;

  const isFiltered = Array.isArray(userRoleIds);
  const hasRoles = isFiltered && userRoleIds.length > 0;

  return cachedRequest(
    'jsonFieldsOfModel',
    [modelName, type ?? '', isFiltered ? userRoleIds.join('-') : 'all'].join(
      CACHE_KEY_SEPARATOR,
    ),
    () =>
      createStandardSearch({
        model: 'com.axelor.meta.db.MetaJsonField',
        criteria: createJsonFieldsOfModelCriteria(modelName, type),
        domain: !isFiltered
          ? undefined
          : hasRoles
            ? ROLES_DOMAIN
            : EMPTY_ROLES_DOMAIN,
        domainContext: hasRoles ? {userRoleIds} : undefined,
        fieldKey: 'core_metaJsonField',
        page: 0,
        numberElementsByPage: null as any,
        provider: 'model',
      }),
  );
}

export async function fetchObject({
  modelName,
  id,
}: {
  modelName: string;
  id: number;
}) {
  if (modelName == null || id == null) return null;

  return axiosApiProvider.get({url: `ws/rest/${modelName}/${id}`});
}

export async function fetchObjectModelTypes({modelName}: {modelName: string}) {
  if (modelName == null) return null;

  return cachedRequest('objectModelTypes', modelName, () =>
    createStandardSearch({
      model: 'com.axelor.meta.db.MetaField',
      criteria: [
        {fieldName: 'metaModel.fullName', operator: '=', value: modelName},
        {fieldName: 'json', operator: '=', value: true},
      ],
      fieldKey: 'core_metaField',
      page: 0,
      numberElementsByPage: null as any,
      provider: 'model',
    }),
  );
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
  if (modelName == null || id == null) return null;

  return axiosApiProvider.post({
    url: `ws/rest/${modelName}`,
    data: {data: {id, version, ...values}},
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
  if (modelName == null) return null;

  let combinedCriteria = [...criteria];

  if (searchValue != null && searchFields != null) {
    combinedCriteria.push({
      operator: 'or',
      criteria: searchFields.map(_field => ({
        fieldName: _field,
        operator: 'like',
        value: searchValue,
      })),
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
  if (modelName == null) return undefined;

  return cachedRequest('metaConfig', modelName, () =>
    axiosApiProvider.get({url: `ws/meta/fields/${modelName}`}),
  );
}

export async function fetchModelFields({
  modelName,
}: {
  modelName: string;
}): Promise<string[] | undefined> {
  if (modelName == null) return undefined;

  return fetchMetaConfig({modelName})
    .then(res => res?.data?.data)
    .then(res => res?.fields)
    .then(_fields => {
      if (!Array.isArray(_fields)) return [];

      return _fields.filter(_item => _item.nameColumn);
    })
    .then(targetFields => targetFields.map(_item => _item.name))
    .then(res => (res.length > 0 ? res : ['name']));
}

interface SelectionItem {
  title: string;
  value: string;
}

const buildSelectionMap = (items: any[]): JSONObject<SelectionItem[]> => {
  const mapOfSelection = new Map<string, Map<string, any>>();

  if (!Array.isArray(items)) return {};

  items.forEach(_item => {
    const selectionName = _item?.select?.name;

    if (selectionName == null) return;

    let options = mapOfSelection.get(selectionName);

    if (options == null) {
      options = new Map();
      mapOfSelection.set(selectionName, options);
    }

    if (_item.hidden === true) {
      options.delete(_item.value);
    } else {
      options.set(_item.value, _item);
    }
  });

  const result: JSONObject<SelectionItem[]> = {};

  mapOfSelection.forEach((_options, _selectionName) => {
    result[_selectionName] = [..._options.values()]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map(_option => ({
        title: _option?.title as string,
        value: _option?.value as string,
      }));
  });

  return result;
};

export async function fetchSelectionMap({
  modelName,
  selections,
}: {
  modelName: string;
  selections: string[];
}): Promise<JSONObject<SelectionItem[]>> {
  if (modelName == null || !Array.isArray(selections)) return {};

  const names = selections.filter(
    (_name, _index, _self) =>
      !checkNullString(_name) && _self.indexOf(_name) === _index,
  );

  if (names.length === 0) return {};

  return cachedRequest('selectionMap', modelName, () =>
    createStandardSearch({
      model: 'com.axelor.meta.db.MetaSelectItem',
      criteria: [{fieldName: 'select.name', operator: 'in', value: names}],
      fieldKey: 'core_metaSelectItem',
      sortKey: 'core_metaSelectItem',
      page: 0,
      numberElementsByPage: null as any,
      provider: 'model',
    }),
  ).then(res => buildSelectionMap(res?.data?.data));
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
  if (modelName == null) return [];

  return fetchMetaConfig({modelName})
    .then(res => res?.data?.data)
    .then(res => res?.jsonFields)
    .then(_attrsPanels => _attrsPanels?.[attrsPanelName])
    .then(_panel => _panel?.[fieldName])
    .then(_field => _field?.selectionList)
    .then(_selection => {
      if (!Array.isArray(_selection)) return [];

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
