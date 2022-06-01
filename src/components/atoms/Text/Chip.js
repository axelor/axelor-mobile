import React from 'react';
import {Text as ReactNativeText} from 'react-native';
import {StyleSheet} from 'react-native';

const Chip = ({style, children, color}) => {
  return (
    <ReactNativeText style={styles(color).state}>{children}</ReactNativeText>
  );
};

const styles = color =>
  StyleSheet.create({
    state: {
      backgroundColor: color,
      paddingHorizontal: 12,
      paddingVertical: 2,
      borderRadius: 8,
      fontSize: 11,
      fontWeight: 'bold',
      marginTop: 10,
      marginRight: 8,
      color: 'black',
    },
  });

export default Chip;
