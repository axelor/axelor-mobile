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

import {getMonthTitleKey} from '../../../../utils';
import {GanttDay, GanttMonthBand, GanttPeriod, GanttScaleCell} from '../types';

type Translator = (key: string) => string;

const spanContains = (
  dayIndex: number,
  numberOfDays: number,
  targetIndex: number,
): boolean => targetIndex >= dayIndex && targetIndex < dayIndex + numberOfDays;

const formatMonth = (
  monthIndex: number,
  year: number,
  translator: Translator,
): string => `${translator(getMonthTitleKey(monthIndex))} ${year}`;

const formatMonthSpan = (
  first: GanttDay,
  last: GanttDay,
  translator: Translator,
): string => {
  if (first == null || last == null) return '';

  if (first.monthIndex === last.monthIndex && first.year === last.year)
    return formatMonth(last.monthIndex, last.year, translator);

  const firstMonth = translator(getMonthTitleKey(first.monthIndex));

  return first.year === last.year
    ? `${firstMonth} / ${formatMonth(last.monthIndex, last.year, translator)}`
    : `${formatMonth(first.monthIndex, first.year, translator)} / ${formatMonth(
        last.monthIndex,
        last.year,
        translator,
      )}`;
};

export const buildMonthBandCells = (
  bands: GanttMonthBand[],
  dayWidth: number,
  todayIndex: number,
  translator: Translator,
): GanttScaleCell[] =>
  bands.map(({key, dayIndex, numberOfDays, monthIndex, year}) => ({
    key,
    width: numberOfDays * dayWidth,
    label: formatMonth(monthIndex, year, translator),
    isCurrent: spanContains(dayIndex, numberOfDays, todayIndex),
  }));

export const buildWeekBandCells = (
  periods: GanttPeriod[],
  days: GanttDay[],
  dayWidth: number,
  todayIndex: number,
  weekPrefix: string,
  translator: Translator,
): GanttScaleCell[] =>
  periods.map(({key, dayIndex, numberOfDays, weekNumber}) => ({
    key,
    width: numberOfDays * dayWidth,
    label: `${weekPrefix}${weekNumber} · ${formatMonthSpan(
      days[dayIndex],
      days[dayIndex + numberOfDays - 1],
      translator,
    )}`,
    isCurrent: spanContains(dayIndex, numberOfDays, todayIndex),
  }));

export const buildWeekRangeCells = (
  periods: GanttPeriod[],
  days: GanttDay[],
  dayWidth: number,
  todayIndex: number,
  weekPrefix: string,
): GanttScaleCell[] =>
  periods.map(({key, dayIndex, numberOfDays, weekNumber}) => {
    const first = days[dayIndex];
    const last = days[dayIndex + numberOfDays - 1];

    return {
      key,
      width: numberOfDays * dayWidth,
      label: `${weekPrefix}${weekNumber} ${first?.dayNumber}-${last?.dayNumber}`,
      isCurrent: spanContains(dayIndex, numberOfDays, todayIndex),
    };
  });
