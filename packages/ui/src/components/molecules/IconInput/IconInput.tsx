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
import {ThemeColors} from '../../../theme';
import {getCommonStyles} from '../../../utils/commons-styles';
import {useThemeColor} from '../../../theme/ThemeContext';
import {Input} from '../../atoms';

interface IconInputProps {
  style?: any;
  value: string;
  onChange: (value: any) => void;
  placeholder: string;
  readOnly?: boolean;
  secureTextEntry?: boolean;
  onSelection?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  onEndFocus: () => void;
  isFocus?: boolean;
  leftIconsList?: any[];
  rightIconsList?: any[];
}

const IconInput = ({
  style,
  value,
  onChange,
  placeholder,
  readOnly,
  secureTextEntry,
  onSelection = () => {},
  multiline,
  numberOfLines,
  keyboardType,
  onEndFocus = () => {},
  isFocus = false,
  leftIconsList = [],
  rightIconsList = [],
}: IconInputProps) => {
  const Colors = useThemeColor();
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const [isFocused, setIsFocused] = useState(false);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const handleSelection = () => {
    setIsFocused(true);
    onSelection();
  };

  const handleEndFocus = () => {
    setIsFocused(false);
    onEndFocus();
  };

  return (
    <View
      style={[styles.container, isFocused && commonStyles.inputFocused, style]}>
      {leftIconsList.map((iconComponent, index) =>
        React.cloneElement(iconComponent, {key: index}),
      )}
      <Input
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
      borderRadius: 13,
      backgroundColor: Colors.backgroundColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 5,
      paddingRight: 8,
      marginHorizontal: 20,
      marginVertical: 6,
    },
    input: {
      flex: 1,
    },
  });

export default IconInput;
