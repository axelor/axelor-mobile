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

export const getLastItem = listItem => {
  if (
    listItem == null ||
    Array.isArray(listItem) === false ||
    listItem.length === 0
  ) {
    return null;
  }

  if (listItem.length === 1) {
    return listItem[0];
  }

  const today = new Date();
  if (listItem && listItem.length > 0) {
    const filtredList = listItem.filter(
      event => new Date(event.startDateTime) < today,
    );
    const getLatest = arr =>
      arr.sort(
        (a, b) => new Date(b.startDateTime) - new Date(a.startDateTime),
      )[0];
    return getLatest(filtredList);
  }
};

export const getNextItem = listItem => {
  if (
    listItem == null ||
    Array.isArray(listItem) === false ||
    listItem.length === 0
  ) {
    return null;
  }

  // if listItem contains one item so there is no next item.
  if (listItem.length === 1) {
    return null;
  }

  const today = new Date();
  if (listItem && listItem.length > 0) {
    const filtredList = listItem.filter(
      event => new Date(event.startDateTime) > today,
    );
    const getRecent = arr =>
      arr.sort(
        (a, b) => new Date(a.startDateTime) - new Date(b.startDateTime),
      )[0];
    return getRecent(filtredList);
  }
};
