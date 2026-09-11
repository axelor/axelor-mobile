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
import {Text} from '../../../atoms';
import {GanttCell, GanttDay} from '../types';
import {GANTT_CELL_LABEL_MIN_WIDTH, ganttStyles} from '../gantt-view.styles';

interface GanttCellStripProps {
  days: GanttDay[];
  cells: Record<string, GanttCell>;
  dayWidth: number;
  variant?: 'strip' | 'full';
}

const GanttCellStrip = ({
  days,
  cells,
  dayWidth,
  variant = 'strip',
}: GanttCellStripProps) => {
  const showLabels = dayWidth >= GANTT_CELL_LABEL_MIN_WIDTH;

  const visibleCells = useMemo(
    () =>
      (days ?? [])
        .map((day, index) => ({
          dateString: day.dateString,
          cell: cells?.[day.dateString],
          left: index * dayWidth,
        }))
        .filter(({cell}) => cell != null),
    [cells, dayWidth, days],
  );

  if (visibleCells.length === 0) {
    return null;
  }

  return (
    <View
      style={variant === 'full' ? styles.full : ganttStyles.cellStrip}
      pointerEvents="none">
      {visibleCells.map(({dateString, cell, left}) => (
        <View
          key={dateString}
          style={[
            ganttStyles.cell,
            {
              left,
              width: dayWidth,
              backgroundColor: cell!.color?.background_light,
            },
          ]}>
          {showLabels && cell!.label != null && (
            <Text
              numberOfLines={1}
              fontSize={8}
              textColor={cell!.color?.background}
              writingType="important">
              {cell!.label}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  full: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default memo(GanttCellStrip);
