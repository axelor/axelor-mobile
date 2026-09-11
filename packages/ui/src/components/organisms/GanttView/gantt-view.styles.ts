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

import {StyleSheet} from 'react-native';
import {DAYS_IN_WEEK} from '../../../utils';

export const NAME_COLUMN_WIDTH = 104;

export const GANTT_ROW_HEIGHT = 46;
export const GANTT_GROUP_HEIGHT = 26;

export const GANTT_SCALE_BAND_HEIGHT = 22;
export const GANTT_SCALE_DETAIL_HEIGHT = 26;
export const GANTT_SCALE_HEIGHT =
  GANTT_SCALE_BAND_HEIGHT + GANTT_SCALE_DETAIL_HEIGHT;

export const GANTT_BAR_HEIGHT = 22;
export const GANTT_BAR_RADIUS = 6;
export const GANTT_BAR_MIN_WIDTH = 4;
export const GANTT_BAR_INSET = (GANTT_ROW_HEIGHT - GANTT_BAR_HEIGHT) / 2;

export const GANTT_BAR_GAP = 2;

export const GANTT_CELL_HEIGHT = 14;
export const GANTT_CELL_LABEL_MIN_WIDTH = 22;
export const GANTT_BAR_INSET_WITH_CELLS =
  (GANTT_ROW_HEIGHT - GANTT_CELL_HEIGHT - GANTT_BAR_HEIGHT) / 2;

export const getBarInset = (hasCells: boolean): number =>
  hasCells ? GANTT_BAR_INSET_WITH_CELLS : GANTT_BAR_INSET;

export const getBarTop = (laneIndex: number, hasCells: boolean): number =>
  getBarInset(hasCells) + laneIndex * (GANTT_BAR_HEIGHT + GANTT_BAR_GAP);

export const getRowHeight = (laneCount: number, hasCells: boolean): number => {
  const lanes = Math.max(laneCount, 1);
  const barsHeight = lanes * GANTT_BAR_HEIGHT + (lanes - 1) * GANTT_BAR_GAP;

  return Math.max(
    GANTT_ROW_HEIGHT,
    getBarInset(hasCells) * 2 + barsHeight + (hasCells ? GANTT_CELL_HEIGHT : 0),
  );
};

export const GANTT_GRID_LINE_WIDTH = 1;

export const GANTT_DAYS_PER_PAGE = {
  week: DAYS_IN_WEEK,
  month: 30,
} as const;

export const getDayWidth = (gridWidth: number, daysPerPage: number): number =>
  daysPerPage > 0 ? gridWidth / daysPerPage : 0;

export const getGridWidth = (containerWidth: number): number =>
  Math.max(containerWidth - NAME_COLUMN_WIDTH, 0);

export const ganttStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scaleRow: {
    flexDirection: 'row',
    height: GANTT_SCALE_HEIGHT,
  },
  scaleCorner: {
    width: NAME_COLUMN_WIDTH,
    height: GANTT_SCALE_HEIGHT,
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  scaleClip: {
    flex: 1,
    overflow: 'hidden',
  },
  body: {
    flex: 1,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  nameColumn: {
    width: NAME_COLUMN_WIDTH,
    borderRightWidth: 1,
  },
  lanesClip: {
    flex: 1,
  },
  groupRow: {
    height: GANTT_GROUP_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 7,
    borderBottomWidth: 1,
  },
  groupLane: {
    height: GANTT_GROUP_HEIGHT,
    borderBottomWidth: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: 8,
    paddingRight: 4,
    paddingVertical: 3,
    borderBottomWidth: 1,
  },
  lane: {
    borderBottomWidth: 1,
  },
  fill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  bar: {
    position: 'absolute',
    height: GANTT_BAR_HEIGHT,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cellStrip: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: GANTT_CELL_HEIGHT,
  },
  cell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
