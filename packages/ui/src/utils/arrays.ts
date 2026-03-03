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

export const replace = (
  arr: any[],
  oldValue: any,
  newValue: any,
  key: string,
): any[] => {
  const idx = indexOfElement(arr, oldValue, key);
  if (idx >= 0) {
    arr.splice(idx, 1, newValue);
  }

  return arr;
};

export const indexOfElement = (
  arr: any[],
  element: any,
  key: string,
): number => {
  if (arr == null) {
    return null;
  }
  return arr.findIndex(item => item?.[key] === element?.[key]);
};
