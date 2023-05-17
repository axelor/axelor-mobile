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

import {checkNullString} from './strings';

export function getFromList(list, objectParam, query) {
  if (checkNullString(query) || !Array.isArray(list) || list.length === 0) {
    return null;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i][objectParam] === query) {
      return list[i];
    }
  }

  return null;
}

export function getItemsFromList(
  list: any[],
  objectParam: string,
  query: any[],
) {
  if (query == null || query.length === 0) {
    return [];
  } else {
    let newItemsList = [];

    for (let i = 0; i < list.length; i++) {
      query.forEach(item => {
        if (list[i][objectParam] === item) {
          newItemsList.push(list[i]);
        }
      });
    }
    return newItemsList;
  }
}
