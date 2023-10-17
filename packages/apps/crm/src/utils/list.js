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

import {isDate} from '@axelor/aos-mobile-core';

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
