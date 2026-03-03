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

import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Color, ThemeColors, useThemeColor} from '../../../theme';
import {checkNullString, getCommonStyles} from '../../../utils';
import {useOutsideClickHandler} from '../../../hooks';
import {SelectionContainer, MultiValuePickerButton} from '../../molecules';
import {Text} from '../../atoms';

interface Item {
  color: Color;
  title: string;
  key: string | number | boolean;
}

interface MultiValuePickerProps {
  style?: any;
  pickerStyle?: any;
  styleTxt?: any;
  title?: string;
  onValueChange?: (itemList: Item[]) => void;
  defaultItems?: Item[];
  listItems: Item[];
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
  translator?: (key: string, values?: Object) => string;
}

const MultiValuePicker = ({
  style,
  pickerStyle,
  styleTxt,
  title,
  placeholder,
  onValueChange,
  defaultItems = [],
  listItems = [],
  readonly = false,
  required = false,
  translator,
}: MultiValuePickerProps) => {
  const Colors = useThemeColor();

  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedItemList, setSelectedItemList] = useState(defaultItems as any);

  const wrapperRef = useRef(null);
  const selectionWrapperRef = useRef(null);
  useOutsideClickHandler({
    wrapperRef: [wrapperRef, selectionWrapperRef],
    handleOutsideClick: () => {
      setPickerIsOpen(false);
      setIsFocused(false);
    },
    activationCondition: pickerIsOpen,
  });

  const togglePicker = useCallback(() => {
    setPickerIsOpen(current => !current);
    setIsFocused(current => !current);
  }, []);

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
    <View
      ref={wrapperRef}
      style={[
        styles.container,
        Platform.OS === 'ios' && pickerIsOpen ? styles.containerZIndex : null,
        style,
      ]}
      testID="multiValuePickerContainer">
      {!checkNullString(title) && (
        <Text style={[styles.title, styleTxt]}>{title}</Text>
      )}
      <MultiValuePickerButton
        onPress={togglePicker}
        listItem={selectedItemList}
        placeholder={placeholder}
        style={[
          commonStyles.filter,
          commonStyles.filterSize,
          commonStyles.filterAlign,
          isFocused && commonStyles.inputFocused,
          styles.content,
          pickerStyle,
        ]}
        onPressItem={handleValueChange}
        readonly={readonly}
      />
      {pickerIsOpen ? (
        <SelectionContainer
          wrapperRef={selectionWrapperRef}
          objectList={listItems}
          keyField="key"
          displayValue={(item: Item) => item.title}
          handleSelect={handleValueChange}
          isPicker={true}
          selectedItem={selectedItemList}
          readonly={readonly}
          title={title}
          translator={translator}
        />
      ) : null}
    </View>
  );
};

const getStyles = (Colors: ThemeColors, _required: boolean) =>
  StyleSheet.create({
    container: {
      width: '90%',
    },
    containerZIndex: {
      zIndex: 100,
    },
    title: {
      marginLeft: 10,
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
  });

export default MultiValuePicker;
