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

import {checkNullString, splitInTwo} from './strings';

export function formatDate(inputDate: string, format: string): string {
  // Format must contains three parts : MM for the month, DD for the day and YYYY for the year
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  format = format.replace('MM', month.toString().padStart(2, '0'));
  format = format.replace('YYYY', year.toString());
  format = format.replace('DD', day.toString().padStart(2, '0'));

  return format;
}

export function formatNumber(
  number: string | number,
  decimalSpacer: string = '.',
  thousandSpacer: string = ' ',
  cutDecimalExcess: (value: number | string) => string = value => {
    if (typeof value === 'number') {
      return parseFloat(value.toString()).toFixed(2);
    }

    return parseFloat(value).toFixed(2);
  },
): string {
  if (typeof number === 'number') {
    number = number.toString();
  }

  if (checkNullString(number)) {
    number = cutDecimalExcess(0);
  } else {
    number = cutDecimalExcess(number);
  }

  const decimalPart = splitInTwo(number)[1];
  const integerPart = splitInTwo(number)[0];

  let result = '';
  let counter = 0;

  for (let i = integerPart.length - 1; i >= 0; i--) {
    result =
      counter !== 0 && counter % 3 === 0
        ? integerPart[i] + thousandSpacer + result
        : integerPart[i] + result;
    counter++;
  }

  return decimalPart ? `${result}${decimalSpacer}${decimalPart}` : result;
}

export function unformatNumber(
  number: string,
  decimalSpacer: string = '.',
  thousandSpacer: string = ' ',
): string {
  if (checkNullString(number)) {
    return '0';
  }

  const JS_THOUSAND_SPACER = '';
  const JS_DECIMAL_SPACER = '.';

  if (number.includes(decimalSpacer) && number.includes(thousandSpacer)) {
    return number
      .replaceAll(thousandSpacer, JS_THOUSAND_SPACER)
      .replace(decimalSpacer, JS_DECIMAL_SPACER);
  }

  return number.replace(',', JS_DECIMAL_SPACER);
}
