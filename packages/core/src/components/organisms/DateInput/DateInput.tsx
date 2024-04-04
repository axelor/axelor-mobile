/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import useTranslator from '../../../i18n/hooks/use-translator';
import {
  Card,
  getCommonStyles,
  Icon,
  RightIconButton,
  Text,
  useClickOutside,
  useThemeColor,
  OUTSIDE_INDICATOR,
  ThemeColors,
  checkNullString,
} from '@axelor/aos-mobile-ui';
import {DatePicker} from '../../molecules';
import DateInputUtils from './date-input.helper';

interface DateInputProps {
  title?: string;
  defaultDate?: Date;
  mode?: 'date' | 'datetime' | 'time';
  nullable?: boolean;
  onDateChange: (date: Date) => void;
  style?: any;
  readonly?: boolean;
  required?: boolean;
}

const ACTION_ICON_SIZE = 30;

const DateInput = ({
  title,
  defaultDate,
  mode = 'datetime',
  nullable = false,
  onDateChange,
  style,
  readonly = false,
  required = false,
}: DateInputProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const currentDate = useMemo(() => new Date(), []);

  const [pickerWidth, setPickerWidth] = useState<number>();
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const _required = useMemo(
    () => required && selectedDate == null,
    [required, selectedDate],
  );

  useEffect(() => {
    setSelectedDate(defaultDate);
  }, [defaultDate]);

  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({
    wrapperRef,
  });

  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && pickerIsOpen) {
      setPickerIsOpen(false);
    }
  }, [clickOutside, pickerIsOpen]);

  const togglePicker = () => {
    if (!readonly) {
      setPickerIsOpen(current => !current);
    }
  };

  const onCheckDate = useCallback(() => {
    if (!selectedDate) {
      setSelectedDate(currentDate);
      onDateChange(currentDate);
      setPickerIsOpen(false);
    } else {
      onDateChange(selectedDate);
      setPickerIsOpen(false);
    }
  }, [onDateChange, selectedDate, currentDate]);

  const onClearDate = useCallback(() => {
    setSelectedDate(null);
    setPickerIsOpen(false);
  }, []);

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required),
    [Colors, _required],
  );
  const styles = useMemo(
    () => getStyles(Colors, pickerIsOpen, _required),
    [Colors, pickerIsOpen, _required],
  );

  return (
    <View
      ref={wrapperRef}
      style={[
        styles.container,
        Platform.OS === 'ios' ? styles.containerZIndex : null,
        style,
      ]}>
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      <RightIconButton
        onPress={togglePicker}
        icon={
          !readonly && (
            <Icon
              name={DateInputUtils.getIconName(mode)}
              color={Colors.secondaryColor_dark.background}
            />
          )
        }
        title={
          selectedDate
            ? DateInputUtils.formatDate(mode, selectedDate, I18n)
            : DateInputUtils.getDateInputPlaceholder(mode)
        }
        styleText={styles.styleTextButton}
        style={[
          commonStyles.filter,
          commonStyles.filterSize,
          commonStyles.filterAlign,
          styles.rightIconButton,
          pickerIsOpen && commonStyles.inputFocused,
        ]}
      />
      <View style={Platform.OS === 'ios' ? styles.dropdownContainer : null}>
        {pickerIsOpen ? (
          <Card style={styles.selectionContainer}>
            <View
              onLayout={event => {
                const {width} = event.nativeEvent.layout;
                setPickerWidth(width);
              }}
              style={styles.datePickerContainer}>
              <DatePicker
                defaultDate={selectedDate || currentDate}
                onDateChange={setSelectedDate}
                mode={mode}
                pickerWidth={pickerWidth}
              />
            </View>
            <View style={styles.actionContainer}>
              <Icon
                name="check-circle"
                color={Colors.primaryColor.background}
                size={ACTION_ICON_SIZE}
                touchable={true}
                FontAwesome5={false}
                onPress={onCheckDate}
                style={styles.actionButton}
              />
              {nullable && (
                <Icon
                  name="times-circle"
                  color={Colors.primaryColor.background}
                  size={ACTION_ICON_SIZE}
                  touchable={true}
                  FontAwesome5={false}
                  onPress={onClearDate}
                  style={styles.actionButton}
                />
              )}
            </View>
          </Card>
        ) : null}
      </View>
    </View>
  );
};

const getStyles = (
  Colors: ThemeColors,
  pickerIsOpen: boolean,
  required: boolean,
) =>
  StyleSheet.create({
    actionButton: {
      marginLeft: 10,
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    container: {
      width: '100%',
    },
    containerZIndex: {
      zIndex: pickerIsOpen ? 100 : 0,
    },
    datePickerContainer: {
      flex: 1,
    },
    rightIconButton: {
      borderColor: required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
      marginLeft: 0,
      width: '100%',
    },
    dropdownContainer: {
      zIndex: pickerIsOpen ? 105 : 0,
    },
    selectionContainer: {
      paddingHorizontal: 5,
      paddingVertical: 10,
      paddingRight: 10,
      position: 'absolute',
      height: 240,
      width: '100%',
      zIndex: 110,
    },
    styleTextButton: {
      left: '-20%',
    },
    title: {
      marginLeft: 10,
    },
  });

export default DateInput;
