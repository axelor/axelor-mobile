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
import {getWeekDayKeys, WEEK_DAYS_ROW_HEIGHT} from '../../../utils';
import {useThemeColor} from '../../../theme';
import {Text} from '../../atoms';

interface CalendarWeekDaysProps {
  firstDayOfWeek: number;
  translator: (key: string) => string;
}

const CalendarWeekDays = ({
  firstDayOfWeek,
  translator,
}: CalendarWeekDaysProps) => {
  const Colors = useThemeColor();

  const labels = useMemo(
    () => getWeekDayKeys(firstDayOfWeek).map(key => translator(key)),
    [firstDayOfWeek, translator],
  );

  return (
    <View style={styles.row}>
      {labels.map((label, index) => (
        <Text
          key={index}
          style={styles.label}
          textColor={Colors.placeholderTextColor}
          writingType="details">
          {label}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    height: WEEK_DAYS_ROW_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  label: {
    flex: 1,
    textAlign: 'center',
  },
});

export default memo(CalendarWeekDays);
