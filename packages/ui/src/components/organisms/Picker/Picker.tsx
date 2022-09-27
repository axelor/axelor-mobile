import React, {useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Picker as ReactNativePicker} from '@react-native-picker/picker';
import {useThemeColor} from '../../../ThemeContext';
import {getCommonStyles} from '../../../commons-styles';
import {Text} from '../../atoms';
import {LabelText} from '../../molecules';
import {getFromList} from '../../../utils/list';

interface PickerProps {
  styleTxt?: any;
  title: string;
  onValueChange: (any) => void;
  defaultValue: number | undefined;
  listItems: any[];
  labelField: string;
  valueField: string;
  emptyValue?: boolean;
  isValueItem?: boolean;
  disabled: boolean;
  disabledValue: string;
  iconName?: string;
}

const Picker = ({
  styleTxt,
  title,
  onValueChange,
  defaultValue,
  listItems,
  labelField,
  valueField,
  emptyValue = true,
  isValueItem = false,
  disabled = false,
  disabledValue = null,
  iconName = null,
}: PickerProps) => {
  const Colors = useThemeColor();
  const [selectedValue, setSelectedValue] = useState(
    defaultValue == null ? '' : defaultValue,
  );

  const handleValueChange = itemValue => {
    setSelectedValue(itemValue);
    onValueChange(
      isValueItem ? getFromList(listItems, 'id', itemValue) : itemValue,
    );
  };

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);
  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={styles.container}>
      {!disabled && (
        <View style={styles.titleContainer}>
          <Text style={[styles.title, styleTxt]}>{title}</Text>
        </View>
      )}
      {disabled ? (
        <View
          style={[
            commonStyles.filter,
            commonStyles.filterSize,
            commonStyles.filterAlign,
            styles.infosCard,
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
        <View style={[commonStyles.filter, styles.pickerContainer]}>
          {
            <ReactNativePicker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              dropdownIconColor={Colors.secondaryColor_dark}
              selectedValue={selectedValue}
              onValueChange={handleValueChange}
              mode="dropdown">
              {emptyValue && <ReactNativePicker.Item label={''} value={null} />}
              {listItems == null
                ? null
                : listItems.map(item => {
                    return (
                      <ReactNativePicker.Item
                        key={item[valueField]}
                        label={item[labelField]}
                        value={item[valueField]}
                      />
                    );
                  })}
            </ReactNativePicker>
          }
        </View>
      )}
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 6,
    },
    title: {
      width: '90%',
    },
    container: {
      alignSelf: 'center',
    },
    pickerContainer: {
      width: Dimensions.get('window').width * 0.9,
    },
    pickerItem: {
      backgroundColor: Colors.backgroundColor,
      color: Colors.text,
    },
    picker: {
      backgroundColor: Colors.backgroundColor,
    },
    infosCard: {
      justifyContent: 'flex-start',
      width: Dimensions.get('window').width * 0.9,
    },
  });

export default Picker;
