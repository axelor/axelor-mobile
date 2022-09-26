import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from '@aos-mobile/ui';

const DropdownMenuItem = ({placeholder, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuItem}>
        <Icon name="paperclip" size={15} style={styles.icon} />
        <Text style={styles.text}>{placeholder}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingVertical: 5,
  },
  text: {
    fontSize: 18,
  },
  icon: {
    marginRight: 10,
  },
});

export default DropdownMenuItem;
