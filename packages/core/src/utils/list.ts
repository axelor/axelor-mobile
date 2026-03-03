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

import {isDate} from './date';
import {areObjectsEquals} from './object';

export function filterList(list, subObject, objectParam, query) {
  if (query === '' || list == null || list?.length === 0) {
    return list;
  } else {
    const filteredList = [];
    if (
      Array.isArray(subObject) &&
      Array.isArray(objectParam) &&
      Array.isArray(query)
    ) {
      if (
        subObject.length === objectParam.length &&
        objectParam.length === query.length &&
        subObject.length > 0
      ) {
        list.forEach(item => {
          let criteria = true;
          for (let i = 0; i < subObject.length; i++) {
            criteria =
              criteria &&
              (query[i] === ''
                ? true
                : item[subObject[i]] != null &&
                  areObjectsEquals(
                    item[subObject[i]][objectParam[i]],
                    query[i],
                  ));
          }

          if (criteria) {
            filteredList.push(item);
          }
        });
      } else {
        throw new Error(
          'Filter criteria params length condition is not fulfilled',
        );
      }
    } else {
      list.forEach(item => {
        if (
          item[subObject] != null &&
          areObjectsEquals(item[subObject][objectParam], query)
        ) {
          filteredList.push(item);
        }
      });
    }
    return filteredList;
  }
}

export function filterListContain(list, subListObject, objectParam, query) {
  if (query === '') {
    return list;
  } else {
    const filteredList = [];
    list.forEach(item => {
      if (subListContain(item[subListObject], objectParam, query)) {
        filteredList.push(item);
      }
    });
    return filteredList;
  }
}

function subListContain(subList, objectParam, query) {
  if (query === '') {
    return false;
  } else {
    for (let i = 0; i < subList.length; i++) {
      if (subList[i][objectParam] === query) {
        return true;
      }
    }
    return false;
  }
}

export const getLastItem = (listItem, orderField) => {
  return findItem(
    listItem,
    item => isDate(item[orderField]) && new Date(item[orderField]) < new Date(),
    (prev, current) =>
      new Date(current[orderField]) > new Date(prev[orderField])
        ? current
        : prev,
  );
};

export const getNextItem = (listItem, orderField) => {
  return findItem(
    listItem,
    item => isDate(item[orderField]) && new Date(item[orderField]) > new Date(),
    (prev, current) =>
      new Date(current[orderField]) < new Date(prev[orderField])
        ? current
        : prev,
  );
};

const findItem = (listItem, filterFunc, reduceFunc) => {
  if (!Array.isArray(listItem) || listItem.length === 0) {
    return null;
  }

  const filteredList = listItem.filter(filterFunc);
  if (filteredList.length === 0) {
    return null;
  }

  return filteredList.reduce(reduceFunc);
};
