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
  DAYS_IN_WEEK,
  fromDateString,
  isWeekEnd,
  startOfWeek,
  toDateString,
} from '../../../utils';
import {Color} from '../../../theme';
import {GANTT_BAR_MIN_WIDTH} from './gantt-view.styles';
import {
  GanttBarGeometry,
  GanttDay,
  GanttFill,
  GanttItem,
  GanttMonthBand,
  GanttPeriod,
  GanttRange,
} from './types';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const daysBetween = (fromDate: string, toDate: string): number =>
  Math.round(
    (fromDateString(toDate).getTime() - fromDateString(fromDate).getTime()) /
      MS_PER_DAY,
  );

export const getIsoWeekNumber = (dateString: string): number => {
  const date = fromDateString(dateString);

  const thursday = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - ((date.getDay() + 6) % 7) + 3,
  );

  const firstThursday = new Date(thursday.getFullYear(), 0, 4);

  firstThursday.setDate(
    firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3,
  );

  return (
    1 +
    Math.round(
      (thursday.getTime() - firstThursday.getTime()) /
        (DAYS_IN_WEEK * MS_PER_DAY),
    )
  );
};

export const buildGanttDays = (
  referenceDate: Date,
  weeksBefore: number,
  weeksAfter: number,
  firstDayOfWeek: number,
): GanttDay[] => {
  const current = startOfWeek(referenceDate, firstDayOfWeek);

  current.setDate(current.getDate() - weeksBefore * DAYS_IN_WEEK);

  const totalDays = (weeksBefore + weeksAfter + 1) * DAYS_IN_WEEK;
  const days: GanttDay[] = [];

  for (let index = 0; index < totalDays; index++) {
    days.push({
      dateString: toDateString(current),
      dayNumber: current.getDate(),
      dayOfWeek: current.getDay(),
      monthIndex: current.getMonth(),
      year: current.getFullYear(),
      isWeekEnd: isWeekEnd(current),
      isFirstDayOfWeek: current.getDay() === firstDayOfWeek,
    });

    current.setDate(current.getDate() + 1);
  }

  return days;
};

export const buildGanttPeriods = (days: GanttDay[]): GanttPeriod[] => {
  const periods: GanttPeriod[] = [];

  days.forEach((day, index) => {
    const current = periods[periods.length - 1];

    if (current == null || day.isFirstDayOfWeek) {
      periods.push({
        key: day.dateString,
        dayIndex: index,
        numberOfDays: 1,
        monthIndex: day.monthIndex,
        lastMonthIndex: day.monthIndex,
        weekNumber: getIsoWeekNumber(day.dateString),
      });

      return;
    }

    current.numberOfDays += 1;
    current.lastMonthIndex = day.monthIndex;
  });

  return periods;
};

export const buildMonthBands = (days: GanttDay[]): GanttMonthBand[] => {
  const bands: GanttMonthBand[] = [];

  days.forEach((day, index) => {
    const current = bands[bands.length - 1];

    if (
      current != null &&
      current.monthIndex === day.monthIndex &&
      current.year === day.year
    ) {
      current.numberOfDays += 1;

      return;
    }

    bands.push({
      key: day.dateString,
      dayIndex: index,
      numberOfDays: 1,
      monthIndex: day.monthIndex,
      year: day.year,
    });
  });

  return bands;
};

export const computeBarGeometry = (
  item: GanttItem,
  firstDateString: string,
  totalDays: number,
  dayWidth: number,
): GanttBarGeometry | null => {
  if (item?.startDate == null || item?.endDate == null || dayWidth <= 0)
    return null;

  const startIndex = daysBetween(firstDateString, item.startDate);
  const endIndex = daysBetween(firstDateString, item.endDate);

  if (endIndex < startIndex) return null;

  const contentWidth = totalDays * dayWidth;

  const rawLeft = (startIndex + (item.startsAfternoon ? 0.5 : 0)) * dayWidth;
  const rawRight = (endIndex + (item.endsMorning ? 0.5 : 1)) * dayWidth;

  if (rawRight <= 0 || rawLeft >= contentWidth) return null;

  const left = Math.max(rawLeft, 0);
  const right = Math.min(rawRight, contentWidth);

  return {
    left,
    width: Math.max(right - left, GANTT_BAR_MIN_WIDTH),
    clipStart: rawLeft < 0,
    clipEnd: rawRight > contentWidth,
  };
};

export const sortItemsByPriority = (items?: GanttItem[]): GanttItem[] =>
  Array.isArray(items)
    ? [...items].sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
    : [];

export const getVisibleRange = (
  days: GanttDay[],
  scrollX: number,
  gridWidth: number,
  dayWidth: number,
  overscanDays: number = DAYS_IN_WEEK,
): GanttRange | undefined => {
  if (days.length === 0 || dayWidth <= 0 || gridWidth <= 0) return undefined;

  const lastIndex = days.length - 1;

  const firstVisible = Math.floor(scrollX / dayWidth) - overscanDays;
  const lastVisible =
    Math.ceil((scrollX + gridWidth) / dayWidth) + overscanDays;

  return {
    fromDate: days[clamp(firstVisible, 0, lastIndex)].dateString,
    toDate: days[clamp(lastVisible, 0, lastIndex)].dateString,
  };
};

export const getWeekScrollOffset = (
  dateString: string,
  firstDateString: string,
  dayWidth: number,
  gridWidth: number,
  contentWidth: number,
): number => {
  const dayIndex = daysBetween(firstDateString, dateString);
  const weekIndex = Math.floor(dayIndex / DAYS_IN_WEEK);

  return clamp(
    weekIndex * DAYS_IN_WEEK * dayWidth,
    0,
    Math.max(contentWidth - gridWidth, 0),
  );
};

export const buildNonWorkingFills = (
  days: GanttDay[],
  nonWorkingDays: Record<string, Color> | undefined,
  dayWidth: number,
): GanttFill[] => {
  if (nonWorkingDays == null || dayWidth <= 0) return [];

  const fills: GanttFill[] = [];

  let runColor: Color | undefined;
  let runStart = 0;
  let runLength = 0;

  const flush = () => {
    if (runColor == null) return;

    fills.push({
      key: days[runStart].dateString,
      left: runStart * dayWidth,
      width: runLength * dayWidth,
      color: runColor,
    });

    runColor = undefined;
    runLength = 0;
  };

  days.forEach((day, index) => {
    const color = nonWorkingDays[day.dateString];

    if (color === runColor) {
      runLength += 1;

      return;
    }

    flush();

    if (color == null) return;

    runColor = color;
    runStart = index;
    runLength = 1;
  });

  flush();

  return fills;
};

/**
 * Offset `weekStep` weeks away from where the grid currently sits. The current
 * offset is rounded to a whole week first, so repeated presses stay on week
 * boundaries even when the user left the scroll mid-week.
 */
export const getSteppedScrollOffset = (
  currentOffset: number,
  weekStep: number,
  dayWidth: number,
  gridWidth: number,
  contentWidth: number,
): number => {
  const weekWidth = DAYS_IN_WEEK * dayWidth;

  if (weekWidth <= 0) return 0;

  return clamp(
    (Math.round(currentOffset / weekWidth) + weekStep) * weekWidth,
    0,
    Math.max(contentWidth - gridWidth, 0),
  );
};
