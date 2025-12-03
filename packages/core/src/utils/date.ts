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

export const isDate = (date: string): boolean => {
  return moment(date, moment.ISO_8601, true).isValid();
};

export const isDateTime = (date: string): boolean => {
  return isDate(date) && date?.length > 10;
};

export const getNextMonth = (date: Date, months: number = 1): Date => {
  let _date: Date;

  if (date.getMonth() === 11) {
    _date = new Date(date.getFullYear() + 1, 0, date.getDate());
  } else {
    _date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  return months <= 1 ? _date : getNextMonth(_date, months - 1);
};

export const getPreviousMonth = (date: Date, months: number = 1): Date => {
  let _date: Date;

  if (date.getMonth() === 0) {
    _date = new Date(date.getFullYear() - 1, 11, date.getDate());
  } else {
    _date = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
  }

  return months <= 1 ? _date : getPreviousMonth(_date, months - 1);
};

export const sameDate = (date1: Date, date2: Date): boolean => {
  if (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  ) {
    return true;
  }

  return false;
};

export const diffDate = (start: Date, end: Date): number => {
  const _start = moment(start.toISOString());
  const _end = moment(end.toISOString());
  return _end.diff(_start, 'days') + 1;
};

export const isMidnightDate = (date: string): boolean => {
  const _date = moment(date);

  return _date.format('HH:mm') === '00:00';
};

export const incrementDate = (date: Date, days: number): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
};

export const decreaseDate = (date: Date, days: number): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};

const dayOfWeek = [
  'Base_Day_Sun',
  'Base_Day_Mon',
  'Base_Day_Tue',
  'Base_Day_Wed',
  'Base_Day_Thu',
  'Base_Day_Fri',
  'Base_Day_Sat',
];

const month = [
  'Base_Month_Jan',
  'Base_Month_Feb',
  'Base_Month_Mar',
  'Base_Month_Apr',
  'Base_Month_May',
  'Base_Month_Jun',
  'Base_Month_Jul',
  'Base_Month_Aug',
  'Base_Month_Sep',
  'Base_Month_Oct',
  'Base_Month_Nov',
  'Base_Month_Dec',
];

export const getDay = (
  date: Date,
  I18n: {t: (key: string) => string},
): string => {
  return I18n.t(dayOfWeek[date.getDay()]);
};

export const getMonth = (
  date: Date,
  I18n: {t: (key: string) => string},
): string => {
  return I18n.t(month[date.getMonth()]);
};

export const getFullDateItems = (
  date: string,
  I18n: {t: (key: string) => string},
): {day: string; date: number; month: string; year: number} => {
  if (date == null) {
    return null;
  }

  const _date = new Date(date);

  return {
    day: getDay(_date, I18n),
    date: _date.getDate(),
    month: getMonth(_date, I18n),
    year: _date.getFullYear(),
  };
};
