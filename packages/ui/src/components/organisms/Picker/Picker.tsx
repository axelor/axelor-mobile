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
}: PickerProps) => {
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside(wrapperRef);
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
    }
  }, [clickOutside, pickerIsOpen]);

  const togglePicker = () => {
    setPickerIsOpen(current => !current);
  };

  const handleValueChange = itemValue => {
    setPickerIsOpen(false);
    setSelectedItem(itemValue);
    itemValue
      ? onValueChange(
          isValueItem
            ? getFromList(listItems, 'id', itemValue[valueField])
            : itemValue[valueField],
        )
      : onValueChange(itemValue);
  };

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);
  const styles = useMemo(() => getStyles(Colors), [Colors]);

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
            />
          ) : null}
        </View>
      )}
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    titleContainer: {
      marginHorizontal: 24,
    },
    rightIconButton: {
      width: Dimensions.get('window').width * 0.9,
      borderColor: Colors.secondaryColor.background,
      borderWidth: 1,
    },
    styleTextButton: {
      left: '-20%',
    },
    infosCard: {
      justifyContent: 'flex-start',
      width: Dimensions.get('window').width * 0.9,
    },
  });

export default Picker;
