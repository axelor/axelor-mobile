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

import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {CircleButton} from '../../molecules';
import {Text} from '../../atoms';

interface PeriodNavigationProps {
  style?: any;
  size?: number;
  label?: string;
  previousDisabled?: boolean;
  onPrevious?: () => void;
  nextDisabled?: boolean;
  onNext?: () => void;
  todayDisabled?: boolean;
  onToday?: () => void;
}

const PeriodNavigation = ({
  style,
  size = 30,
  label,
  previousDisabled = false,
  onPrevious,
  nextDisabled = false,
  onNext,
  todayDisabled = false,
  onToday,
}: PeriodNavigationProps) => {
  return (
    <View style={[styles.row, style]}>
      {label != null && (
        <Text style={styles.label} numberOfLines={1} writingType="important">
          {label}
        </Text>
      )}
      {onPrevious != null && (
        <CircleButton
          iconName="chevron-left"
          size={size}
          disabled={previousDisabled}
          onPress={onPrevious}
          testID="periodNavigationPrevious"
        />
      )}
      {onToday != null && (
        <CircleButton
          iconName="calendar-event"
          size={size}
          disabled={todayDisabled}
          onPress={onToday}
          testID="periodNavigationToday"
        />
      )}
      {onNext != null && (
        <CircleButton
          iconName="chevron-right"
          size={size}
          disabled={nextDisabled}
          onPress={onNext}
          testID="periodNavigationNext"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  label: {
    flex: 1,
    textAlign: 'center',
  },
});

export default memo(PeriodNavigation);
