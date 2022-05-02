import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Input} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({style, placeholder, onSearchPress, onScanPress}) => {
  return (
    <View style={[styles.container, style]}>
      <Input style={styles.input} placeholder={placeholder} />
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={onSearchPress}>
          <Icon name="search" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={onScanPress}>
          <Icon name="qrcode" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 13,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 13,
    borderColor:'black',
    borderWidth:1,
  },
  input: {
    width: '80%',
    padding:5
  },
  actions: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'flex-end'
  },
  action: {
    marginLeft: 12,
  },
});

export default SearchBar;
