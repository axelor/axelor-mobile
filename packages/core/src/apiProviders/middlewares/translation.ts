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

export const translationMiddleware = (
  response: AxiosResponse,
): AxiosResponse => {
  if (response?.data?.data) {
    response.data.data = parseTranslation(response.data.data);
  }

  return response;
};

const parseTranslation = (data: any, cache = new Map()): any => {
  if (Array.isArray(data)) {
    return data.map(value => parseTranslation(value, cache));
  }

  if (isPlainObject(data)) {
    if (cache.has(data)) {
      return cache.get(data);
    }

    const updatedItem = {};
    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith('$t:')) {
        const translationKey = key.slice(3);
        updatedItem[translationKey] = value;
      } else if (!(key in updatedItem)) {
        updatedItem[key] = parseTranslation(value, cache);
      }
    }

    cache.set(data, updatedItem);
    return updatedItem;
  }

  return data;
};
