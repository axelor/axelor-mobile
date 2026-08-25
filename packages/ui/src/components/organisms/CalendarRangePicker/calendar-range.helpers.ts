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

import {Color} from '../../../theme';

export const DAY_ROW_HEIGHT = 46;
export const MONTH_TITLE_HEIGHT = 44;
export const WEEK_DAYS_ROW_HEIGHT = 26;

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

export interface CalendarDay {
  dateString: string;
  dayNumber: number;
  isWeekEnd: boolean;
}

export interface CalendarMonth {
  key: string;
  monthKey: string;
  year: number;
  monthIndex: number;
  weeks: (CalendarDay | null)[][];
  height: number;
}

export interface DayMark {
  morningColor?: Color;
  afternoonColor?: Color;
  events?: any[];
}

export interface DateRange {
  startDate?: string;
  endDate?: string;
}

const pad = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

export const toDateString = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const fromDateString = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);

  return new Date(year, month - 1, day);
};

export const isDayFull = (mark?: DayMark): boolean =>
  mark?.morningColor != null && mark?.afternoonColor != null;

export const hasEvents = (mark?: DayMark): boolean =>
  Array.isArray(mark?.events) && mark.events.length > 0;

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

export const getMonthKey = (year: number, monthIndex: number): string =>
  `${year}-${pad(monthIndex + 1)}`;

export const getMonthTitleKey = (monthIndex: number): string =>
  MONTH_LONG_KEYS[monthIndex];

export const getWeekDayKeys = (firstDayOfWeek: number): string[] =>
  DAY_SHORT_KEYS.map(
    (_, index) => DAY_SHORT_KEYS[(index + firstDayOfWeek) % 7],
  );

export const getMonthHeight = (numberOfWeeks: number): number =>
  MONTH_TITLE_HEIGHT + WEEK_DAYS_ROW_HEIGHT + numberOfWeeks * DAY_ROW_HEIGHT;

const buildMonth = (
  year: number,
  monthIndex: number,
  firstDayOfWeek: number,
): CalendarMonth => {
  const firstDay = new Date(year, monthIndex, 1);
  const _year = firstDay.getFullYear();
  const _monthIndex = firstDay.getMonth();
  const numberOfDays = new Date(_year, _monthIndex + 1, 0).getDate();
  const leadingEmptyCells = (firstDay.getDay() - firstDayOfWeek + 7) % 7;

  const cells: (CalendarDay | null)[] = new Array(leadingEmptyCells).fill(null);

  for (let dayNumber = 1; dayNumber <= numberOfDays; dayNumber++) {
    const dayOfWeek = new Date(_year, _monthIndex, dayNumber).getDay();

    cells.push({
      dateString: `${_year}-${pad(_monthIndex + 1)}-${pad(dayNumber)}`,
      dayNumber,
      isWeekEnd: dayOfWeek === 0 || dayOfWeek === 6,
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: (CalendarDay | null)[][] = [];

  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  const monthKey = getMonthKey(_year, _monthIndex);

  return {
    key: monthKey,
    monthKey,
    year: _year,
    monthIndex: _monthIndex,
    weeks,
    height: getMonthHeight(weeks.length),
  };
};

export const buildMonths = (
  referenceDate: Date,
  monthsBefore: number,
  monthsAfter: number,
  firstDayOfWeek: number,
): {months: CalendarMonth[]; offsets: number[]} => {
  const months: CalendarMonth[] = [];
  const offsets: number[] = [];

  let offset = 0;

  for (let index = -monthsBefore; index <= monthsAfter; index++) {
    const month = buildMonth(
      referenceDate.getFullYear(),
      referenceDate.getMonth() + index,
      firstDayOfWeek,
    );

    months.push(month);
    offsets.push(offset);
    offset += month.height;
  }

  return {months, offsets};
};

export const normalizeRange = (first: string, second: string): DateRange =>
  first <= second
    ? {startDate: first, endDate: second}
    : {startDate: second, endDate: first};

export const isInRange = (
  dateString: string,
  startDate?: string,
  endDate?: string,
): boolean => {
  if (startDate == null) return false;
  if (endDate == null) return dateString === startDate;

  return dateString >= startDate && dateString <= endDate;
};

export const applyDayPress = (
  dateString: string,
  selection: DateRange,
): DateRange => {
  const {startDate, endDate} = selection;

  if (startDate == null || endDate != null)
    return {startDate: dateString, endDate: undefined};

  return normalizeRange(startDate, dateString);
};

export const clampRange = (
  range: DateRange,
  isBlocked: (dateString: string) => boolean,
): DateRange => {
  const {startDate, endDate} = range;

  if (startDate == null || endDate == null || startDate === endDate)
    return range;

  const lastDate = fromDateString(endDate);
  const currentDate = fromDateString(startDate);
  let lastAvailable = startDate;

  while (currentDate <= lastDate) {
    const dateString = toDateString(currentDate);

    if (isBlocked(dateString)) return {startDate, endDate: lastAvailable};

    lastAvailable = dateString;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return range;
};

const EMPTY_MARKS: Record<string, DayMark> = Object.freeze({});
const EMPTY_DISABLED: Record<string, Color> = Object.freeze({});

export const sliceByMonth = <T>(
  data: Record<string, T>,
  months: CalendarMonth[],
  emptyValue: Record<string, T>,
): Record<string, Record<string, T>> => {
  const result: Record<string, Record<string, T>> = {};

  months.forEach(({monthKey}) => {
    result[monthKey] = emptyValue;
  });

  if (data == null) return result;

  Object.entries(data).forEach(([dateString, value]) => {
    const monthKey = dateString.slice(0, 7);

    if (result[monthKey] == null) return;

    if (result[monthKey] === emptyValue) {
      result[monthKey] = {};
    }

    result[monthKey][dateString] = value;
  });

  return result;
};

export const sliceMarksByMonth = (
  marks: Record<string, DayMark>,
  months: CalendarMonth[],
): Record<string, Record<string, DayMark>> =>
  sliceByMonth(marks, months, EMPTY_MARKS);

export const sliceDisabledByMonth = (
  disabledDates: Record<string, Color>,
  months: CalendarMonth[],
): Record<string, Record<string, Color>> =>
  sliceByMonth(disabledDates, months, EMPTY_DISABLED);

export const getMonthSelection = (
  month: CalendarMonth,
  selection: DateRange,
): DateRange => {
  const {startDate, endDate} = selection;

  if (startDate == null) return {startDate: undefined, endDate: undefined};

  const monthStart = `${month.monthKey}-01`;
  const monthEnd = `${month.monthKey}-31`;
  const rangeEnd = endDate ?? startDate;

  if (startDate > monthEnd || rangeEnd < monthStart)
    return {startDate: undefined, endDate: undefined};

  return {startDate, endDate};
};
