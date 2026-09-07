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
import {GanttGroup} from '../types';

interface GanttGroupHeaderProps {
  group: GanttGroup;
  collapsed: boolean;
  onPress: (groupKey: string) => void;
}

const GanttGroupHeader = ({
  group,
  collapsed,
  onPress,
}: GanttGroupHeaderProps) => {
  const Colors = useThemeColor();

  const handlePress = useCallback(
    () => onPress(group.key),
    [group.key, onPress],
  );

  return (
    <Pressable
      style={[
        ganttStyles.groupRow,
        {
          backgroundColor: Colors.screenBackgroundColor,
          borderBottomColor: Colors.secondaryColor_dark.background_light,
        },
      ]}
      onPress={handlePress}
      testID={`ganttGroupHeader-${group.key}`}>
      <Icon
        name={collapsed ? 'chevron-right' : 'chevron-down'}
        size={8}
        color={Colors.secondaryColor.background}
      />
      <Text
        style={styles.title}
        numberOfLines={1}
        fontSize={10}
        textColor={Colors.secondaryColor.background}
        writingType="important">
        {group.title}
      </Text>
      <View
        style={[
          styles.count,
          {
            backgroundColor: Colors.backgroundColor,
            borderColor: Colors.secondaryColor.background_light,
          },
        ]}>
        <Text fontSize={9} textColor={Colors.placeholderTextColor}>
          {group.rows?.length}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
  },
  count: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
  },
});

export default memo(GanttGroupHeader);
