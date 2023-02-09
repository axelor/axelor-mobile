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

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {getCommonStyles} from '../../../utils/commons-styles';
import {Text} from '../../atoms';
import {
  LabelText,
  SelectionContainer,
  MultiValuePickerButton,
} from '../../molecules';
import {getItemsFromList} from '../../../utils/list';
import {
  OUTSIDE_INDICATOR,
  useClickOutside,
} from '../../../hooks/use-click-outside';
import {ThemeColors} from '../../../theme';

interface MultiValuePickerProps {
  style?: any;
  pickerStyle?: any;
  styleTxt?: any;
  title: string;
  onValueChange?: (any) => void;
  defaultValue?: any[];
  listItems: any[];
  labelField: string;
  valueField: string;
  disabled?: boolean;
  disabledValue?: string;
  iconName?: string;
  required?: boolean;
}

const MultiValuePicker = ({
  style,
  pickerStyle,
  styleTxt,
  title,
  onValueChange,
  defaultValue = [],
  listItems = [],
  labelField,
  valueField,
  disabled = false,
  disabledValue = '',
  iconName = null,
  required = false,
}: MultiValuePickerProps) => {
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({
    wrapperRef,
    visible: pickerIsOpen,
  });
  const Colors = useThemeColor();
  const [selectedItem, setSelectedItem] = useState(
    getItemsFromList(listItems, valueField, defaultValue),
  );

  useEffect(() => {
    setSelectedItem(getItemsFromList(listItems, valueField, defaultValue));
  }, [defaultValue, listItems, valueField]);

  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && pickerIsOpen) {
      setPickerIsOpen(false);
    }
  }, [clickOutside, pickerIsOpen]);

  const togglePicker = () => {
    setPickerIsOpen(current => !current);
  };

  const handleValueChange = useCallback(
    itemValue => {
      if (itemValue != null) {
        let newSelecteditems = [];
        if (
          selectedItem.some(item => item[valueField] === itemValue[valueField])
        ) {
          newSelecteditems = selectedItem.filter(
            i => i[valueField] !== itemValue[valueField],
          );
        } else {
          newSelecteditems = [...selectedItem, itemValue];
        }
        setSelectedItem(newSelecteditems);
        onValueChange(newSelecteditems);
      }
    },
    [onValueChange, selectedItem, valueField],
  );

  const _required = useMemo(
    () => required && (selectedItem == null || selectedItem?.length === 0),
    [required, selectedItem],
  );

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);
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
          {/* TODO : improve here */}
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
        <View>
          <MultiValuePickerButton
            onPress={togglePicker}
            listItem={selectedItem}
            labelField={labelField}
            style={[
              commonStyles.filter,
              commonStyles.filterSize,
              commonStyles.filterAlign,
              styles.rightIconButton,
              pickerStyle,
            ]}
            onPressItem={handleValueChange}
          />
          {pickerIsOpen ? (
            <SelectionContainer
              objectList={listItems}
              keyField={valueField}
              displayValue={item => item[labelField]}
              handleSelect={handleValueChange}
              isPicker={true}
              selectedItem={selectedItem}
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
