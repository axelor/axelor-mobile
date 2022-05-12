import React from 'react';
import {Text as ReactNativeText} from 'react-native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {color} from 'react-native-reanimated';

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
