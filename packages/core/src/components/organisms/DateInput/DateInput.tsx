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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {
  Alert,
  Card,
  getCommonStyles,
  Icon,
  RightIconButton,
  Text,
  useOutsideClickHandler,
  useThemeColor,
  ThemeColors,
  checkNullString,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '../../../i18n';
import {DatePicker} from '../../molecules';
import DateInputUtils from './date-input.helper';

const ACTION_ICON_SIZE = 30;

interface DateInputSelectionProps {
  mode: 'date' | 'datetime' | 'time';
  nullable: boolean;
  popup: boolean;
  currentDate: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  onDateChange: (date: Date) => void;
  setPickerIsOpen: (pickerIsOpen: boolean) => void;
}

const DateInputSelection = ({
  mode,
  nullable,
  popup,
  currentDate,
  selectedDate,
  setSelectedDate,
  onDateChange,
  setPickerIsOpen,
}: DateInputSelectionProps) => {
  const Colors = useThemeColor();

  const [pickerWidth, setPickerWidth] = useState<number>();

  const onCheckDate = useCallback(() => {
    if (!selectedDate) {
      setSelectedDate(currentDate);
      onDateChange(currentDate);
      setPickerIsOpen(false);
    } else {
      onDateChange(selectedDate);
      setPickerIsOpen(false);
    }
  }, [
    currentDate,
    onDateChange,
    selectedDate,
    setPickerIsOpen,
    setSelectedDate,
  ]);

  const onClearDate = useCallback(() => {
    setSelectedDate(null);
    onDateChange(null);
    setPickerIsOpen(false);
  }, [onDateChange, setPickerIsOpen, setSelectedDate]);

  return (
    <View
      onLayout={event => {
        const {width} = event.nativeEvent.layout;
        setPickerWidth(width);
      }}
      style={popup ? selectionstyles.datePickerContainerPopup : null}>
      <DatePicker
        defaultDate={selectedDate || currentDate}
        onDateChange={setSelectedDate}
        mode={mode}
        pickerWidth={popup ? Dimensions.get('window').width * 0.8 : pickerWidth}
      />
      <View style={selectionstyles.actionContainer}>
        <Icon
          name="check-circle-fill"
          color={Colors.primaryColor.background}
          size={ACTION_ICON_SIZE}
          touchable={true}
          onPress={onCheckDate}
          style={selectionstyles.actionButton}
        />
        {nullable && (
          <Icon
            name="x-circle-fill"
            color={Colors.primaryColor.background}
            size={ACTION_ICON_SIZE}
            touchable={true}
            onPress={onClearDate}
            style={selectionstyles.actionButton}
          />
        )}
      </View>
    </View>
  );
};

const selectionstyles = StyleSheet.create({
  actionButton: {
    marginLeft: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  datePickerContainerPopup: {
    marginTop: 10,
  },
});

interface DateInputProps {
  title?: string;
  defaultDate?: Date;
  mode?: 'date' | 'datetime' | 'time';
  nullable?: boolean;
  popup?: boolean;
  onDateChange: (date: Date) => void;
  style?: any;
  readonly?: boolean;
  required?: boolean;
}

const DateInput = ({
  title,
  defaultDate,
  mode = 'datetime',
  nullable = false,
  popup = false,
  onDateChange,
  style,
  readonly = false,
  required = false,
}: DateInputProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const currentDate = useMemo(() => new Date(), []);

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
  const dateWrapperRef = useRef(null);
  useOutsideClickHandler({
    wrapperRef: [wrapperRef, dateWrapperRef],
    handleOutsideClick: () => {
      setSelectedDate(defaultDate);
      setPickerIsOpen(false);
    },
    activationCondition: pickerIsOpen,
  });

  const togglePicker = () => {
    if (!readonly) {
      setPickerIsOpen(current => !current);
    }
  };

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
        style={[
          commonStyles.filter,
          commonStyles.filterSize,
          commonStyles.filterAlign,
          styles.rightIconButton,
          pickerIsOpen && commonStyles.inputFocused,
        ]}
      />
      <View style={Platform.OS === 'ios' ? styles.dropdownContainer : null}>
        {popup ? (
          <Alert
            visible={pickerIsOpen}
            cancelButtonConfig={{
              showInHeader: true,
              onPress: () => setPickerIsOpen(false),
            }}>
            <DateInputSelection
              mode={mode}
              nullable={nullable}
              popup={popup}
              currentDate={currentDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onDateChange={onDateChange}
              setPickerIsOpen={setPickerIsOpen}
            />
          </Alert>
        ) : (
          pickerIsOpen && (
            <Card wrapperRef={dateWrapperRef} style={styles.selectionContainer}>
              <DateInputSelection
                mode={mode}
                nullable={nullable}
                popup={popup}
                currentDate={currentDate}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                onDateChange={onDateChange}
                setPickerIsOpen={setPickerIsOpen}
              />
            </Card>
          )
        )}
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
    container: {
      width: '100%',
    },
    containerZIndex: {
      zIndex: pickerIsOpen ? 100 : 0,
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
    title: {
      marginLeft: 10,
    },
  });

export default DateInput;
