/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {useThemeColor} from '../../../theme';
import {checkNullString, getCommonStyles} from '../../../utils';
import {HtmlInput, Text} from '../../atoms';

interface FormHtmlInputProps {
  title: string;
  placeholder?: string;
  defaultValue?: string;
  readonly?: boolean;
  hideIfNull?: boolean;
  style?: any;
  required?: boolean;
  onChange?: (_v?: string) => void;
}

const FormHtmlInput = ({
  style,
  title,
  placeholder,
  defaultValue,
  readonly = false,
  hideIfNull = false,
  required = false,
  onChange,
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
    (_value?: string) => {
      setValue(_value);
      onChange?.(_value);
    },
    [onChange],
  );

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required, isFocused),
    [Colors, _required, isFocused],
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  if (hideIfNull && readonly && checkNullString(defaultValue)) {
    return null;
  }

  return (
    <View style={[styles.container, style]} testID="formHtmlInputContainer">
      <Text style={styles.title}>{title}</Text>
      <View
        testID="formHtmlInputWrapper"
        style={[commonStyles.filter, styles.content]}>
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

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  content: {
    width: '100%',
  },
  htmlToolBar: {
    backgroundColor: undefined,
    marginLeft: -5,
  },
  input: {
    width: '100%',
    minHeight: 40,
  },
  title: {
    marginLeft: 10,
  },
});

export default FormHtmlInput;
