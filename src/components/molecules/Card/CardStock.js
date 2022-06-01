import {Card, Text} from '@/components/atoms';
import React from 'react';
import {StyleSheet} from 'react-native';

const CardStock = ({title, number}) => {
  return (
    <Card style={styles.card}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.qty}>{number}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '1%',
    marginVertical: '1%',
    width: '28.2%',
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
