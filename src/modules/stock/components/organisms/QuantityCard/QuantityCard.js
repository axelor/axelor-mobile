import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from '@/components/atoms';
import {Increment} from '@/components/molecules';

const QuantityCard = ({children, labelQty, defaultValue, onValueChange}) => {
  return (
    <Card style={styles.container}>
      <View style={styles.container_up}>{children}</View>
      <View style={styles.container_down}>
        <Text>{labelQty}</Text>
        <Increment value={defaultValue} onValueChange={onValueChange} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: 12,
    marginBottom: 6,
  },
  container_up: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    flexDirection: 'column',
    width: '100%',
    paddingBottom: 6,
  },
  container_down: {
    paddingTop: 3,
    alignItems: 'center',
  },
});

export default QuantityCard;
