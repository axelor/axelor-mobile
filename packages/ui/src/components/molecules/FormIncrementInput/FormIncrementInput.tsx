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
import {StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Text} from '../../atoms';
import {getCommonStyles} from '../../../utils/commons-styles';
import Increment from '../Increment/Increment';

interface FormIncrementInputProps {
  style?: any;
  title: string;
  readOnly?: boolean;
  defaultValue?: string;
  onChange: (value: any) => void;
  decimalSpacer?: string;
  thousandSpacer?: string;
  defaultFormatting?: boolean;
  stepSize?: number;
  minValue?: number;
  maxValue?: number;
  isBigButton?: boolean;
}

const FormIncrementInput = ({
  style,
  title,
  readOnly = false,
  defaultValue = null,
  decimalSpacer,
  thousandSpacer,
  onChange,
  defaultFormatting = true,
  stepSize = 1,
  minValue = 0,
  maxValue = null,
  isBigButton = false,
}: FormIncrementInputProps) => {
  const Colors = useThemeColor();

  const [isFocused, setIsFocused] = useState(false);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={style}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          commonStyles.filter,
          commonStyles.filterAlign,
          commonStyles.filterSize,
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
        />
      </View>
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    title: {
      marginLeft: 28,
    },
    increment: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    content: {
      borderColor: Colors.secondaryColor.background,
      borderWidth: 1,
      paddingHorizontal: 5,
    },
    containerInput: {
      fontSize: 15,
    },
  });

export default FormIncrementInput;
