import { CardStockInfo, Text } from '@/components/atoms';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const CardStock = ({ style, title, number }) => {
  return (
    <CardStockInfo>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{number}</Text>
    </CardStockInfo>
  );
};

const styles = StyleSheet.create({

  text: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 10,
    textAlign: 'center'
  }
});

export default CardStock;
