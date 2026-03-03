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

import React, {Ref, useMemo} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {checkNullString, getCommonStyles} from '../../../utils';
import {ThemeColors, useThemeColor} from '../../../theme';
import {Icon, Text} from '../../atoms';
import {FormInput, IconInput} from '../../molecules';

interface SearchBarProps {
  title?: string;
  style?: any;
  inputRef?: Ref<TextInput>;
  valueTxt: string;
  placeholder: string;
  required?: boolean;
  readonly?: boolean;
  onClearPress: () => void;
  onChangeTxt: (any) => void;
  onSelection?: () => void;
  onEndFocus?: () => void;
  onScanPress?: () => void;
  scanIconColor?: string;
  onSearchPress?: () => void;
  disableSearchPress?: boolean;
  selected?: boolean;
  isScannableInput?: boolean;
}

const SearchBar = ({
  title,
  style,
  inputRef,
  valueTxt,
  placeholder,
  required = false,
  readonly,
  onClearPress,
  onChangeTxt,
  onSelection = () => {},
  onEndFocus = () => {},
  onScanPress = () => {},
  scanIconColor = null,
  onSearchPress = () => {},
  disableSearchPress = false,
  selected = false,
  isScannableInput,
}: SearchBarProps) => {
  const Colors = useThemeColor();

  const _required = useMemo(
    () => required && checkNullString(valueTxt),
    [required, valueTxt],
  );

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required),
    [Colors, _required],
  );

  const styles = useMemo(
    () => getStyles(Colors, _required),
    [Colors, _required],
  );

  if (readonly) {
    return (
      <FormInput
        style={[styles.container, style]}
        title={title}
        defaultValue={valueTxt}
        readOnly
      />
    );
  }

  return (
    <View style={[styles.container, style]}>
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      <IconInput
        inputRef={inputRef}
        style={[
          commonStyles.filter,
          commonStyles.filterAlign,
          commonStyles.filterSize,
          styles.content,
        ]}
        value={valueTxt}
        placeholder={placeholder}
        onChange={onChangeTxt}
        onSelection={onSelection}
        onEndFocus={onEndFocus}
        readOnly={selected}
        rightIconsList={[
          <Icon
            style={styles.action}
            name="x-lg"
            color={Colors.secondaryColor_dark.background}
            size={20}
            touchable={true}
            visible={!checkNullString(valueTxt)}
            onPress={onClearPress}
          />,
          <Icon
            style={styles.action}
            name="search"
            color={
              disableSearchPress
                ? Colors.secondaryColor.background
                : Colors.secondaryColor_dark.background
            }
            onPress={onSearchPress}
            touchable={!disableSearchPress}
            size={20}
          />,
          <Icon
            style={styles.action}
            name="qr-code-scan"
            color={scanIconColor}
            size={20}
            touchable={true}
            visible={!checkNullString(scanIconColor)}
            onPress={onScanPress}
          />,
        ]}
        isScannableInput={isScannableInput}
      />
    </View>
  );
};

const getStyles = (Colors: ThemeColors, _required: boolean) =>
  StyleSheet.create({
    action: {
      marginLeft: 12,
    },
    container: {
      width: '100%',
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
    title: {
      marginLeft: 10,
    },
  });

export default SearchBar;
