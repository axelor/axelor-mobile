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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {getCommonStyles} from '../../../utils/commons-styles';
import {Text} from '../../atoms';
import {SelectionContainer, MultiValuePickerButton} from '../../molecules';
import {getItemsFromList} from '../../../utils/list';
import {
  OUTSIDE_INDICATOR,
  useClickOutside,
} from '../../../hooks/use-click-outside';
import {Color, ThemeColors} from '../../../theme';
import MultiSelectValue from '../MultiSelectValue/MultiSelectValue';

interface Item {
  color: Color;
  title: string;
  key: string | number | boolean;
}

interface MultiValuePickerProps {
  style?: any;
  pickerStyle?: any;
  styleTxt?: any;
  title: string;
  onValueChange?: (any) => void;
  defaultItems?: Item[];
  listItems: Item[];
  disabled?: boolean;
  disabledValue?: string[];
  required?: boolean;
  translator?: (key: string, values?: Object) => string;
}

const MultiValuePicker = ({
  style,
  pickerStyle,
  styleTxt,
  title,
  onValueChange,
  defaultItems = [],
  listItems = [],
  disabled = false,
  disabledValue = [],
  required = false,
  translator,
}: MultiValuePickerProps) => {
  const Colors = useThemeColor();

  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({
    wrapperRef,
  });

  const [selectedItemList, setSelectedItemList] = useState(
    getItemsFromList(listItems, 'key', defaultItems),
  );

  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && pickerIsOpen) {
      setPickerIsOpen(false);
      setIsFocused(false);
    }
  }, [clickOutside, pickerIsOpen]);

  const togglePicker = () => {
    setPickerIsOpen(current => !current);
    setIsFocused(current => !current);
  };

  const handleValueChange = useCallback(
    (itemValue: Item) => {
      if (itemValue == null) {
        return null;
      }

      let newSelectedItemList = [];
      if (selectedItemList.some((item: Item) => item.key === itemValue.key)) {
        newSelectedItemList = selectedItemList.filter(
          (i: Item) => i.key !== itemValue.key,
        );
      } else {
        newSelectedItemList = [...selectedItemList, itemValue];
      }
      setSelectedItemList(newSelectedItemList);
      onValueChange(newSelectedItemList);
    },
    [onValueChange, selectedItemList],
  );

  const _required = useMemo(
    () =>
      required && (selectedItemList == null || selectedItemList?.length === 0),
    [required, selectedItemList],
  );

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required),
    [Colors, _required],
  );

  const styles = useMemo(
    () => getStyles(Colors, _required),
    [Colors, _required],
  );

  return (
    <View ref={wrapperRef} style={style}>
      {!disabled && (
        <View style={styles.titleContainer}>
          <Text style={styleTxt}>{title}</Text>
        </View>
      )}
      {disabled ? (
        <View
          style={[
            commonStyles.filter,
            commonStyles.filterSize,
            commonStyles.filterAlign,
            styles.infosCard,
            pickerStyle,
          ]}>
          <MultiSelectValue itemList={disabledValue} title={`${title} :`} />
        </View>
      ) : (
        <View>
          <MultiValuePickerButton
            onPress={togglePicker}
            listItem={selectedItemList}
            style={[
              commonStyles.filter,
              commonStyles.filterSize,
              commonStyles.filterAlign,
              styles.rightIconButton,
              isFocused && commonStyles.inputFocused,
              pickerStyle,
            ]}
            onPressItem={handleValueChange}
          />
          {pickerIsOpen ? (
            <SelectionContainer
              objectList={listItems}
              keyField="key"
              displayValue={(item: Item) => item.title}
              handleSelect={handleValueChange}
              isPicker={true}
              selectedItem={selectedItemList}
              title={title}
              translator={translator}
            />
          ) : null}
        </View>
      )}
    </View>
  );
};

const getStyles = (Colors: ThemeColors, _required: boolean) =>
  StyleSheet.create({
    titleContainer: {
      marginHorizontal: 24,
    },
    rightIconButton: {
      width: Dimensions.get('window').width * 0.9,
      borderColor: _required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
    },
    infosCard: {
      justifyContent: 'flex-start',
      width: Dimensions.get('window').width * 0.9,
    },
  });

export default MultiValuePicker;
