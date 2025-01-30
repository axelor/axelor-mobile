/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

export const getLastEvent = listEvent => {
  const today = new Date();
  if (listEvent && listEvent.length > 0) {
    const filtredList = listEvent.filter(
      event => new Date(event.startDateTime) < today,
    );
    const getLatest = arr =>
      arr.sort(
        (a, b) => new Date(b.startDateTime) - new Date(a.startDateTime),
      )[0];
    return getLatest(filtredList);
  }
};

export const getNextEvent = listEvent => {
  const today = new Date();
  if (listEvent && listEvent.length > 0) {
    const filtredList = listEvent.filter(
      event => new Date(event.startDateTime) > today,
    );
    const getRecent = arr =>
      arr.sort(
        (a, b) => new Date(a.startDateTime) - new Date(b.startDateTime),
      )[0];
    return getRecent(filtredList);
  }
};
