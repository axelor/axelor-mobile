import React from 'react';
import {StyleSheet, View} from 'react-native';

const Screen = ({style, children}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Screen;
