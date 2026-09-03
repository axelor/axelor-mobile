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

import {
  DEFAULT_FIRST_DAY_OF_WEEK,
  fromDateString,
  isWeekEnd,
  startOfWeek,
  toDateString,
} from '../../../utils';
import {DayFill, WeekDay, WeekPage} from './types';

export const GAUGE_SIZE = 30;
export const DAY_LABEL_HEIGHT = 20;
export const WEEK_ROW_HEIGHT = 74;

const EMPTY_FILLS: Record<string, DayFill> = Object.freeze({});

export const buildWeeks = (
  fromDate: string | undefined,
  toDate: string | undefined,
  firstDayOfWeek: number,
): WeekPage[] => {
  if (fromDate == null || toDate == null || fromDate > toDate) return [];

  const lastDay = fromDateString(toDate);
  const cursor = startOfWeek(fromDateString(fromDate), firstDayOfWeek);
  const weeks: WeekPage[] = [];

  while (cursor <= lastDay) {
    const days: WeekDay[] = [];

    for (let index = 0; index < 7; index++) {
      const day = new Date(
        cursor.getFullYear(),
        cursor.getMonth(),
        cursor.getDate() + index,
      );
      const dateString = toDateString(day);

      days.push({
        dateString,
        dayNumber: day.getDate(),
        isWeekEnd: isWeekEnd(day),
        isOutOfPeriod: dateString < fromDate || dateString > toDate,
      });
    }

    weeks.push({key: days[0].dateString, days});
    cursor.setDate(cursor.getDate() + 7);
  }

  return weeks;
};

export const getWeekDates = (
  dateString: string | undefined,
  firstDayOfWeek: number = DEFAULT_FIRST_DAY_OF_WEEK,
): string[] => {
  if (dateString == null) return [];

  const first = startOfWeek(fromDateString(dateString), firstDayOfWeek);

  return Array.from({length: 7}, (_, index) =>
    toDateString(
      new Date(first.getFullYear(), first.getMonth(), first.getDate() + index),
    ),
  );
};

export const weekIndexOf = (weeks: WeekPage[], dateString?: string): number => {
  if (dateString == null) return -1;

  return weeks.findIndex(week =>
    week.days.some(day => day.dateString === dateString),
  );
};

export const sliceFillsByWeek = (
  fillByDate: Record<string, DayFill>,
  weeks: WeekPage[],
): Record<string, DayFill>[] =>
  weeks.map(week => {
    let slice: Record<string, DayFill> | undefined;

    week.days.forEach(day => {
      const fill = fillByDate[day.dateString];

      if (fill != null) {
        if (slice == null) slice = {};
        slice[day.dateString] = fill;
      }
    });

    return slice ?? EMPTY_FILLS;
  });

export const sameWeekDayIn = (
  week: WeekPage,
  dateString: string,
  firstDayOfWeek: number,
): string | undefined => {
  if (week == null || dateString == null) return undefined;

  const target =
    week.days[(fromDateString(dateString).getDay() - firstDayOfWeek + 7) % 7];

  if (target != null && !target.isOutOfPeriod) return target.dateString;

  const available = week.days.filter(day => !day.isOutOfPeriod);

  if (available.length === 0) return undefined;

  const last = available[available.length - 1];

  return target != null && target.dateString > last.dateString
    ? last.dateString
    : available[0].dateString;
};
