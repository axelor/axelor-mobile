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
import {GanttDay, GanttGroup} from '../types';
import {ganttStyles} from '../gantt-view.styles';
import {buildNonWorkingFills} from '../gantt-view.helpers';
import GanttCellStrip from './GanttCellStrip';

interface GanttGroupLaneProps {
  group: GanttGroup;
  days: GanttDay[];
  dayWidth: number;
  contentWidth: number;
}

const GanttGroupLane = ({
  group,
  days,
  dayWidth,
  contentWidth,
}: GanttGroupLaneProps) => {
  const Colors = useThemeColor();

  const fills = useMemo(
    () => buildNonWorkingFills(days, group.nonWorkingDays, dayWidth),
    [dayWidth, days, group.nonWorkingDays],
  );

  return (
    <View
      style={[
        ganttStyles.groupLane,
        {
          width: contentWidth,
          backgroundColor: Colors.screenBackgroundColor,
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
      {group.cells != null && (
        <GanttCellStrip
          days={days}
          cells={group.cells}
          dayWidth={dayWidth}
          variant="full"
        />
      )}
    </View>
  );
};

export default memo(GanttGroupLane);
