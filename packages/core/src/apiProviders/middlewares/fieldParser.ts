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

import {AxiosResponse} from 'axios';
import {isPlainObject} from '../../utils';

export const fieldsParserMiddleware = (
  response: AxiosResponse,
): AxiosResponse => {
  if (response?.data?.data) {
    response.data.data = parseDataFields(response.data.data);
  }

  return response;
};

const parseDataFields = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(value => parseDataFields(value));
  }

  if (isPlainObject(data)) {
    let updatedItem = {};

    for (const key of Object.keys(data).sort()) {
      updatedItem = parseField(key, data[key], updatedItem);
    }

    return updatedItem;
  }

  return data;
};

const parseField = (fieldName: string, value: any, object: any): any => {
  const _fieldName = renameVersionField(fieldName);

  if (_fieldName.includes('.')) {
    const dotIndex = _fieldName.indexOf('.');
    const _name = _fieldName.substring(0, dotIndex);

    if (value == null) {
      return object;
    }

    return {
      ...object,
      [_fieldName]: value,
      [_name]: parseField(
        _fieldName.substring(dotIndex + 1),
        value,
        object[_name] || {},
      ),
    };
  }

  return {...object, [_fieldName]: parseDataFields(value)};
};

const API_VERSION_FIELD = '$version';
const VERSION_FIELD = 'version';

const renameVersionField = (fieldName: string): string => {
  if (fieldName === API_VERSION_FIELD) {
    return VERSION_FIELD;
  }

  if (fieldName.endsWith(`.${API_VERSION_FIELD}`)) {
    return `${fieldName.slice(0, -API_VERSION_FIELD.length)}${VERSION_FIELD}`;
  }

  return fieldName;
};
