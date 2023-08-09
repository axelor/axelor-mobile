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

import React, {useMemo, useState} from 'react';
import {KeyboardTypeOptions, StyleSheet, View} from 'react-native';
import {useThemeColor, ThemeColors} from '../../../theme';
import {Text} from '../../atoms';
import {getCommonStyles} from '../../../utils/commons-styles';
import Increment from '../Increment/Increment';

interface FormIncrementInputProps {
  style?: any;
  title: string;
  readOnly?: boolean;
  required?: boolean;
  defaultValue?: string;
  onChange: (value: any) => void;
  decimalSpacer?: string;
  thousandSpacer?: string;
  defaultFormatting?: boolean;
  stepSize?: number;
  minValue?: number;
  maxValue?: number;
  isBigButton?: boolean;
  keyboardType?: KeyboardTypeOptions;
  scale?: number;
}

const FormIncrementInput = ({
  style,
  title,
  readOnly = false,
  required = false,
  defaultValue = null,
  decimalSpacer,
  thousandSpacer,
  onChange,
  defaultFormatting = true,
  stepSize = 1,
  minValue = 0,
  maxValue = null,
  isBigButton = false,
  keyboardType,
  scale,
}: FormIncrementInputProps) => {
  const Colors = useThemeColor();

  const [isFocused, setIsFocused] = useState(false);

  const _required = useMemo(
    () => required && defaultValue == null,
    [required, defaultValue],
  );

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required),
    [Colors, _required],
  );
  const styles = useMemo(
    () => getStyles(Colors, _required),
    [Colors, _required],
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          commonStyles.filter,
          commonStyles.filterSize,
          commonStyles.filterAlign,
          styles.content,
          isFocused && commonStyles.inputFocused,
        ]}>
        <Increment
          value={defaultValue}
          onValueChange={onChange}
          style={styles.increment}
          inputStyle={styles.containerInput}
          decimalSpacer={decimalSpacer}
          thousandSpacer={thousandSpacer}
          onFocus={handleFocus}
          onBlur={handleBlur}
          readonly={readOnly}
          defaultFormatting={defaultFormatting}
          stepSize={stepSize}
          minValue={minValue}
          maxValue={maxValue}
          isBigButton={isBigButton}
          keyboardType={keyboardType}
          scale={scale}
        />
      </View>
    </View>
  );
};

const getStyles = (Colors: ThemeColors, required: boolean) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    title: {
      marginLeft: 10,
    },
    increment: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    content: {
      width: '100%',
      borderColor: required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
      marginHorizontal: 0,
    },
    containerInput: {
      fontSize: 15,
    },
  });

export default FormIncrementInput;
