import React from 'react';
import {StyleSheet, View} from 'react-native';

const ChipSelect = ({style, children}) => {
  return <View style={[styles.chipContainer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
});

export default ChipSelect;
