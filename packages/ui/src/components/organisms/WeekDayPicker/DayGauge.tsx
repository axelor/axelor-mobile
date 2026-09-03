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
import {Color, useThemeColor} from '../../../theme';
import {addOpacityToHex} from '../../../utils';
import {Text} from '../../atoms';
import {
  DAY_LABEL_HEIGHT,
  GAUGE_SIZE,
  WEEK_ROW_HEIGHT,
} from './week-day.helpers';

const DOT_SIZE = 6;

interface DayGaugeProps {
  dateString: string;
  dayNumber: number;
  dayLabel: string;
  ratio?: number;
  isFilled: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isOutOfPeriod: boolean;
  isWeekEnd: boolean;
  isToday: boolean;
  color: Color;
  onPress: (dateString: string) => void;
}

const getDiscSize = (ratio: number | undefined, isFilled: boolean): number => {
  if (ratio == null) return isFilled ? GAUGE_SIZE : 0;
  if (ratio <= 0) return 0;
  if (ratio >= 1) return GAUGE_SIZE;

  return ratio * GAUGE_SIZE;
};

const DayGauge = ({
  dateString,
  dayNumber,
  dayLabel,
  ratio,
  isFilled,
  isSelected,
  isDisabled,
  isOutOfPeriod,
  isWeekEnd,
  isToday,
  color,
  onPress,
}: DayGaugeProps) => {
  const Colors = useThemeColor();

  const handlePress = useCallback(
    () => onPress(dateString),
    [dateString, onPress],
  );

  const containerStyle = useMemo(
    () =>
      isSelected
        ? {backgroundColor: Colors.secondaryColor.background_light}
        : null,
    [Colors.secondaryColor.background_light, isSelected],
  );

  const ringStyle = useMemo(
    () => ({borderColor: color.background}),
    [color.background],
  );

  const discStyle = useMemo(() => {
    const size = getDiscSize(ratio, isFilled);

    if (size === 0) return null;

    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: addOpacityToHex(color.background, 0.2),
    };
  }, [color, isFilled, ratio]);

  const dotStyle = useMemo(
    () => ({
      backgroundColor: isOutOfPeriod
        ? Colors.secondaryColor.background
        : color.background,
    }),
    [Colors.secondaryColor.background, color.background, isOutOfPeriod],
  );

  const textColor = useMemo(() => {
    if (isOutOfPeriod) return Colors.placeholderTextColor;
    if (isToday) return Colors.primaryColor.background;
    if (isWeekEnd || isDisabled) return Colors.secondaryColor_dark.background;

    return Colors.text;
  }, [Colors, isDisabled, isOutOfPeriod, isToday, isWeekEnd]);

  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={handlePress}
      disabled={isOutOfPeriod}
      testID={`weekDay-${dateString}`}>
      <Text
        style={styles.label}
        textColor={textColor}
        writingType={isToday ? 'important' : undefined}
        fontSize={12}
        numberOfLines={1}>
        {`${dayLabel} ${dayNumber}`}
      </Text>
      <View style={styles.gauge}>
        {isDisabled || isOutOfPeriod ? (
          <View
            style={[styles.dot, dotStyle]}
            testID={`weekDayDot-${dateString}`}
          />
        ) : (
          <View style={[styles.ring, ringStyle]}>
            {discStyle != null && (
              <View style={discStyle} testID={`weekDayFill-${dateString}`} />
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: WEEK_ROW_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    gap: 6,
  },
  label: {
    height: DAY_LABEL_HEIGHT,
    lineHeight: DAY_LABEL_HEIGHT,
    textAlign: 'center',
  },
  gauge: {
    width: GAUGE_SIZE,
    height: GAUGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: GAUGE_SIZE,
    height: GAUGE_SIZE,
    borderRadius: GAUGE_SIZE / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});

export default memo(DayGauge);
