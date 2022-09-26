import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@/components/atoms';
import {Picker as ReactNativePicker} from '@react-native-picker/picker';
import {useThemeColor} from '@aos-mobile/ui';
import getFromList from '@/modules/stock/utils/get-from-list';

const Picker = ({
  style,
  styleTxt,
  title,
  onValueChange,
  defaultValue,
  listItems,
  labelField,
  valueField,
  emptyValue = true,
  isValueItem = false,
}) => {
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

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.input, styleTxt]}>{title}</Text>
      </View>
      <View style={styles.pickerContainer}>
        <ReactNativePicker
          style={styles.picker}
          dropdownIconColor={Colors.secondaryColor_dark}
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          mode="dropdown">
          {emptyValue && (
            <ReactNativePicker.Item
              style={styles.pickerItem}
              label={''}
              value={null}
            />
          )}
          {listItems == null
            ? null
            : listItems.map(item => {
                return (
                  <ReactNativePicker.Item
                    style={styles.pickerItem}
                    key={item[valueField]}
                    label={item[labelField]}
                    value={item[valueField]}
                  />
                );
              })}
        </ReactNativePicker>
      </View>
    </View>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    container: {
      width: '95%',
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 16,
    },
    input: {
      width: '90%',
    },
    pickerContainer: {
      backgroundColor: Colors.backgroundColor,
      borderRadius: 13,
      elevation: 3,
      paddingHorizontal: 10,
      marginHorizontal: 8,
      marginVertical: 6,
    },
    pickerItem: {
      backgroundColor: Colors.backgroundColor,
      color: Colors.text,
    },
    picker: {
      backgroundColor: Colors.backgroundColor,
    },
  });

export default Picker;
