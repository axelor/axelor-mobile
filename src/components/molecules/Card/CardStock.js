import {CardStockInfo, Text} from '@/components/atoms';
import React from 'react';
import {StyleSheet} from 'react-native';

const CardStock = ({style, title, number}) => {
  return (
    <CardStockInfo style={styles.card}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.qty}>{number}</Text>
    </CardStockInfo>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 90,
  },
  text: {
    color: '#606060',
    fontSize: 12,
    textAlign: 'center',
  },
  qty: {
    color: '#606060',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CardStock;
