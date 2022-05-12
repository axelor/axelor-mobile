import React from 'react';
import {StyleSheet, View} from 'react-native';

const CardStockInfo = ({style, children}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 8,
    borderRadius: 14,
    elevation: 3,
    backgroundColor: '#f3f7fc',
    width: '28.2%',
    height: '28%',
    marginHorizontal: '2%',
    marginVertical: '2%',
  },
});

export default CardStockInfo;
