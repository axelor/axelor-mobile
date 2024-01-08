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
import {FormInput} from '../../molecules';
import {Icon} from '../../atoms';
import {useThemeColor} from '../../../theme/ThemeContext';

interface NumberChevronInputProps {
  style?: any;
  inputRef?: LegacyRef<TextInput>;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  onValueChange?: (value: number) => void;
  onEndFocus?: () => void;
  required?: boolean;
  readonly?: boolean;
}

const NumberChevronInput = ({
  style,
  inputRef,
  defaultValue = 0,
  minValue = 0,
  maxValue = 9,
  onValueChange = () => {},
  onEndFocus = () => {},
  required = false,
  readonly = false,
}: NumberChevronInputProps) => {
  const Colors = useThemeColor();

  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => setInputValue(defaultValue), [defaultValue]);

  const canIncreaseValue = useMemo(
    () => inputValue < maxValue,
    [inputValue, maxValue],
  );
  const canDecreaseValue = useMemo(
    () => inputValue > minValue,
    [inputValue, minValue],
  );

  const onInputChange = (value: string) => {
    let writtenNumber = null;

    if (value?.length > 0) {
      writtenNumber = Number(value[value.length - 1]);
    }

    if (writtenNumber >= minValue && writtenNumber <= maxValue) {
      setInputValue(writtenNumber);
      onValueChange(writtenNumber);
    } else {
      const distanceToMinValue = Math.abs(writtenNumber - minValue);
      const distanceToMaxValue = Math.abs(writtenNumber - maxValue);
      setInputValue(
        distanceToMinValue < distanceToMaxValue ? minValue : maxValue,
      );
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() =>
          setInputValue(currentValue => {
            const newValue = currentValue + 1;
            onValueChange(newValue);
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
      <FormInput
        style={[styles.input]}
        inputStyle={styles.centerText}
        inputRef={inputRef}
        defaultValue={inputValue?.toString()}
        onChange={onInputChange}
        onEndFocus={onEndFocus}
        readOnly={readonly}
        required={required}
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={() =>
          setInputValue(currentValue => {
            const newValue = currentValue - 1;
            onValueChange(newValue);
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

const styles = StyleSheet.create({
  container: {
    width: '17%',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    minHeight: null,
  },
  centerText: {
    textAlign: 'center',
  },
});

export default NumberChevronInput;
