import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = ({style, children}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 14,
    elevation: 3,
    backgroundColor: '#fff',
  },
});

export default Card;
