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
import {useThemeColor} from '../../../../theme';
import {GanttDay, GanttItem, GanttRow} from '../types';
import {ganttStyles} from '../gantt-view.styles';
import {
  buildNonWorkingFills,
  computeBarGeometry,
  sortItemsByPriority,
} from '../gantt-view.helpers';
import GanttBar from './GanttBar';

interface GanttRowLaneProps {
  row: GanttRow;
  days: GanttDay[];
  dayWidth: number;
  contentWidth: number;
  showBarTitles: boolean;
  onItemPress?: (item: GanttItem, row: GanttRow) => void;
}

const GanttRowLane = ({
  row,
  days,
  dayWidth,
  contentWidth,
  showBarTitles,
  onItemPress,
}: GanttRowLaneProps) => {
  const Colors = useThemeColor();

  const firstDateString = days[0]?.dateString;

  const fills = useMemo(
    () => buildNonWorkingFills(days, row.nonWorkingDays, dayWidth),
    [dayWidth, days, row.nonWorkingDays],
  );

  const bars = useMemo(
    () =>
      sortItemsByPriority(row.items)
        .map(item => ({
          item,
          geometry: computeBarGeometry(
            item,
            firstDateString,
            days.length,
            dayWidth,
          ),
        }))
        .filter(({geometry}) => geometry != null),
    [dayWidth, days.length, firstDateString, row.items],
  );

  return (
    <View
      style={[
        ganttStyles.lane,
        {
          width: contentWidth,
          borderBottomColor: Colors.secondaryColor_dark.background_light,
        },
      ]}>
      {fills.map(({key, left, width, color}) => (
        <View
          key={key}
          style={[
            ganttStyles.fill,
            {left, width, backgroundColor: color.background_light},
          ]}
          pointerEvents="none"
        />
      ))}
      {bars.map(({item, geometry}) => (
        <GanttBar
          key={item.id}
          item={item}
          row={row}
          geometry={geometry!}
          showTitle={showBarTitles}
          onPress={onItemPress}
        />
      ))}
    </View>
  );
};

export default memo(GanttRowLane);
