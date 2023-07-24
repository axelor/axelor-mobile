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
import {StyleSheet, View} from 'react-native';
import {HtmlInput, Text} from '../../atoms';
import {useThemeColor} from '../../../theme/ThemeContext';
import {ThemeColors} from '../../../theme/themes';
import {getCommonStyles} from '../../../utils/commons-styles';

interface FormHtmlInputProps {
  title: string;
  placeholder?: string;
  defaultValue?: string;
  readonly?: boolean;
  style?: any;
  required?: boolean;
  onChange?: (any: any) => void;
}

const FormHtmlInput = ({
  title,
  placeholder = '',
  defaultValue = null,
  readonly = false,
  style,
  required = false,
  onChange = () => {},
}: FormHtmlInputProps) => {
  const Colors = useThemeColor();

  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const _required = useMemo(
    () => required && (value == null || value === ''),
    [required, value],
  );

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onValueChange = useCallback(
    _value => {
      setValue(_value);
      onChange(_value);
    },
    [onChange],
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
    <View style={style}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          commonStyles.filter,
          styles.content,
          isFocused && commonStyles.inputFocused,
        ]}>
        <HtmlInput
          defaultInput={value}
          onChange={onValueChange}
          placeholder={placeholder}
          readonly={readonly}
          style={styles.input}
          styleToolbar={styles.htmlToolBar}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </View>
  );
};

const getStyles = (Colors: ThemeColors, _required: boolean) =>
  StyleSheet.create({
    content: {
      width: '100%',
      borderColor: _required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
    },
    htmlToolBar: {
      backgroundColor: null,
      marginLeft: -5,
    },
    input: {
      width: '100%',
    },
    title: {
      marginLeft: 10,
    },
  });

export default FormHtmlInput;
