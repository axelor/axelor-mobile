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

export type GanttZoom = 'week' | 'month';

export interface GanttDay {
  dateString: string;
  dayNumber: number;
  dayOfWeek: number;
  monthIndex: number;
  year: number;
  isWeekEnd: boolean;
  isFirstDayOfWeek: boolean;
}

export interface GanttPeriod {
  key: string;
  dayIndex: number;
  numberOfDays: number;
  monthIndex: number;
  lastMonthIndex: number;
  weekNumber: number;
}

export interface GanttMonthBand {
  key: string;
  dayIndex: number;
  numberOfDays: number;
  monthIndex: number;
  year: number;
}

export interface GanttScaleCell {
  key: string;
  width: number;
  label: string;
  isCurrent: boolean;
}

export interface GanttItem {
  id: string | number;
  startDate: string;
  endDate: string;
  startsAfternoon?: boolean;
  endsMorning?: boolean;
  title?: string;
  color: Color;
  priority?: number;
  data?: any;
}

export interface GanttRow {
  key: string;
  title: string;
  subtitle?: string;
  warning?: string;
  items?: GanttItem[];
  nonWorkingDays?: Record<string, Color>;
  data?: any;
}

export interface GanttGroup {
  key: string;
  title: string;
  rows: GanttRow[];
}

export interface GanttRange {
  fromDate: string;
  toDate: string;
}

export interface GanttFill {
  key: string;
  left: number;
  width: number;
  color: Color;
}

export interface GanttBarGeometry {
  left: number;
  width: number;
  clipStart: boolean;
  clipEnd: boolean;
}
