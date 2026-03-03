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

export function splitInTwo(value: String, spacer = '.'): Array<String> {
  if (value == null) {
    return null;
  }
  return value.toString().split(spacer);
}

export function isHtml(value: string): boolean {
  const regex = /<\/?[a-z][\s\S]*>/i;
  if (value == null) {
    return null;
  }
  return regex.test(value);
}

export function stringNoAccent(message) {
  if (message == null) {
    return '';
  } else {
    const b = 'áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ';
    const c = 'aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY';
    let newMessage = message;
    for (let i = 0; i < b.length; i++) {
      newMessage = newMessage.replace(b.charAt(i), c.charAt(i));
    }
    return newMessage;
  }
}

export function checkNullString(message) {
  if (typeof message !== 'string') {
    return true;
  } else {
    let newMessage = message.replace(/\s/g, '');
    return newMessage == null || newMessage === '';
  }
}

export function formatVersionString(version: string): number {
  if (typeof version !== 'string') {
    return null;
  }

  const vparts = version.split('.');
  let result: string = '';

  for (const v of vparts) {
    if (isNaN(parseFloat(v))) {
      break;
    }

    result = result.concat(parseFloat(v).toString().padStart(3, '0'));
  }

  const missingVersionNumber = 3 - vparts.length;

  if (missingVersionNumber > 0) {
    for (let index = 0; index < missingVersionNumber; index++) {
      result = result.concat('000');
    }
  }

  return parseFloat(result);
}
