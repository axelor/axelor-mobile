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

import moment from 'moment';
import {checkNullString} from './string';
import {isEmpty} from './object';

export function formatDate(inputDate, format) {
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

export const formatDateTime = (dateTime, format) => {
  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  format = formatDate(dateTime, format);
  format = format.replace('HH', hours.toString().padStart(2, '0'));
  format = format.replace('mm', minutes.toString().padStart(2, '0'));

  return format;
};

export function formatTime(dateInput: string, format: string): string {
  const date = new Date(dateInput);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  format = format.replace('HH', hours.toString().padStart(2, '0'));
  format = format.replace('mm', minutes.toString().padStart(2, '0'));

  return format;
}

export function formatDuration(duration: number, format: string): string {
  const _duration = moment.duration(duration);

  const months = _duration.months().toString().padStart(2, '0');
  const days = _duration.days().toString().padStart(2, '0');
  const hours = _duration.hours().toString().padStart(2, '0');
  const minutes = _duration.minutes().toString().padStart(2, '0');
  const seconds = _duration.seconds().toString().padStart(2, '0');

  format = format.replace('MM', months);
  format = format.replace('dd', days);
  format = format.replace('HH', hours);
  format = format.replace('mm', minutes);
  format = format.replace('ss', seconds);

  return format;
}

export function formatScan(
  barcodeValue: string,
  barcodeType: string,
  config: boolean = true,
) {
  if (config && barcodeType != null && barcodeValue != null) {
    if (
      ['ean13', 'ean8', 'upca'].includes(
        barcodeType.toLowerCase().replaceAll(/[-_]/g, ''),
      )
    ) {
      return barcodeValue.slice(0, -1);
    } else {
      return barcodeValue;
    }
  } else {
    return barcodeValue;
  }
}

const REGEX_END_SYMBOL = /\/#/g;
const REGEX_LOGINJSP_END_SYMBOL = /\/login.jsp#/g;
const REGEX_LOGINJSP = /\/login.jsp/g;
const REGEX_URL_END = /\/{2,}/g;

export function formatURL(url: String): String {
  if (checkNullString(url)) {
    return '';
  }

  const cleanURL = url
    .replaceAll(REGEX_END_SYMBOL, '')
    .replaceAll(REGEX_LOGINJSP_END_SYMBOL, '')
    .replaceAll(REGEX_LOGINJSP, '')
    .replaceAll(REGEX_URL_END, '/');

  return addEndSlash(cleanURL);
}

function addEndSlash(url: String): String {
  if (url.slice(-1) === '/') {
    return url;
  }

  return url + '/';
}

export const getNowDateZonesISOString = () => {
  const now = new Date();

  return getDateZonesISOString(now.toString());
};

export const getDateZonesISOString = (dateString: string) => {
  const _date = new Date(dateString);

  const year = _date.getFullYear();
  const month = (_date.getMonth() + 1).toString().padStart(2, '0');
  const day = _date.getDate().toString().padStart(2, '0');

  const date = `${year}-${month}-${day}`;

  const hours = _date.getHours().toString().padStart(2, '0');
  const minutes = _date.getMinutes().toString().padStart(2, '0');
  const seconds = _date.getSeconds().toString().padStart(2, '0');
  const milliseconds = _date.getMilliseconds().toString().padStart(3, '0');

  const time = `${hours}:${minutes}:${seconds}.${milliseconds}`;

  return `${date}T${time}`;
};

const isValidObject = (value: any) =>
  value != null && typeof value === 'object';

export const formatRequestBody = (
  data: object,
  matcherPrefix: string = null,
) => {
  if (isEmpty(data)) {
    return {formattedData: null, matchers: {}};
  }

  let _data = {};
  let matchers = {};

  Object.entries(data).forEach(([_key, _value]) => {
    const matcherKey = `${matcherPrefix ? matcherPrefix + '.' : ''}${_key}`;
    matchers[matcherKey] = _key;

    if (Array.isArray(_value)) {
      _data[_key] = _value.map(_i => (isValidObject(_i) ? {id: _i.id} : _i));
    } else if (isValidObject(_value)) {
      _data[_key] = {id: _value.id};
    } else {
      _data[_key] = _value;
    }
  });

  return {formattedData: _data, matchers};
};
