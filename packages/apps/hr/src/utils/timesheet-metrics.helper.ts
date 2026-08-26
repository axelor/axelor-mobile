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
  Color,
  DayFill,
  fromDateString,
  toDateString,
} from '@axelor/aos-mobile-ui';
import type {
  TimesheetLineCount,
  TimesheetLineCountMap,
} from '../api/timesheet-line-api';

export const TimeLoggingPreference = {
  days: 'days',
  hours: 'hours',
  minutes: 'minutes',
} as const;

export type TimeLoggingPreferenceValue =
  (typeof TimeLoggingPreference)[keyof typeof TimeLoggingPreference];

export interface DayMetrics {
  actualTime: number;
  plannedTime: number;
  expectedTime: number;
  leaveTime: number;
  difference: number;
}

export interface DayPeriod {
  fromDate: string;
  toDate: string;
}

type DurationField = Exclude<keyof TimesheetLineCount, 'leaveReason'>;

interface DurationKeys {
  durationKey: DurationField;
  planningDurationKey: DurationField;
  leaveKey: DurationField;
}

export const getDurationKeys = (
  preference: TimeLoggingPreferenceValue,
): DurationKeys => {
  switch (preference) {
    case TimeLoggingPreference.days:
      return {
        durationKey: 'duration',
        planningDurationKey: 'weeklyPlanningDuration',
        leaveKey: 'leaveDuration',
      };
    case TimeLoggingPreference.minutes:
      return {
        durationKey: 'duration',
        planningDurationKey: 'weeklyPlanningHoursDuration',
        leaveKey: 'leaveHoursDuration',
      };
    default:
      return {
        durationKey: 'hoursDuration',
        planningDurationKey: 'weeklyPlanningHoursDuration',
        leaveKey: 'leaveHoursDuration',
      };
  }
};

const getCoefficient = (preference: TimeLoggingPreferenceValue): number =>
  preference === TimeLoggingPreference.minutes ? 60 : 1;

export const getDayMetrics = (
  count: TimesheetLineCount,
  preference: TimeLoggingPreferenceValue,
): DayMetrics => {
  const {durationKey, planningDurationKey, leaveKey} =
    getDurationKeys(preference);
  const coefficient = getCoefficient(preference);

  const leaveTime = Number(count?.[leaveKey] ?? 0) * coefficient;
  const plannedTime = Number(count?.[planningDurationKey] ?? 0) * coefficient;

  const actualTime = Number(count?.[durationKey] ?? 0);

  return {
    actualTime,
    plannedTime,
    expectedTime: Math.max(plannedTime - leaveTime, 0),
    leaveTime,
    difference: actualTime + leaveTime - plannedTime,
  };
};

export const sumDayMetrics = (
  counts: TimesheetLineCountMap,
  preference: TimeLoggingPreferenceValue,
  dateStrings?: string[],
): DayMetrics => {
  const dates = dateStrings ?? Object.keys(counts ?? {});

  return dates.reduce(
    (total, dateString) => {
      const count = counts?.[dateString];

      if (count == null) return total;

      const metrics = getDayMetrics(count, preference);

      return {
        actualTime: total.actualTime + metrics.actualTime,
        plannedTime: total.plannedTime + metrics.plannedTime,
        expectedTime: total.expectedTime + metrics.expectedTime,
        leaveTime: total.leaveTime + metrics.leaveTime,
        difference: total.difference + metrics.difference,
      };
    },
    {
      actualTime: 0,
      plannedTime: 0,
      expectedTime: 0,
      leaveTime: 0,
      difference: 0,
    },
  );
};

export const getTimesheetPeriod = (timesheet: any): DayPeriod | undefined => {
  const fromDate = timesheet?.fromDate;

  if (fromDate == null) return undefined;
  if (timesheet?.toDate != null) return {fromDate, toDate: timesheet.toDate};

  const firstDay = fromDateString(fromDate);

  return {
    fromDate,
    toDate: toDateString(
      new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0),
    ),
  };
};

export const buildFillByDate = (
  counts: TimesheetLineCountMap,
  preference: TimeLoggingPreferenceValue,
  colors: {leaveColor: Color; nonWorkingColor: Color},
): Record<string, DayFill> | undefined => {
  if (counts == null) return undefined;

  const result: Record<string, DayFill> = {};

  Object.keys(counts).forEach(dateString => {
    const count = counts[dateString];
    const {actualTime, expectedTime} = getDayMetrics(count, preference);
    const isLeave = count?.leaveReason != null && count.leaveReason !== '';
    const isDisabled = expectedTime <= 0;

    result[dateString] = {
      ratio: expectedTime > 0 ? actualTime / expectedTime : undefined,
      filled: actualTime > 0,
      disabled: isDisabled,
      color: isDisabled
        ? isLeave
          ? colors.leaveColor
          : colors.nonWorkingColor
        : undefined,
    };
  });

  return result;
};

export const buildFillFromLines = (lines: any[]): Record<string, DayFill> => {
  const result: Record<string, DayFill> = {};

  lines?.forEach(line => {
    if (line?.date != null) {
      result[line.date] = {filled: true};
    }
  });

  return result;
};

export const groupLinesByDate = (lines: any[]): Record<string, any[]> => {
  const result: Record<string, any[]> = {};

  lines?.forEach(line => {
    if (line?.date == null) return;

    if (result[line.date] == null) {
      result[line.date] = [];
    }

    result[line.date].push(line);
  });

  return result;
};

export const formatMetric = (value: number, withSign = false): string => {
  const rounded = Number.isInteger(value) ? `${value}` : value.toFixed(2);

  return withSign && value > 0 ? `+${rounded}` : rounded;
};
