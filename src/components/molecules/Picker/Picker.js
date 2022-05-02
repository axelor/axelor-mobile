import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '@/components/atoms';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({style, title, onPress}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.input}>{title}</Text>
      <TouchableOpacity style={styles.action} onPress={onPress}>
        <Icon name="chevron-down" size={24} />
      </TouchableOpacity>
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
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
  },
  input: {
    width: '90%',
  },
  actions: {
    width: '10%',
    display: 'flex',
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    marginLeft: 12,
  },
});

export default SearchBar;
