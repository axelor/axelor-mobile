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
import {checkNullString, getCommonStyles} from '../../../utils';
import {useThemeColor} from '../../../theme';
import {Input, VerticalRule} from '../../atoms';

interface IconInputProps {
  style?: any;
  inputRef?: Ref<TextInput>;
  value?: string;
  onChange?: (_v?: string) => void;
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

  const [isFocused, setIsFocused] = useState(false);

  const _required = useMemo(
    () => required && checkNullString(value),
    [required, value],
  );

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required, isFocused),
    [Colors, _required, isFocused],
  );

  const handleSelection = useCallback(() => {
    setIsFocused(true);
    onSelection?.();
  }, [onSelection]);

  const handleEndFocus = useCallback(() => {
    setIsFocused(false);
    onEndFocus?.();
  }, [onEndFocus]);

  const visibleRightIcons = useMemo(
    () =>
      rightIconsList.filter(
        iconComponent => iconComponent?.props?.visible !== false,
      ),
    [rightIconsList],
  );

  return (
    <View
      testID="iconInputContainer"
      style={[commonStyles.filter, commonStyles.filterAlign, style]}>
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
      {visibleRightIcons.map((iconComponent, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <VerticalRule
              style={styles.divider}
              color={Colors.secondaryColor.background_light}
            />
          )}
          {React.cloneElement(iconComponent, {key: index})}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  divider: {
    height: '60%',
    marginHorizontal: 10,
  },
});

export default IconInput;
