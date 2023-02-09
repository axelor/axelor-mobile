import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
} from '@axelor/aos-mobile-ui';
import {DatePicker} from '../../molecules';
import DateInputUtils from './date-input.helper';

interface DateInputProps {
  title: string;
  defaultDate?: Date;
  mode?: 'date' | 'datetime' | 'time';
  nullable?: boolean;
  onDateChange: (date: Date) => void;
  style?: any;
  readonly?: boolean;
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
}: DateInputProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const currentDate = useMemo(() => new Date(), []);

  const [pickerWidth, setPickerWidth] = useState<number>();
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  useEffect(() => {
    if (defaultDate) {
      setSelectedDate(defaultDate);
    }
  }, [defaultDate]);

  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({
    wrapperRef,
    visible: pickerIsOpen,
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

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View ref={wrapperRef} style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
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
        ]}
      />
      <View>
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

const getStyles = Colors =>
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
    datePickerContainer: {
      flex: 1,
    },
    rightIconButton: {
      borderColor: Colors.secondaryColor.background,
      borderWidth: 1,
      marginLeft: 0,
      width: '100%',
    },
    selectionContainer: {
      paddingHorizontal: 5,
      paddingVertical: 10,
      paddingRight: 10,
      position: 'absolute',
      height: 240,
      width: '100%',
      zIndex: 999,
    },
    styleTextButton: {
      left: '-20%',
    },
    title: {
      marginLeft: 5,
    },
  });

export default DateInput;
