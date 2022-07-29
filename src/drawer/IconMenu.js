import {Icon} from '@/components/atoms';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const IconMenu = ({icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon size={32} name={icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: 54,
    height: 54,
    borderRadius: 54 / 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default IconMenu;
