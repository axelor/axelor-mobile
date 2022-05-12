import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@/components/atoms';
import {Picker as ReactNativePicker} from '@react-native-picker/picker';

const Picker = ({
  style,
  styleTxt,
  title,
  onValueChange,
  defaultValue,
  listItems,
  labelField,
  valueField,
}) => {
  const [selectedValue, setSelectedValue] = useState(
    defaultValue === null ? '' : defaultValue,
  );

  const handleValueChange = (itemValue,itemIndex) => {
    setSelectedValue(itemValue);
    onValueChange(itemValue,itemIndex);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.input, styleTxt]}>{title}</Text>
      </View>
      <View style={styles.pickerContainer}>
        <ReactNativePicker
          style={styles.picker}
          dropdownIconColor={'#CECECE'}
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          mode="dropdown">
          <ReactNativePicker.Item  />
          {listItems.map(item => {
            return (
              <ReactNativePicker.Item
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

const styles = StyleSheet.create({
  container: {
    width: '95%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  input: {
    width: '90%',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 13,
    elevation: 3,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  picker: {
    color: '#606060',
  },
});

export default Picker;
