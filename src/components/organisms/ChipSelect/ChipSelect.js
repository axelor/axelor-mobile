import React from 'react';
import {StyleSheet, View} from 'react-native';

const ChipSelect = ({style, children}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
});

export default ChipSelect;
