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

import React, {memo, useCallback, useMemo} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text} from '../../../atoms';
import {GanttBarGeometry, GanttItem, GanttRow} from '../types';
import {GANTT_BAR_RADIUS, ganttStyles} from '../gantt-view.styles';

const MIN_LABEL_WIDTH = 44;

interface GanttBarProps {
  item: GanttItem;
  row: GanttRow;
  geometry: GanttBarGeometry;
  showTitle: boolean;
  onPress?: (item: GanttItem, row: GanttRow) => void;
}

const GanttBar = ({item, row, geometry, showTitle, onPress}: GanttBarProps) => {
  const {left, width, clipStart, clipEnd} = geometry;

  const handlePress = useCallback(
    () => onPress?.(item, row),
    [item, onPress, row],
  );

  const barStyle = useMemo(
    () => ({
      left,
      width,
      backgroundColor: item.color?.background_light,
      borderTopLeftRadius: clipStart ? 0 : GANTT_BAR_RADIUS,
      borderBottomLeftRadius: clipStart ? 0 : GANTT_BAR_RADIUS,
      borderTopRightRadius: clipEnd ? 0 : GANTT_BAR_RADIUS,
      borderBottomRightRadius: clipEnd ? 0 : GANTT_BAR_RADIUS,
    }),
    [clipEnd, clipStart, item.color?.background_light, left, width],
  );

  const hasLabel = showTitle && item.title != null && width > MIN_LABEL_WIDTH;

  return (
    <Pressable
      style={[ganttStyles.bar, barStyle, hasLabel && styles.labelled]}
      onPress={handlePress}
      disabled={onPress == null}
      testID={`ganttBar-${item.id}`}>
      {hasLabel && (
        <Text
          style={styles.label}
          textColor={item.color?.background}
          numberOfLines={1}
          fontSize={10}
          writingType="important">
          {item.title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  labelled: {
    paddingHorizontal: 6,
  },
  label: {
    textAlign: 'left',
  },
});

export default memo(GanttBar);
