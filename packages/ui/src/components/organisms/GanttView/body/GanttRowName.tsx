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

import React, {memo, useCallback} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../../theme';
import {Icon, Text} from '../../../atoms';
import {ganttStyles} from '../gantt-view.styles';
import {GanttRow} from '../types';

interface GanttRowNameProps {
  row: GanttRow;
  onPress?: (row: GanttRow) => void;
}

const GanttRowName = ({row, onPress}: GanttRowNameProps) => {
  const Colors = useThemeColor();

  const handlePress = useCallback(() => onPress?.(row), [onPress, row]);

  return (
    <Pressable
      style={[
        ganttStyles.nameRow,
        {borderBottomColor: Colors.secondaryColor_dark.background_light},
      ]}
      onPress={handlePress}
      disabled={onPress == null}
      testID={`ganttRowName-${row.key}`}>
      <View style={styles.identity}>
        <Text numberOfLines={2} fontSize={11}>
          {row.title}
        </Text>
        {row.subtitle != null && (
          <Text
            numberOfLines={1}
            writingType="details"
            fontSize={9}
            textColor={Colors.placeholderTextColor}>
            {row.subtitle}
          </Text>
        )}
      </View>
      {row.warning != null && (
        <Icon
          name="exclamation-triangle-fill"
          size={11}
          color={Colors.cautionColor.background}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  identity: {
    flex: 1,
    minWidth: 0,
  },
});

export default memo(GanttRowName);
