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
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../../theme';
import {VerticalRule} from '../../../atoms';
import {GANTT_GRID_LINE_WIDTH} from '../gantt-view.styles';
import {GanttDay} from '../types';

interface GanttGridLinesProps {
  days: GanttDay[];
  dayWidth: number;
  showDayLines: boolean;
}

const GanttGridLines = ({
  days,
  dayWidth,
  showDayLines,
}: GanttGridLinesProps) => {
  const Colors = useThemeColor();

  const lines = useMemo(
    () =>
      days
        .map((day, index) => ({day, index}))
        .filter(
          ({day, index}) => index > 0 && (day.isFirstDayOfWeek || showDayLines),
        )
        .map(({day, index}) => ({
          key: day.dateString,
          left: index * dayWidth,
          color: Colors.secondaryColor.background_light,
        })),
    [Colors, dayWidth, days, showDayLines],
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {lines.map(({key, left, color}) => (
        <VerticalRule
          key={key}
          width={GANTT_GRID_LINE_WIDTH}
          color={color}
          style={[styles.line, {left}]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
});

export default memo(GanttGridLines);
