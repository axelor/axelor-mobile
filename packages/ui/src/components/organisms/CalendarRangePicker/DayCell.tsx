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
import {Platform, Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {Color, useThemeColor} from '../../../theme';
import {Text} from '../../atoms';
import {DAY_ROW_HEIGHT} from './calendar-range.helpers';

interface DayCellProps {
  dateString: string;
  dayNumber: number;
  isWeekEnd: boolean;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  hasEvents: boolean;
  morningColor?: Color;
  afternoonColor?: Color;
  disabledColor: Color;
  onPress: (dateString: string) => void;
}

const DayCell = ({
  dateString,
  dayNumber,
  isWeekEnd,
  isSelected,
  isToday,
  isDisabled,
  hasEvents,
  morningColor,
  afternoonColor,
  disabledColor,
  onPress,
}: DayCellProps) => {
  const Colors = useThemeColor();

  const handlePress = useCallback(
    () => onPress(dateString),
    [dateString, onPress],
  );

  const {baseStyle, overlayStyle} = useMemo<{
    baseStyle: ViewStyle | null;
    overlayStyle: ViewStyle | null;
  }>(() => {
    if (morningColor == null && afternoonColor == null)
      return {baseStyle: null, overlayStyle: null};

    if (afternoonColor == null)
      return {
        baseStyle: {
          backgroundColor: morningColor!.background_light,
          right: '50%',
        },
        overlayStyle: null,
      };

    if (morningColor == null)
      return {
        baseStyle: {
          backgroundColor: afternoonColor.background_light,
          left: '50%',
        },
        overlayStyle: null,
      };

    return {
      baseStyle: {backgroundColor: morningColor.background_light},
      overlayStyle:
        morningColor === afternoonColor
          ? null
          : {backgroundColor: afternoonColor.background_light},
    };
  }, [afternoonColor, morningColor]);

  const selectionStyle = useMemo(
    () => ({
      backgroundColor:
        baseStyle == null
          ? Colors.primaryColor.background_light
          : 'transparent',
      borderColor: Colors.primaryColor.background,
    }),
    [Colors.primaryColor, baseStyle],
  );

  const todayStyle = useMemo(
    () => ({
      borderColor: Colors.secondaryColor.background,
      borderStyle: (Platform.OS === 'ios' ? 'solid' : 'dashed') as any,
    }),
    [Colors],
  );

  const disabledStyle = useMemo(
    () => ({
      backgroundColor: disabledColor.background_light,
      borderColor: disabledColor.background,
    }),
    [disabledColor],
  );

  const textColor = useMemo(() => {
    if (isDisabled) return disabledColor.background;
    if (isWeekEnd) return Colors.secondaryColor_dark.background;

    const markColor = morningColor ?? afternoonColor;

    if (markColor != null) return markColor.background;
    if (isSelected) return Colors.primaryColor.background;

    return Colors.text;
  }, [
    morningColor,
    afternoonColor,
    isSelected,
    Colors,
    isDisabled,
    disabledColor.background,
    isWeekEnd,
  ]);

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      disabled={isDisabled && !hasEvents}
      testID={`calendarDay-${dateString}`}>
      {baseStyle != null && (
        <View style={styles.markContainer} pointerEvents="none">
          <View style={[styles.markBase, baseStyle]} />
          {overlayStyle != null && (
            <View style={[styles.markOverlay, overlayStyle]} />
          )}
        </View>
      )}
      {isDisabled && (
        <View style={styles.badgeContainer} pointerEvents="none">
          <View style={[styles.badge, disabledStyle]} />
        </View>
      )}
      {isSelected && (
        <View
          style={[styles.outline, selectionStyle]}
          pointerEvents="none"
          testID={`calendarDaySelected-${dateString}`}
        />
      )}
      {isToday && !isSelected && (
        <View style={[styles.outline, todayStyle]} pointerEvents="none" />
      )}
      <Text
        style={styles.text}
        textColor={textColor}
        writingType={isSelected || isToday ? 'important' : undefined}
        fontSize={12}>
        {dayNumber}
      </Text>
    </Pressable>
  );
};

const CELL_INSET = 3;
const BADGE_SIZE = DAY_ROW_HEIGHT - 16;
const CELL_RADIUS = 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: DAY_ROW_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    borderWidth: 1,
  },
  markContainer: {
    position: 'absolute',
    top: CELL_INSET,
    bottom: CELL_INSET,
    left: CELL_INSET,
    right: CELL_INSET,
    borderRadius: CELL_RADIUS,
    overflow: 'hidden',
  },
  markBase: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  markOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    right: 0,
  },
  outline: {
    position: 'absolute',
    top: CELL_INSET,
    bottom: CELL_INSET,
    left: CELL_INSET,
    right: CELL_INSET,
    borderRadius: CELL_RADIUS,
    borderWidth: 1,
  },
  text: {
    textAlign: 'center',
  },
});

export default memo(DayCell);
