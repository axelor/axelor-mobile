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
import {
  CalendarMonth,
  fromDateString,
  sliceByMonth,
  toDateString,
} from '../../../utils';
import {DateRange, DayMark} from './types';

export const isDayFull = (mark?: DayMark): boolean =>
  mark?.fullDay ?? (mark?.morningColor != null && mark?.afternoonColor != null);

export const hasEvents = (mark?: DayMark): boolean =>
  Array.isArray(mark?.events) && mark.events.length > 0;

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
