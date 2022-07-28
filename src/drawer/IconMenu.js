import {Icon} from '@/components/atoms';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const IconMenu = ({icon}) => {
  return (
    <View style={styles.container}>
      <Icon size={32} name={icon} />
    </View>
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
