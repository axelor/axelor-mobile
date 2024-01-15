/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {LegacyRef, useEffect, useMemo, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Icon, Input} from '../../atoms';
import {useThemeColor, ThemeColors} from '../../../theme';
import {getCommonStyles} from '../../../utils/commons-styles';

export const INPUT_CHANGE_TYPE = {
  button: 0,
  keyboard: 1,
  limit: 2,
};

interface NumberChevronInputProps {
  style?: any;
  inputRef?: LegacyRef<TextInput>;
  defaultValue?: number;
  stepSize?: number;
  minValue?: number;
  maxValue?: number;
  onValueChange?: (value: number, inputChangeType: number) => void;
  onEndFocus?: () => void;
  required?: boolean;
  readonly?: boolean;
}

const NumberChevronInput = ({
  style,
  inputRef,
  defaultValue = 0,
  stepSize = 1,
  minValue = 0,
  maxValue = 9,
  onValueChange = () => {},
  onEndFocus = () => {},
  required = false,
  readonly = false,
}: NumberChevronInputProps) => {
  const Colors = useThemeColor();

  const [inputValue, setInputValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => setInputValue(defaultValue), [defaultValue]);

  const _required = useMemo(
    () => required && (inputValue == null || inputValue === 0),
    [required, inputValue],
  );

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required),
    [Colors, _required],
  );

  const styles = useMemo(
    () => getStyles(Colors, _required),
    [Colors, _required],
  );

  const canIncreaseValue = useMemo(
    () => !readonly && inputValue < maxValue,
    [inputValue, maxValue, readonly],
  );

  const canDecreaseValue = useMemo(
    () => !readonly && inputValue > minValue,
    [inputValue, minValue, readonly],
  );

  const handleChange = (value: string) => {
    let writtenNumber = null;
    let mode = INPUT_CHANGE_TYPE.keyboard;

    if (value?.length > 0) {
      writtenNumber = Number(value[value.length - 1]);
    }

    if (Number.isNaN(writtenNumber)) {
      return;
    }

    if (writtenNumber < minValue || writtenNumber > maxValue) {
      const distanceToMinValue = Math.abs(writtenNumber - minValue);
      const distanceToMaxValue = Math.abs(writtenNumber - maxValue);
      writtenNumber =
        distanceToMinValue < distanceToMaxValue ? minValue : maxValue;
      mode = INPUT_CHANGE_TYPE.limit;
    }

    setInputValue(writtenNumber);
    onValueChange(writtenNumber, mode);
  };

  const handleSelection = () => {
    setIsFocused(true);
  };

  const handleEndFocus = () => {
    setIsFocused(false);
    onEndFocus();
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() =>
          setInputValue(currentValue => {
            const tempNewValue = currentValue + stepSize;
            const newValue = tempNewValue <= maxValue ? tempNewValue : maxValue;
            onValueChange(newValue, INPUT_CHANGE_TYPE.button);
            return newValue;
          })
        }
        disabled={!canIncreaseValue}>
        <Icon
          name="chevron-up"
          color={
            canIncreaseValue
              ? Colors.secondaryColor_dark.background
              : Colors.secondaryColor.background
          }
        />
      </TouchableOpacity>
      <View
        style={[
          commonStyles.filter,
          commonStyles.filterSize,
          commonStyles.filterAlign,
          styles.inputContainer,
          isFocused && commonStyles.inputFocused,
        ]}>
        <Input
          style={styles.input}
          inputRef={inputRef}
          value={inputValue?.toString()}
          onChange={handleChange}
          onSelection={handleSelection}
          onEndFocus={handleEndFocus}
          readOnly={readonly}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          setInputValue(currentValue => {
            const tempNewValue = currentValue - stepSize;
            const newValue = tempNewValue >= minValue ? tempNewValue : minValue;
            onValueChange(newValue, INPUT_CHANGE_TYPE.button);
            return newValue;
          })
        }
        disabled={!canDecreaseValue}>
        <Icon
          name="chevron-down"
          color={
            canDecreaseValue
              ? Colors.secondaryColor_dark.background
              : Colors.secondaryColor.background
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (Colors: ThemeColors, _required: boolean) =>
  StyleSheet.create({
    container: {
      width: '17%',
      flexDirection: 'column',
    },
    inputContainer: {
      width: '100%',
      marginHorizontal: 0,
      borderWidth: 1,
      borderColor: _required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
    },
    input: {
      width: '100%',
      textAlign: 'center',
    },
  });

export default NumberChevronInput;
