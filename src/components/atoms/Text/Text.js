import Colors from '@/types/colors';
import React from 'react';
import {Text as ReactNativeText, StyleSheet} from 'react-native';

const Text = ({
  style,
  numberOfLines,
  adjustsFontSizeToFit = false,
  children,
}) => {
  return (
    <ReactNativeText
      style={[styles.text, style]}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit={adjustsFontSizeToFit}>
      {children}
    </ReactNativeText>
  );
};
const styles = StyleSheet.create({
  text: {
    color: Colors.text.grey,
  },
});

export default Text;
