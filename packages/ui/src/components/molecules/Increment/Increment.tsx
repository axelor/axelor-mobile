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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {KeyboardTypeOptions, Platform, StyleSheet, View} from 'react-native';
import {
  formatNumber as _format,
  unformatNumber as _unformat,
} from '../../../utils/formatters';
import {ThemeColors, useThemeColor} from '../../../theme';
import {Input} from '../../atoms';
import IncrementButton from './IncrementButton';
import {useDigitFormat} from '../../../hooks/use-digit-format';

interface IncrementProps {
  style?: any;
  inputStyle?: any;
  value: string | undefined;
  decimalSpacer?: string;
  thousandSpacer?: string;
  onValueChange: (any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  readonly?: boolean;
  defaultFormatting?: boolean;
  stepSize?: number;
  minValue?: number;
  maxValue?: number;
  isBigButton?: boolean;
  keyboardType?: KeyboardTypeOptions;
  scale?: number;
}

const Increment = ({
  style,
  inputStyle,
  value,
  decimalSpacer,
  thousandSpacer,
  onValueChange,
  onFocus = () => {},
  onBlur = () => {},
  readonly = false,
  defaultFormatting = true,
  stepSize = 1,
  minValue = 0,
  maxValue = null,
  isBigButton = false,
  keyboardType = 'numeric',
  scale,
}: IncrementProps) => {
  const Colors = useThemeColor();
  const cutDecimalExcess = useDigitFormat();

  const [valueQty, setValueQty] = useState<string>();

  const handleDecimal = useCallback(
    (numberToFormat: string | number) => {
      if (scale == null) {
        return cutDecimalExcess(numberToFormat);
      }

      const _scale = Math.max(scale, 0);
      const _value =
        typeof numberToFormat === 'string'
          ? parseFloat(numberToFormat)
          : numberToFormat;

      return _value.toFixed(_scale);
    },
    [cutDecimalExcess, scale],
  );

  const format = useCallback(
    (number: number | string) => {
      return _format(number, decimalSpacer, thousandSpacer, handleDecimal);
    },
    [handleDecimal, decimalSpacer, thousandSpacer],
  );

  const unformat = useCallback(
    number => {
      return _unformat(number, decimalSpacer, thousandSpacer);
    },
    [decimalSpacer, thousandSpacer],
  );

  const handleValueFormatting = useCallback(
    (_value: number | string) => {
      if (defaultFormatting) {
        setValueQty(format(_value));
      } else {
        setValueQty(typeof _value === 'string' ? _value : _value.toString());
      }
    },
    [defaultFormatting, format],
  );

  const handleResult = useCallback(
    (_value: number) => {
      let resultValue;
      if (minValue != null && _value <= minValue) {
        resultValue = minValue;
      } else if (maxValue != null && _value >= maxValue) {
        resultValue = maxValue;
      } else {
        resultValue = _value;
      }

      handleValueFormatting(resultValue);
      onValueChange(resultValue);
    },
    [handleValueFormatting, maxValue, minValue, onValueChange],
  );

  useEffect(() => {
    handleValueFormatting(parseFloat(value || '0')?.toString());
  }, [handleValueFormatting, value]);

  const handlePlus = () => {
    const unformatedValue = defaultFormatting ? unformat(valueQty) : valueQty;
    const newValue: number = parseFloat(unformatedValue) + stepSize;

    handleResult(newValue);
  };

  const handleMinus = () => {
    const unformatedValue = defaultFormatting ? unformat(valueQty) : valueQty;
    const newValue: number = parseFloat(unformatedValue) - stepSize;

    handleResult(newValue);
  };

  const handleEndInput = () => {
    if (valueQty.slice(-1) === decimalSpacer) {
      valueQty.replace(/.,$/, '');
    }

    if (valueQty === '' || valueQty === null) {
      handleResult(0);
    } else {
      handleResult(parseFloat(valueQty));
    }

    onBlur();
  };

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={[styles.container_increment, style]}>
      <IncrementButton
        iconName="minus"
        onPress={handleMinus}
        readonly={readonly}
        disabled={minValue != null && parseFloat(valueQty) <= minValue}
        isBigButton={isBigButton}
      />
      <View
        style={[styles.inputLine, isBigButton ? styles.fixedInputWidth : null]}>
        <Input
          style={[styles.input, inputStyle]}
          value={valueQty}
          onChange={input => setValueQty(input)}
          keyboardType={keyboardType}
          onSelection={onFocus}
          onEndFocus={handleEndInput}
          readOnly={readonly}
        />
      </View>
      <IncrementButton
        iconName="plus"
        onPress={handlePlus}
        readonly={readonly}
        disabled={maxValue != null && parseFloat(valueQty) >= maxValue}
        isBigButton={isBigButton}
      />
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container_increment: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      fontSize: 23,
      fontWeight: 'bold',
      paddingBottom: 0,
      textAlign: 'center',
    },
    inputLine: {
      borderStyle: Platform.OS === 'ios' ? 'solid' : 'dashed',
      borderBottomColor: Colors.secondaryColor.background,
      borderBottomWidth: 0.7,
      marginBottom: 9,
    },
    fixedInputWidth: {
      width: '40%',
    },
  });

export default Increment;
