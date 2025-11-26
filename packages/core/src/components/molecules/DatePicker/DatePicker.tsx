/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {default as NativeDatePicker} from 'react-native-date-picker';
import {useThemeColor} from '@axelor/aos-mobile-ui';

interface DatePickerProps {
  defaultDate: Date;
  onDateChange: (date: Date) => void;
  mode?: 'date' | 'datetime' | 'time';
  pickerWidth?: number;
}

const DatePicker = ({
  defaultDate,
  mode,
  onDateChange,
  pickerWidth = null,
}: DatePickerProps) => {
  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(pickerWidth), [pickerWidth]);

  return (
    <NativeDatePicker
      date={defaultDate}
      onDateChange={onDateChange}
      mode={mode}
      dividerColor={Colors.primaryColor.background}
      textColor={Colors.text}
      style={styles.container}
    />
  );
};

const getStyles = (pickerWidth: number) =>
  StyleSheet.create({
    container: {
      width: pickerWidth,
    },
  });

export default DatePicker;
