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

export function getFromList(list, objectParam, query) {
  if (
    query == null ||
    query === '' ||
    !Array.isArray(list) ||
    list.length === 0
  ) {
    return null;
  }

  return list.find(_item => {
    const itemValue = _item[objectParam];

    if (typeof itemValue !== typeof query) {
      return String(itemValue) === String(query);
    }

    return itemValue === query;
  });
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
        if (list[i][objectParam] === item[objectParam]) {
          newItemsList.push(list[i]);
        }
      });
    }
    return newItemsList;
  }
}
