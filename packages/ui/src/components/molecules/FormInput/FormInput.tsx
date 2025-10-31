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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {KeyboardTypeOptions, StyleSheet, View} from 'react-native';
import {Input, Text} from '../../atoms';
import {ThemeColors, useThemeColor} from '../../../theme';
import {getCommonStyles, checkNullString} from '../../../utils';

interface FormInputProps {
  title: string;
  defaultValue?: string;
  readOnly?: boolean;
  style?: any;
  required?: boolean;
  onChange?: (any: any) => void;
  onSelection?: () => void;
  onEndFocus?: () => void;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  adjustHeightWithLines?: boolean;
}

const FormInput = ({
  title,
  defaultValue = null,
  readOnly,
  style,
  required = false,
  onChange = () => {},
  onSelection = () => {},
  onEndFocus = () => {},
  keyboardType,
  multiline = false,
  adjustHeightWithLines = false,
}: FormInputProps) => {
  const Colors = useThemeColor();

  const [textHeight, setTextHeight] = useState(40);
  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const _required = useMemo(
    () => required && (value == null || value === ''),
    [required, value],
  );

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

  const handleSelection = () => {
    setIsFocused(true);
    onSelection();
  };

  const handleEndFocus = () => {
    setIsFocused(false);
    onEndFocus();
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <View style={[styles.container, style]} testID="formInputContainer">
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      <View
        testID="formInputInnerContainer"
        style={[
          commonStyles.filter,
          commonStyles.filterSize,
          commonStyles.filterAlign,
          styles.content,
          isFocused && commonStyles.inputFocused,
          adjustHeightWithLines && {
            height: parseInt(textHeight.toString(), 10),
          },
        ]}>
        <Input
          style={styles.input}
          value={value}
          onChange={onValueChange}
          onSelection={handleSelection}
          onEndFocus={handleEndFocus}
          keyboardType={keyboardType}
          numberOfLines={null}
          readOnly={readOnly}
          multiline={multiline}
          onContentSizeChange={e => {
            const {height} = e.nativeEvent.contentSize;
            if (adjustHeightWithLines) {
              setTextHeight(height);
            }
          }}
        />
      </View>
    </View>
  );
};

const getStyles = (Colors: ThemeColors, _required: boolean) =>
  StyleSheet.create({
    container: {
      width: '90%',
      minHeight: 62,
    },
    content: {
      width: '100%',
      borderColor: _required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
      marginHorizontal: 0,
      minHeight: 40,
    },
    input: {
      width: '100%',
    },
    title: {
      marginLeft: 10,
    },
  });

export default FormInput;
