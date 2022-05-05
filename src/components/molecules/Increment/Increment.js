import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Input} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const Increment = ({value, onValueChange}) => {
  const [valueQty, setValueQty] = useState(value);

  const handlePlus = () => {
    const newValue = (parseFloat(valueQty) + parseFloat('1')).toFixed(2);
    setValueQty(newValue.toString());
    onValueChange(newValue);
  };

  const handleMinus = () => {
    const newValue = (parseFloat(valueQty) - parseFloat('1')).toFixed(2);
    if (newValue >= 0) {
      setValueQty(newValue.toString());
      onValueChange(newValue);
    }
  };

  const handleInputChange = input => {
    const newValue = parseFloat(input);
    if (newValue >= 0) {
      setValueQty(newValue.toString());
      onValueChange(newValue);
    }
  };

  return (
    <View style={styles.container_increment}>
      <TouchableOpacity onPress={handleMinus}>
        <View style={styles.container_icon}>
          <Icon name="minus" size={24} color="#3ECF8E" />
        </View>
      </TouchableOpacity>
      <Input
        style={styles.input}
        value={valueQty}
        onChange={handleInputChange}
      />
      <TouchableOpacity onPress={handlePlus}>
        <View style={styles.container_icon}>
          <Icon name="plus" size={24} color="#3ECF8E" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container_increment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_icon: {
    backgroundColor: '#FFFFFF',
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 2,
    paddingHorizontal: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  input: {
    marginHorizontal: 15,
    color: 'gray',
  },
});

export default Increment;
