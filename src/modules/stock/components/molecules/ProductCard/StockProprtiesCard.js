import {Text} from '@/components/atoms';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const StockProprtiesCard = ({style, title, value}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 2,
  },
  title: {
    fontSize: 12,
    color: '#606060',
  },
  value: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default StockProprtiesCard;
