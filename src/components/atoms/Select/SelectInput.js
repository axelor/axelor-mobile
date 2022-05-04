import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const SelectInput = ({ style, text, onPress }) => {

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={[styles.selectInput, style]} onPress={onPress}>{text}</Text>
      <View style={styles.actions}>
        <TouchableOpacity >
          <Icon size={16} name="chevron-down" color="#e6e6e6" />
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f7fc',
    borderRadius: 13,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  actions: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  selectInput: {
    width: '80%',
  },
});

export default SelectInput;

