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

import {Platform, StyleSheet, ViewStyle} from 'react-native';
import {CalendarMonth} from './dates';

export const DAY_ROW_HEIGHT = 46;
export const MONTH_TITLE_HEIGHT = 44;
export const WEEK_DAYS_ROW_HEIGHT = 26;

export const CELL_INSET = 3;
export const CELL_RADIUS = 8;

export const MAX_WEEKS_IN_MONTH = 6;

export const getWeeksHeight = (numberOfWeeks: number): number =>
  numberOfWeeks * DAY_ROW_HEIGHT;

export const getMonthHeight = (numberOfWeeks: number): number =>
  MONTH_TITLE_HEIGHT + WEEK_DAYS_ROW_HEIGHT + getWeeksHeight(numberOfWeeks);

export const buildMonthLayout = (
  months: CalendarMonth[],
): {heights: number[]; offsets: number[]} => {
  const heights: number[] = [];
  const offsets: number[] = [];

  let offset = 0;

  months.forEach(({weeks}) => {
    const height = getMonthHeight(weeks.length);

    heights.push(height);
    offsets.push(offset);
    offset += height;
  });

  return {heights, offsets};
};

export const getTodayOutlineStyle = (color: string): ViewStyle => ({
  borderColor: color,
  borderStyle: Platform.OS === 'ios' ? 'solid' : 'dashed',
});

const inset = {
  position: 'absolute' as const,
  top: CELL_INSET,
  bottom: CELL_INSET,
  left: CELL_INSET,
  right: CELL_INSET,
  borderRadius: CELL_RADIUS,
};

export const dayCellStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: DAY_ROW_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fillContainer: {...inset, overflow: 'hidden'},
  outline: {...inset, borderWidth: 1},
  text: {
    textAlign: 'center',
  },
});
