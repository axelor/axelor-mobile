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

const MONTH_LONG_KEYS = [
  'Base_MonthLong_January',
  'Base_MonthLong_February',
  'Base_MonthLong_March',
  'Base_MonthLong_April',
  'Base_MonthLong_May',
  'Base_MonthLong_June',
  'Base_MonthLong_July',
  'Base_MonthLong_August',
  'Base_MonthLong_September',
  'Base_MonthLong_October',
  'Base_MonthLong_November',
  'Base_MonthLong_December',
];

const DAY_SHORT_KEYS = [
  'Base_Day_Sun',
  'Base_Day_Mon',
  'Base_Day_Tue',
  'Base_Day_Wed',
  'Base_Day_Thu',
  'Base_Day_Fri',
  'Base_Day_Sat',
];

const pad = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

export const toDateString = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const fromDateString = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);

  return new Date(year, month - 1, day);
};

export const startOfWeek = (date: Date, firstDayOfWeek: number): Date => {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  result.setDate(
    result.getDate() - ((result.getDay() - firstDayOfWeek + 7) % 7),
  );

  return result;
};

export const isWeekEnd = (date: Date): boolean =>
  date.getDay() === 0 || date.getDay() === 6;

export const formatDateString = (
  dateString: string,
  format: string,
): string => {
  if (dateString == null || format == null) return '';

  const [year, month, day] = dateString.split('-');

  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year)
    .replace('YY', year?.slice(2));
};

export const getMonthTitleKey = (monthIndex: number): string =>
  MONTH_LONG_KEYS[monthIndex];

export const getDayTitleKey = (dayIndex: number): string =>
  DAY_SHORT_KEYS[dayIndex];

export const getWeekDayKeys = (firstDayOfWeek: number): string[] =>
  DAY_SHORT_KEYS.map(
    (_, index) => DAY_SHORT_KEYS[(index + firstDayOfWeek) % 7],
  );

export const formatLongDate = (
  dateString: string | undefined,
  translator: (key: string) => string,
): string => {
  if (dateString == null) return '';

  const date = fromDateString(dateString);

  return `${translator(
    getDayTitleKey(date.getDay()),
  )} ${date.getDate()} ${translator(
    getMonthTitleKey(date.getMonth()),
  )} ${date.getFullYear()}`;
};

export const formatDateRange = (
  fromDate: string | undefined,
  toDate: string | undefined,
  translator: (key: string) => string,
): string => {
  if (fromDate == null || toDate == null) return '';

  const from = fromDateString(fromDate);
  const to = fromDateString(toDate);

  const fromMonth = translator(getMonthTitleKey(from.getMonth()));
  const toMonth = translator(getMonthTitleKey(to.getMonth()));

  if (from.getFullYear() !== to.getFullYear()) {
    return `${from.getDate()} ${fromMonth} ${from.getFullYear()} - ${to.getDate()} ${toMonth} ${to.getFullYear()}`;
  }

  if (from.getMonth() !== to.getMonth()) {
    return `${from.getDate()} ${fromMonth} - ${to.getDate()} ${toMonth}`;
  }

  return `${from.getDate()} - ${to.getDate()} ${toMonth}`;
};
