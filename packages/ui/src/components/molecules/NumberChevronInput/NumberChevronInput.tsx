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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FormInput} from '../../molecules';
import {Icon} from '../../atoms';
import {useThemeColor} from '../../../theme/ThemeContext';

interface NumberChevronInputProps {
  style?: any;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  onValueChange?: (value: number) => void;
  required?: boolean;
}

const NumberChevronInput = ({
  style,
  defaultValue = 0,
  minValue = 0,
  maxValue = 9,
  onValueChange,
  required = false,
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
        defaultValue={inputValue.toString()}
        readOnly={true}
        required={required}
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
