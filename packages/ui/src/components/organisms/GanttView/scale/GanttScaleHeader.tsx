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

import React, {memo, useMemo} from 'react';
import {View} from 'react-native';
import {GanttDay, GanttMonthBand, GanttPeriod} from '../types';
import {
  buildMonthBandCells,
  buildWeekBandCells,
  buildWeekRangeCells,
} from './gantt-scale.helpers';
import GanttScaleSpanRow from './GanttScaleSpanRow';
import GanttScaleDayRow from './GanttScaleDayRow';

interface GanttScaleHeaderProps {
  days: GanttDay[];
  periods: GanttPeriod[];
  monthBands: GanttMonthBand[];
  dayWidth: number;
  contentWidth: number;
  todayDateString: string;
  showDays: boolean;
  weekPrefix?: string;
  translator: (key: string) => string;
}

const GanttScaleHeader = ({
  days,
  periods,
  monthBands,
  dayWidth,
  contentWidth,
  todayDateString,
  showDays,
  weekPrefix = '',
  translator,
}: GanttScaleHeaderProps) => {
  const todayIndex = useMemo(
    () => days.findIndex(({dateString}) => dateString === todayDateString),
    [days, todayDateString],
  );

  const bandCells = useMemo(
    () =>
      showDays
        ? buildWeekBandCells(
            periods,
            days,
            dayWidth,
            todayIndex,
            weekPrefix,
            translator,
          )
        : buildMonthBandCells(monthBands, dayWidth, todayIndex, translator),
    [
      dayWidth,
      days,
      monthBands,
      periods,
      showDays,
      todayIndex,
      translator,
      weekPrefix,
    ],
  );

  const rangeCells = useMemo(
    () =>
      showDays
        ? []
        : buildWeekRangeCells(periods, days, dayWidth, todayIndex, weekPrefix),
    [dayWidth, days, periods, showDays, todayIndex, weekPrefix],
  );

  return (
    <View style={{width: contentWidth}}>
      <GanttScaleSpanRow cells={bandCells} variant="band" />
      {showDays ? (
        <GanttScaleDayRow
          days={days}
          dayWidth={dayWidth}
          todayDateString={todayDateString}
          translator={translator}
        />
      ) : (
        <GanttScaleSpanRow cells={rangeCells} variant="detail" />
      )}
    </View>
  );
};

export default memo(GanttScaleHeader);
