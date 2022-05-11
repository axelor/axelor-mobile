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
          <Text style={styles.textValue}>{defaultValue}</Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: 12,
    marginBottom: '2%',
  },
  container_up: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    flexDirection: 'column',
    width: '100%',
    paddingBottom: '3%',
  },
  container_down: {
    paddingTop: '1%',
    alignItems: 'center',
  },
  textField: {
    fontSize: 16,
    paddingTop: '3%',
  },
  textValue: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: '3%',
  },
});

export default QuantityCard;
