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

import React, {useEffect, useCallback, useMemo, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {checkNullString, getCommonStyles, getFromList} from '../../../utils';
import {useOutsideClickHandler} from '../../../hooks';
import {Icon, Text} from '../../atoms';
import {
  Alert,
  FormInput,
  SelectionContainer,
  RightIconButton,
} from '../../molecules';

const ITEM_HEIGHT = 40;

interface PickerProps {
  style?: any;
  pickerStyle?: any;
  styleTxt?: any;
  title?: string;
  placeholder?: string;
  onValueChange: (_v?: any) => void;
  defaultValue?: string | number;
  listItems: any[];
  displayValue?: (item: any) => string;
  labelField?: string;
  valueField: string;
  emptyValue?: boolean;
  isValueItem?: boolean;
  readonly?: boolean;
  required?: boolean;
  isScrollViewContainer?: boolean;
  multiLineLabels?: boolean;
  popup?: boolean;
  translator?: (key: string, values?: Object) => string;
}

const Picker = ({
  style,
  pickerStyle,
  styleTxt,
  title,
  placeholder,
  onValueChange,
  defaultValue = '',
  listItems,
  displayValue,
  labelField,
  valueField,
  emptyValue = true,
  isValueItem = false,
  readonly = false,
  required = false,
  isScrollViewContainer = false,
  multiLineLabels = false,
  popup = false,
  translator,
}: PickerProps) => {
  const Colors = useThemeColor();

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    !isValueItem
      ? getFromList(listItems, valueField, defaultValue)
      : defaultValue,
  );

  const wrapperRef = useRef(null);
  const selectionWrapperRef = useRef(null);
  useOutsideClickHandler({
    wrapperRef: [wrapperRef, selectionWrapperRef],
    handleOutsideClick: () => {
      setIsOpen(false);
      setIsFocused(false);
    },
    activationCondition: isOpen && !popup,
  });

  useEffect(() => {
    setSelectedItem(
      !isValueItem
        ? getFromList(listItems, valueField, defaultValue)
        : defaultValue,
    );
  }, [defaultValue, isValueItem, listItems, valueField]);

  const togglePicker = useCallback(() => {
    setIsOpen(_current => !_current);
    setIsFocused(_current => !_current);
  }, []);

  const closePicker = useCallback(() => {
    setIsOpen(false);
    setIsFocused(false);
  }, []);

  const handleValueChange = useCallback(
    (itemValue: any) => {
      setIsOpen(false);
      setIsFocused(false);
      setSelectedItem(itemValue);
      itemValue
        ? onValueChange(
            isValueItem
              ? getFromList(listItems, valueField, itemValue[valueField])
              : itemValue[valueField],
          )
        : onValueChange(itemValue);
    },
    [isValueItem, listItems, onValueChange, valueField],
  );

  const marginBottom = useMemo(() => {
    if (isScrollViewContainer && isOpen && !popup) {
      const visibleListLength =
        !Array.isArray(listItems) || listItems?.length === 0
          ? 1
          : Math.min(listItems.length, 5);

      return emptyValue
        ? visibleListLength * ITEM_HEIGHT + ITEM_HEIGHT + 5
        : visibleListLength * ITEM_HEIGHT + 5;
    }

    return undefined;
  }, [isScrollViewContainer, isOpen, popup, listItems, emptyValue]);

  const _required = useMemo(
    () => required && selectedItem == null,
    [required, selectedItem],
  );

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required, isFocused),
    [Colors, _required, isFocused],
  );

  const _displayValue = useCallback(
    (item: any) => {
      if (item == null) return '';
      if (displayValue) return displayValue(item);
      if (labelField) return item[labelField];
      return item[valueField];
    },
    [displayValue, labelField, valueField],
  );

  const displayPlaceholder = useMemo(() => {
    return (
      checkNullString(_displayValue(selectedItem)) &&
      !checkNullString(placeholder)
    );
  }, [_displayValue, placeholder, selectedItem]);

  const styles = useMemo(
    () => getStyles(isOpen, marginBottom),
    [marginBottom, isOpen],
  );

  if (readonly)
    return (
      <FormInput
        style={[styles.container, style]}
        title={title}
        defaultValue={_displayValue(selectedItem)}
        readOnly
      />
    );

  const renderSelection = () => (
    <SelectionContainer
      style={popup ? styles.popupSelection : pickerStyle}
      wrapperRef={selectionWrapperRef}
      emptyValue={emptyValue}
      objectList={listItems}
      keyField={valueField}
      displayValue={_displayValue}
      handleSelect={handleValueChange}
      isPicker={true}
      selectedItem={[selectedItem]}
      title={title}
      multiLineLabels={multiLineLabels && !popup}
      translator={translator}
    />
  );

  return (
    <View
      ref={wrapperRef}
      style={[
        styles.container,
        Platform.OS === 'ios' ? styles.containerZIndex : null,
        style,
      ]}
      testID="pickerContainer">
      {!checkNullString(title) && (
        <Text style={[styles.title, styleTxt]}>{title}</Text>
      )}
      <RightIconButton
        numberOfLines={multiLineLabels ? (null as any) : 1}
        onPress={togglePicker}
        icon={
          <Icon
            name="chevron-down"
            color={Colors.secondaryColor_dark.background}
          />
        }
        title={displayPlaceholder ? placeholder : _displayValue(selectedItem)}
        titleColor={
          displayPlaceholder ? Colors.placeholderTextColor : Colors.text
        }
        styleText={styles.text}
        style={[
          commonStyles.filter,
          commonStyles.filterAlign,
          styles.rightIconButton,
          multiLineLabels && styles.adjustableHeight,
          pickerStyle,
        ]}
        showWrapper={false}
      />
      {popup ? (
        <Alert
          visible={isOpen}
          title={title}
          cancelButtonConfig={{showInHeader: true, onPress: closePicker}}
          translator={translator}>
          {renderSelection()}
        </Alert>
      ) : (
        isOpen && renderSelection()
      )}
    </View>
  );
};

const getStyles = (isOpen: boolean, marginBottom?: number) =>
  StyleSheet.create({
    container: {
      width: '90%',
      alignSelf: 'center',
      marginBottom: marginBottom,
    },
    containerZIndex: {
      zIndex: isOpen ? 100 : 0,
    },
    rightIconButton: {
      width: '100%',
      height: undefined,
      minHeight: 40,
      marginHorizontal: 0,
      marginRight: 0,
      paddingLeft: 10,
      paddingRight: 10,
    },
    adjustableHeight: {
      height: undefined,
      paddingVertical: 10,
    },
    text: {
      flex: 1,
      textAlign: 'left',
    },
    title: {
      marginLeft: 10,
    },
    popupSelection: {
      position: 'relative',
      top: 0,
      elevation: 0,
      shadowOpacity: 0,
      borderRadius: 7,
    },
  });

export default Picker;
