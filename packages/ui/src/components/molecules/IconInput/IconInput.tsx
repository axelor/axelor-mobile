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

import React, {Ref, useCallback, useMemo, useState} from 'react';
import {KeyboardTypeOptions, StyleSheet, TextInput, View} from 'react-native';
import {ThemeColors} from '../../../theme';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme';
import {Input} from '../../atoms';
import {checkNullString} from '../../../utils/strings';

interface IconInputProps {
  style?: any;
  inputRef?: Ref<TextInput>;
  value: string;
  onChange: (value: any) => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  secureTextEntry?: boolean;
  onSelection?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  onEndFocus?: () => void;
  isFocus?: boolean;
  leftIconsList?: any[];
  rightIconsList?: any[];
  isScannableInput?: boolean;
}

const IconInput = ({
  style,
  inputRef,
  value,
  onChange,
  placeholder,
  readOnly,
  required = false,
  secureTextEntry,
  onSelection,
  multiline,
  numberOfLines,
  keyboardType,
  onEndFocus,
  isFocus = false,
  leftIconsList = [],
  rightIconsList = [],
  isScannableInput,
}: IconInputProps) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const [isFocused, setIsFocused] = useState(false);

  const _required = useMemo(
    () => required && checkNullString(value),
    [required, value],
  );

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required),
    [Colors, _required],
  );

  const handleSelection = useCallback(() => {
    setIsFocused(true);
    onSelection?.();
  }, [onSelection]);

  const handleEndFocus = useCallback(() => {
    setIsFocused(false);
    onEndFocus?.();
  }, [onEndFocus]);

  return (
    <View
      testID="iconInputContainer"
      style={[styles.container, isFocused && commonStyles.inputFocused, style]}>
      {leftIconsList.map((iconComponent, index) =>
        React.cloneElement(iconComponent, {key: index}),
      )}
      <Input
        inputRef={inputRef}
        style={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        secureTextEntry={secureTextEntry}
        onSelection={handleSelection}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        onEndFocus={handleEndFocus}
        isFocus={isFocus}
        isScannableInput={isScannableInput}
      />
      {rightIconsList.map((iconComponent, index) =>
        React.cloneElement(iconComponent, {key: index}),
      )}
    </View>
  );
};

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderColor: Colors.secondaryColor.background,
      borderWidth: 1,
      borderRadius: 7,
      backgroundColor: Colors.backgroundColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 5,
      paddingRight: 8,
      marginHorizontal: 20,
      marginVertical: 6,
      minHeight: 40,
    },
    input: {
      flex: 1,
    },
  });

export default IconInput;
