import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Input} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '@/types/colors';

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

  const handleEndInput = () => {
    if (valueQty.slice(-1) === '.') {
      valueQty.replace(/.$/, '');
    }

    if (valueQty === '' || valueQty === null) {
      setValueQty('0.00');
      onValueChange(0.0);
    } else {
      const newValue = parseFloat(valueQty).toFixed(2);
      if (newValue >= 0) {
        setValueQty(newValue.toString());
        onValueChange(newValue);
      } else {
        setValueQty('0.00');
        onValueChange(0.0);
      }
    }
  };

  return (
    <View style={styles.container_increment}>
      <TouchableOpacity onPress={handleMinus} activeOpacity={0.7}>
        <View style={styles.container_icon}>
          <Icon name="minus" style={styles.icon} />
        </View>
      </TouchableOpacity>
      <View style={styles.inputLine}>
        <Input
          style={styles.input}
          value={valueQty}
          onChange={input => setValueQty(input)}
          keyboardType="numeric"
          onEndFocus={handleEndInput}
        />
      </View>
      <TouchableOpacity onPress={handlePlus} activeOpacity={0.7}>
        <View style={styles.container_icon}>
          <Icon name="plus" style={styles.icon} />
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
    backgroundColor: Colors.background.white,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 2,
    paddingHorizontal: 5,
    borderColor: Colors.border.grey,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  input: {
    fontSize: 23,
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  inputLine: {
    borderStyle: 'dashed',
    borderBottomColor: Colors.border.grey,
    borderBottomWidth: 0.7,
    marginBottom: 9,
  },
  icon: {
    fontSize: 24,
    color: Colors.icon.green,
  },
});

export default Increment;
