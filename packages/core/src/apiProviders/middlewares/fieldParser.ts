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
  if (fieldName.includes('.')) {
    const dotIndex = fieldName.indexOf('.');
    const _name = fieldName.substring(0, dotIndex);

    if (value == null) {
      return object;
    }

    return {
      ...object,
      [fieldName]: value,
      [_name]: parseField(
        fieldName.substring(dotIndex + 1),
        value,
        object[_name] || {},
      ),
    };
  }

  return {...object, [fieldName]: value};
};
