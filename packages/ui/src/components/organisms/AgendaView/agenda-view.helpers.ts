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
  CalendarMonth,
  fromDateString,
  isWeekEnd,
  toDateString,
} from '../../../utils';
import {AgendaDay} from './types';

export const DEFAULT_DAYS_AHEAD = 31;

const toAgendaDay = (date: Date): AgendaDay => {
  const dateString = toDateString(date);

  return {
    dateString,
    dayNumber: date.getDate(),
    dayIndex: date.getDay(),
    monthKey: dateString.slice(0, 7),
    isWeekEnd: isWeekEnd(date),
    isFirstOfMonth: date.getDate() === 1,
  };
};

export const buildDayWindow = (
  anchorDate: string | undefined,
  length: number,
  lastDate?: string,
): AgendaDay[] => {
  if (anchorDate == null || length <= 0) return [];

  const anchor = fromDateString(anchorDate);
  const days: AgendaDay[] = [];

  for (let index = 0; index < length; index++) {
    const date = new Date(
      anchor.getFullYear(),
      anchor.getMonth(),
      anchor.getDate() + index,
    );
    const day = toAgendaDay(date);

    if (lastDate != null && day.dateString > lastDate) break;

    days.push(day);
  }

  return days;
};

export const shiftDate = (dateString: string, days: number): string => {
  const date = fromDateString(dateString);

  return toDateString(
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + days),
  );
};

export const weekIndexOfDate = (
  month: CalendarMonth,
  dateString: string,
): number => {
  const index = month.weeks.findIndex(week =>
    week.some(day => !day.isOutOfMonth && day.dateString === dateString),
  );

  return index < 0 ? 0 : index;
};
