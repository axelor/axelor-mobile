import React from 'react';
import {Text as ReactNativeText, StyleSheet} from 'react-native';

const Text = ({style, numberOfLines, children}) => {
  return (
    <ReactNativeText style={[styles.text, style]} numberOfLines={numberOfLines}>
      {children}
    </ReactNativeText>
  );
};
const styles = StyleSheet.create({
  text: {
    color: '#606060',
  },
});

export default Text;
