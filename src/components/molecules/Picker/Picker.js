import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@/components/atoms';
import {Picker as ReactNativePicker} from '@react-native-picker/picker';

const Picker = ({
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

  const handleValueChange = itemValue => {
    setSelectedValue(itemValue);
    onValueChange(itemValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.input}>{title}</Text>
      </View>
      <View style={styles.pickerContainer}>
        <ReactNativePicker
          dropdownIconColor={'#CECECE'}
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          mode="dropdown">
          <ReactNativePicker.Item label={''} value={'empty'} />
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
});

export default Picker;
