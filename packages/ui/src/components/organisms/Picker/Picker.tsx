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

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {getCommonStyles} from '../../../utils/commons-styles';
import {Icon, Text} from '../../atoms';
import {LabelText, SelectionContainer, RightIconButton} from '../../molecules';
import {getFromList} from '../../../utils/list';
import {
  OUTSIDE_INDICATOR,
  useClickOutside,
} from '../../../hooks/use-click-outside';
import {ThemeColors} from '../../../theme';

const ITEM_HEIGHT = 40;

interface PickerProps {
  style?: any;
  pickerStyle?: any;
  styleTxt?: any;
  title: string;
  onValueChange: (any) => void;
  defaultValue?: string;
  listItems: any[];
  labelField: string;
  valueField: string;
  emptyValue?: boolean;
  isValueItem?: boolean;
  disabled?: boolean;
  disabledValue?: string;
  iconName?: string;
  required?: boolean;
  isScrollViewContainer?: boolean;
}

const Picker = ({
  style,
  pickerStyle,
  styleTxt,
  title,
  onValueChange,
  defaultValue = '',
  listItems,
  labelField,
  valueField,
  emptyValue = true,
  isValueItem = false,
  disabled = false,
  disabledValue = null,
  iconName = null,
  required = false,
  isScrollViewContainer = false,
}: PickerProps) => {
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({
    wrapperRef,
    visible: pickerIsOpen,
  });
  const Colors = useThemeColor();
  const [selectedItem, setSelectedItem] = useState(
    getFromList(listItems, valueField, defaultValue),
  );

  useEffect(() => {
    setSelectedItem(getFromList(listItems, valueField, defaultValue));
  }, [defaultValue, listItems, valueField]);

  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && pickerIsOpen) {
      setPickerIsOpen(false);
      setIsFocused(false);
    }
  }, [clickOutside, pickerIsOpen]);

  const toggleValue = current => !current;

  const togglePicker = () => {
    setPickerIsOpen(toggleValue);
    setIsFocused(toggleValue);
  };

  const handleValueChange = itemValue => {
    setPickerIsOpen(false);
    setIsFocused(false);
    setSelectedItem(itemValue);
    itemValue
      ? onValueChange(
          isValueItem
            ? getFromList(listItems, 'id', itemValue[valueField])
            : itemValue[valueField],
        )
      : onValueChange(itemValue);
  };

  const _required = useMemo(
    () => required && selectedItem == null,
    [required, selectedItem],
  );

  const marginBottom = useMemo(() => {
    const listLength = listItems.length;

    if (isScrollViewContainer && pickerIsOpen) {
      return emptyValue
        ? listLength * ITEM_HEIGHT + ITEM_HEIGHT + 5
        : listLength * ITEM_HEIGHT + 5;
    }

    return null;
  }, [emptyValue, isScrollViewContainer, listItems.length, pickerIsOpen]);

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required),
    [Colors, _required],
  );
  const styles = useMemo(
    () => getStyles(Colors, _required, marginBottom, pickerIsOpen),
    [Colors, _required, marginBottom, pickerIsOpen],
  );

  return (
    <View ref={wrapperRef} style={[styles.container, style]}>
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
          <LabelText
            value={
              disabledValue == null || disabledValue === ''
                ? '-'
                : disabledValue
            }
            title={`${title} :`}
            iconName={iconName}
          />
        </View>
      ) : (
        <View style={styles.pickerContainerStyle}>
          <RightIconButton
            onPress={togglePicker}
            icon={
              <Icon
                name="chevron-down"
                color={Colors.secondaryColor_dark.background}
              />
            }
            title={selectedItem ? selectedItem[labelField] : ''}
            styleText={styles.styleTextButton}
            style={[
              commonStyles.filter,
              commonStyles.filterSize,
              commonStyles.filterAlign,
              styles.rightIconButton,
              isFocused && commonStyles.inputFocused,
              pickerStyle,
            ]}
          />
          {pickerIsOpen ? (
            <SelectionContainer
              emptyValue={emptyValue}
              objectList={listItems}
              keyField={valueField}
              displayValue={item => item[labelField]}
              handleSelect={handleValueChange}
              isPicker={true}
              selectedItem={[selectedItem]}
            />
          ) : null}
        </View>
      )}
    </View>
  );
};

const getStyles = (
  Colors: ThemeColors,
  _required: boolean,
  marginBottom,
  pickerIsOpen: boolean,
) =>
  StyleSheet.create({
    container: {
      zIndex: pickerIsOpen ? 45 : 0,
    },
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
    styleTextButton: {
      left: '-20%',
    },
    infosCard: {
      justifyContent: 'flex-start',
      width: Dimensions.get('window').width * 0.9,
    },
    pickerContainerStyle: {
      marginBottom: marginBottom,
      zIndex: pickerIsOpen ? 50 : 0,
    },
  });

export default Picker;
