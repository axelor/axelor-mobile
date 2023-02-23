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

import moment from 'moment';

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

export function formatScan(barcodeValue, barcodeType, config = true) {
  if (config && barcodeType != null && barcodeValue != null) {
    if (
      barcodeType === 'EAN_13' ||
      barcodeType === 'EAN_8' ||
      barcodeType === 'UPC_A'
    ) {
      return barcodeValue.slice(0, -1);
    } else {
      return barcodeValue;
    }
  } else {
    return barcodeValue;
  }
}

export function formatURL(url: String): String {
  if (url.slice(-1) === '/') {
    return url;
  }

  return url + '/';
}
