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

import React, {Ref, useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useThemeColor, ThemeColors} from '../../../theme';
import {getCommonStyles} from '../../../utils';
import {Icon, Input} from '../../atoms';

const ChevronButton = ({
  isIncreasing,
  inputValue,
  setInputValue,
  stepSize,
  readonly,
  maxValue,
  minValue,
  onValueChange,
}) => {
  const Colors = useThemeColor();

  const canIncreaseValue = useMemo(
    () => !readonly && (maxValue == null || inputValue < maxValue),
    [inputValue, maxValue, readonly],
  );

  const canDecreaseValue = useMemo(
    () => !readonly && (minValue == null || inputValue > minValue),
    [inputValue, minValue, readonly],
  );

  const changeValue = () => {
    setInputValue(currentValue => {
      let newValue = currentValue + (isIncreasing ? stepSize : -stepSize);

      if (minValue != null && newValue < minValue) {
        newValue = minValue;
      } else if (maxValue != null && newValue > maxValue) {
        newValue = maxValue;
      }

      onValueChange(newValue, INPUT_CHANGE_TYPE.button);
      return newValue;
    });
  };

  const iconName = isIncreasing ? 'chevron-up' : 'chevron-down';
  const canChangeValue = isIncreasing ? canIncreaseValue : canDecreaseValue;

  return (
    <Icon
      name={iconName}
      color={
        canChangeValue
          ? Colors.secondaryColor_dark.background
          : Colors.secondaryColor.background
      }
      touchable={canChangeValue}
      onPress={changeValue}
    />
  );
};

export const INPUT_CHANGE_TYPE = {
  button: 0,
  keyboard: 1,
  limit: 2,
};

interface NumberChevronInputProps {
  style?: any;
  inputRef?: Ref<TextInput>;
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

  const handleChange = useCallback(
    (value: string) => {
      let writtenNumber = null;
      let mode = INPUT_CHANGE_TYPE.keyboard;

      if (maxValue != null && value?.length > maxValue.toString().length) {
        writtenNumber = Number(value[value.length - 1]);
      } else {
        writtenNumber = Number(value);
      }

      if (minValue != null && writtenNumber < minValue) {
        writtenNumber = minValue;
        mode = INPUT_CHANGE_TYPE.limit;
      } else if (maxValue != null && writtenNumber > maxValue) {
        writtenNumber = maxValue;
        mode = INPUT_CHANGE_TYPE.limit;
      }

      return {newValue: writtenNumber, mode};
    },
    [maxValue, minValue],
  );

  useEffect(() => {
    if (!Number.isNaN(Number(defaultValue))) {
      const {newValue} = handleChange(defaultValue.toString());

      setInputValue(newValue);
    }
  }, [defaultValue, handleChange]);

  const handleInputChange = useCallback(
    (value: string) => {
      if (!Number.isNaN(Number(value))) {
        const {newValue, mode} = handleChange(value);

        setInputValue(newValue);
        onValueChange(newValue, mode);
      }
    },
    [handleChange, onValueChange],
  );

  const handleSelection = useCallback(() => {
    if ((inputRef as any)?.current) {
      (inputRef as any).current.setSelection(0, inputValue?.toString().length);
    }
    setIsFocused(true);
  }, [inputRef, inputValue]);

  const handleEndFocus = useCallback(() => {
    setIsFocused(false);
    onEndFocus();
  }, [onEndFocus]);

  return (
    <View
      testID="numberChevronInputContainer"
      style={[styles.container, style]}>
      <ChevronButton
        isIncreasing={true}
        inputValue={inputValue}
        maxValue={maxValue}
        minValue={minValue}
        onValueChange={onValueChange}
        readonly={readonly}
        setInputValue={setInputValue}
        stepSize={stepSize}
      />
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
          onChange={handleInputChange}
          onSelection={handleSelection}
          onEndFocus={handleEndFocus}
          readOnly={readonly}
          keyboardType="numeric"
        />
      </View>
      <ChevronButton
        isIncreasing={false}
        inputValue={inputValue}
        maxValue={maxValue}
        minValue={minValue}
        onValueChange={onValueChange}
        readonly={readonly}
        setInputValue={setInputValue}
        stepSize={stepSize}
      />
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
