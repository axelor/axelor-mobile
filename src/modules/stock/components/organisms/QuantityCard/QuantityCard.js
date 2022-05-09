import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from '@/components/atoms';
import {Increment} from '@/components/molecules';

const QuantityCard = ({
  children,
  labelQty,
  defaultValue,
  onValueChange,
  editable,
}) => {
  return (
    <Card style={styles.container}>
      <View style={styles.container_up}>{children}</View>
      <View style={styles.container_down}>
        <Text style={styles.textField}>{labelQty}</Text>
        {editable ? (
          <Increment
            value={defaultValue.toString()}
            onValueChange={onValueChange}
          />
        ) : (
          <Text style={styles.textField}>{defaultValue}</Text>
        )}
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
  textField: {
    fontSize: 16,
    paddingTop: 10,
  },
});

export default QuantityCard;
