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

import React, {Ref} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {checkNullString} from '../../../utils';
import {useThemeColor} from '../../../theme';
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
  onChangeTxt: (_v?: string) => void;
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
  readonly = false,
  onClearPress,
  onChangeTxt,
  onSelection,
  onEndFocus,
  onScanPress,
  scanIconColor,
  onSearchPress,
  disableSearchPress = false,
  selected = false,
  isScannableInput,
}: SearchBarProps) => {
  const Colors = useThemeColor();

  if (readonly) {
    return (
      <FormInput style={style} title={title} defaultValue={valueTxt} readOnly />
    );
  }

  return (
    <View style={style}>
      {!checkNullString(title) && <Text style={styles.title}>{title}</Text>}
      <IconInput
        inputRef={inputRef}
        style={styles.content}
        value={valueTxt}
        placeholder={placeholder}
        onChange={onChangeTxt}
        onSelection={onSelection}
        onEndFocus={onEndFocus}
        readOnly={selected}
        required={required}
        rightIconsList={[
          <Icon
            name="x-lg"
            color={Colors.secondaryColor_dark.background}
            size={14}
            touchable={true}
            visible={!checkNullString(valueTxt)}
            onPress={onClearPress}
          />,
          <Icon
            name="search"
            color={
              disableSearchPress
                ? Colors.secondaryColor.background
                : Colors.secondaryColor_dark.background
            }
            onPress={onSearchPress}
            touchable={!disableSearchPress}
            size={14}
          />,
          <Icon
            name="qr-code-scan"
            color={scanIconColor}
            size={14}
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

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
  },
  content: {
    width: '100%',
    marginHorizontal: 0,
  },
});

export default SearchBar;
