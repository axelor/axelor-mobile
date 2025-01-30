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

import React, {LegacyRef, useCallback, useMemo} from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInput,
  TextInputContentSizeChangeEventData,
  TextStyle,
} from 'react-native';
import {useThemeColor, useWritingType} from '../../../theme';
import {useConfig} from '../../../config/ConfigContext';
import {checkNullString} from '../../../utils';

interface InputProps {
  style?: any;
  inputRef?: LegacyRef<TextInput>;
  value: string;
  onChange: (any) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  readOnly?: boolean;
  onSelection?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  onEndFocus?: () => void;
  isFocus?: boolean;
  writingType?: 'title' | 'subtitle' | 'important' | 'details' | undefined;
  onContentSizeChange?: (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) => void;
}

const Input = ({
  style,
  inputRef,
  value,
  onChange,
  placeholder,
  secureTextEntry = false,
  readOnly = false,
  onSelection,
  multiline = false,
  numberOfLines = 1,
  keyboardType,
  onEndFocus = () => {},
  isFocus = false,
  writingType,
  onContentSizeChange,
}: InputProps) => {
  const Colors = useThemeColor();
  const {hideVirtualKeyboard} = useConfig();
  const writingStyle = useWritingType(writingType);

  const defaultStyle: TextStyle = useMemo(() => {
    return {
      ...writingStyle,
      color: Colors.text,
      fontSize: 15,
      textAlignVertical: multiline ? 'top' : 'center',
    };
  }, [Colors.text, multiline, writingStyle]);

  const onValueChange = useCallback(
    _value => {
      if (checkNullString(_value)) {
        onChange(null);
      } else {
        onChange(_value);
      }
    },
    [onChange],
  );

  return (
    <TextInput
      ref={inputRef}
      style={[defaultStyle, style]}
      value={value}
      onChangeText={onValueChange}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      editable={!readOnly}
      onFocus={onSelection}
      placeholderTextColor={Colors.placeholderTextColor}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onBlur={onEndFocus}
      showSoftInputOnFocus={hideVirtualKeyboard ? false : true}
      autoFocus={isFocus}
      onContentSizeChange={onContentSizeChange}
    />
  );
};

export default Input;
