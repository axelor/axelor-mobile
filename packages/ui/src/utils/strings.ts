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

export function splitInTwo(value: string, spacer = '.'): Array<string> {
  if (value == null) {
    return null;
  }
  return value.toString().split(spacer);
}

export function checkNullString(message) {
  if (message == null) {
    return true;
  } else {
    let newMessage = message.replace(/\s/g, '');
    return newMessage == null || newMessage === '';
  }
}

export function sliceString(string: string, maxStringLenght: number) {
  if (string.length > maxStringLenght) {
    return string.slice(0, maxStringLenght - 3) + '...';
  } else {
    return string;
  }
}
