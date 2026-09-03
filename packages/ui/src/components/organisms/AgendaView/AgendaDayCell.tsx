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
import {Pressable, StyleSheet, View} from 'react-native';
import {dayCellStyles, getTodayOutlineStyle} from '../../../utils';
import {useThemeColor} from '../../../theme';
import {Text} from '../../atoms';

interface AgendaDayCellProps {
  dateString: string;
  dayNumber: number;
  isWeekEnd: boolean;
  isOutOfMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  hasItems: boolean;
  onPress: (dateString: string) => void;
}

const DOT_SIZE = 5;

const AgendaDayCell = ({
  dateString,
  dayNumber,
  isWeekEnd,
  isOutOfMonth,
  isSelected,
  isToday,
  hasItems,
  onPress,
}: AgendaDayCellProps) => {
  const Colors = useThemeColor();

  const handlePress = useCallback(
    () => onPress(dateString),
    [dateString, onPress],
  );

  const selectionStyle = useMemo(
    () => ({
      backgroundColor: Colors.primaryColor.background_light,
      borderColor: Colors.primaryColor.background,
    }),
    [Colors.primaryColor],
  );

  const todayStyle = useMemo(
    () => getTodayOutlineStyle(Colors.secondaryColor.background),
    [Colors.secondaryColor.background],
  );

  const dotStyle = useMemo(
    () => ({
      backgroundColor: isOutOfMonth
        ? Colors.secondaryColor.background
        : Colors.primaryColor.background,
    }),
    [
      Colors.primaryColor.background,
      Colors.secondaryColor.background,
      isOutOfMonth,
    ],
  );

  const textColor = useMemo(() => {
    if (isSelected) return Colors.primaryColor.background;
    if (isOutOfMonth) return Colors.placeholderTextColor;
    if (isWeekEnd) return Colors.secondaryColor_dark.background;

    return Colors.text;
  }, [Colors, isOutOfMonth, isSelected, isWeekEnd]);

  return (
    <Pressable
      style={dayCellStyles.container}
      onPress={handlePress}
      testID={
        isOutOfMonth
          ? `agendaExtraDay-${dateString}`
          : `agendaDay-${dateString}`
      }>
      {isSelected && (
        <View
          style={[dayCellStyles.outline, selectionStyle]}
          pointerEvents="none"
          testID={`agendaDaySelected-${dateString}`}
        />
      )}
      {isToday && !isSelected && (
        <View
          style={[dayCellStyles.outline, todayStyle]}
          pointerEvents="none"
        />
      )}
      <Text
        style={dayCellStyles.text}
        textColor={textColor}
        writingType={isSelected || isToday ? 'important' : undefined}
        fontSize={12}>
        {dayNumber}
      </Text>
      {hasItems && (
        <View
          style={[styles.dot, dotStyle]}
          pointerEvents="none"
          testID={`agendaDayDot-${dateString}`}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    bottom: 6,
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});

export default memo(AgendaDayCell);
