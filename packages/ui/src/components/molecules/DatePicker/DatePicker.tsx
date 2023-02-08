import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {default as NativeDatePicker} from 'react-native-date-picker';
import {useThemeColor} from '../../../theme/ThemeContext';

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
      textColor={Colors.text}
      fadeToColor={Colors.backgroundColor}
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
