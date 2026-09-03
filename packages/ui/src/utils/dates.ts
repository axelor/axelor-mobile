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

export const DEFAULT_FIRST_DAY_OF_WEEK = 1;

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

export interface CalendarDay {
  dateString: string;
  dayNumber: number;
  isWeekEnd: boolean;
  isOutOfMonth: boolean;
}

export interface CalendarMonth {
  key: string;
  monthKey: string;
  year: number;
  monthIndex: number;
  weeks: CalendarDay[][];
}

export const getMonthKey = (year: number, monthIndex: number): string =>
  toDateString(new Date(year, monthIndex, 1)).slice(0, 7);

export const buildMonth = (
  year: number,
  monthIndex: number,
  firstDayOfWeek: number,
): CalendarMonth => {
  const firstDay = new Date(year, monthIndex, 1);
  const _year = firstDay.getFullYear();
  const _monthIndex = firstDay.getMonth();
  const numberOfDays = new Date(_year, _monthIndex + 1, 0).getDate();
  const leadingCells = (firstDay.getDay() - firstDayOfWeek + 7) % 7;
  const numberOfCells = Math.ceil((leadingCells + numberOfDays) / 7) * 7;

  const cells: CalendarDay[] = [];

  for (let index = 0; index < numberOfCells; index++) {
    const day = new Date(_year, _monthIndex, index - leadingCells + 1);

    cells.push({
      dateString: toDateString(day),
      dayNumber: day.getDate(),
      isWeekEnd: isWeekEnd(day),
      isOutOfMonth: day.getMonth() !== _monthIndex,
    });
  }

  const weeks: CalendarDay[][] = [];

  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  const monthKey = getMonthKey(_year, _monthIndex);

  return {key: monthKey, monthKey, year: _year, monthIndex: _monthIndex, weeks};
};

export const buildMonths = (
  referenceDate: Date,
  monthsBefore: number,
  monthsAfter: number,
  firstDayOfWeek: number,
): CalendarMonth[] => {
  const months: CalendarMonth[] = [];

  for (let index = -monthsBefore; index <= monthsAfter; index++) {
    months.push(
      buildMonth(
        referenceDate.getFullYear(),
        referenceDate.getMonth() + index,
        firstDayOfWeek,
      ),
    );
  }

  return months;
};

export const monthIndexOf = (
  months: CalendarMonth[],
  dateString: string | undefined,
): number =>
  dateString == null
    ? -1
    : months.findIndex(({monthKey}) => monthKey === dateString.slice(0, 7));

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
