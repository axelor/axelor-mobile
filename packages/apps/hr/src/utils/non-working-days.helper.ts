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

import {Color, fromDateString, toDateString} from '@axelor/aos-mobile-ui';

interface HRDayPlanning {
  holidays?: Record<string, string[]>;
  weekends?: Record<string, string[]>;
  employeeDayPlanning?: Record<
    string,
    {holidayId?: number; weekendId?: number}
  >;
}

export const NonWorkingDay = {
  weekEnd: 'weekEnd',
  publicHoliday: 'publicHoliday',
} as const;

export type NonWorkingDayType =
  (typeof NonWorkingDay)[keyof typeof NonWorkingDay];

const addDates = (
  target: Record<string, NonWorkingDayType>,
  dates: string[] | undefined,
  type: NonWorkingDayType,
): Record<string, NonWorkingDayType> => {
  dates?.forEach(date => {
    target[date] = type;
  });

  return target;
};

export const mapPlanningToNonWorkingDays = (
  planning: HRDayPlanning,
  employeeId: number,
): Record<string, NonWorkingDayType> => {
  const result: Record<string, NonWorkingDayType> = {};

  if (planning == null || employeeId == null) return result;

  const employeePlanning = planning.employeeDayPlanning?.[`${employeeId}`];

  if (employeePlanning == null) return result;

  const {holidayId, weekendId} = employeePlanning;

  if (weekendId != null) {
    addDates(
      result,
      planning.weekends?.[`${weekendId}`],
      NonWorkingDay.weekEnd,
    );
  }

  if (holidayId != null) {
    addDates(
      result,
      planning.holidays?.[`${holidayId}`],
      NonWorkingDay.publicHoliday,
    );
  }

  return result;
};

export const mapNonWorkingDaysToColors = (
  nonWorkingDays: Record<string, NonWorkingDayType>,
  colors: Record<NonWorkingDayType, Color>,
): Record<string, Color> => {
  const result: Record<string, Color> = {};

  Object.entries(nonWorkingDays ?? {}).forEach(([dateString, type]) => {
    const color = colors?.[type];

    if (color != null) {
      result[dateString] = color;
    }
  });

  return result;
};

export const computeWeekEnds = (
  fromDate: string,
  toDate: string,
): Record<string, NonWorkingDayType> => {
  const result: Record<string, NonWorkingDayType> = {};

  if (fromDate == null || toDate == null) return result;

  const lastDate = fromDateString(toDate);
  const currentDate = fromDateString(fromDate);

  while (currentDate <= lastDate) {
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      result[toDateString(currentDate)] = NonWorkingDay.weekEnd;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
};
