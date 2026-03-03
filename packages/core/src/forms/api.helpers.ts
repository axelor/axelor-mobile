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

import {FieldMatcher, getActionApi, getModelApi} from '../apiProviders';

const getMatcherFields = (data: any): FieldMatcher => {
  const fields = {};

  Object.keys(data).forEach(key => {
    fields[`data.${key}`] = key;
  });

  return fields;
};

export async function createRecord({
  modelName,
  data,
}: {
  modelName: string;
  data: any;
}) {
  return getActionApi().send({
    method: 'put',
    url: `ws/rest/${modelName}`,
    body: {
      data,
    },
    description: `create new ${modelName}`,
    matchers: {
      modelName,
      id: Date.now(),
      fields: getMatcherFields(data),
    },
  });
}

export async function updateRecord({
  modelName,
  data,
}: {
  modelName: string;
  data: any;
}) {
  return getActionApi().send({
    method: 'post',
    url: `ws/rest/${modelName}/${data?.id}`,
    body: {
      data,
    },
    description: `update ${modelName} with id ${data?.id}`,
    matchers: {
      modelName,
      id: data?.id,
      fields: getMatcherFields(data),
    },
  });
}

export async function refreshRecord({
  modelName,
  id,
}: {
  modelName: string;
  id: number;
}) {
  return getModelApi().get({modelName, id});
}

export async function deleteRecord({
  modelName,
  id,
}: {
  modelName: string;
  id: number;
}) {
  return getActionApi().send({
    method: 'delete',
    url: `ws/rest/${modelName}/${id}`,
    body: {},
    description: `delete ${modelName} with id ${id}`,
    matchers: {
      modelName,
      id: id,
      fields: {},
    },
  });
}
