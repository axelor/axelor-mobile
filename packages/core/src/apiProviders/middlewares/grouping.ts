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

export const groupingMiddleware = (response: AxiosResponse): AxiosResponse => {
  if (Array.isArray(response?.data?.data)) {
    response.data.data = groupFlattenedData(response.data.data);
  }
  return response;
};

const groupFlattenedData = (data: any[]): any[] => {
  const idCount: Record<string, number> = {};
  for (const item of data) {
    if (item.id != null) {
      idCount[item.id] = (idCount[item.id] || 0) + 1;
    }
  }

  if (!Object.values(idCount).some(count => count > 1)) {
    return data;
  }

  const groups = new Map<any, any[]>();
  for (const item of data) {
    const id = item.id;
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id).push(item);
  }

  return Array.from(groups.values()).map(mergeGroup);
};

const mergeGroup = (items: any[]): any => {
  const result: any = {};
  const first = items[0];

  for (const key of Object.keys(first)) {
    if (key.includes('.')) continue;

    const value = first[key];

    if (isPlainObject(value)) {
      const subItems: any[] = [];
      const seenIds = new Set<any>();
      for (const item of items) {
        const subVal = item[key];
        if (subVal != null && !seenIds.has(subVal.id)) {
          seenIds.add(subVal.id);
          subItems.push(subVal);
        }
      }
      result[key] = subItems.length > 1 ? subItems : (subItems[0] ?? value);
    } else {
      result[key] = value;
    }
  }

  return result;
};
