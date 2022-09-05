import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {Increment} from '@/components/molecules';

const QuantityCard = ({
  style,
  children,
  labelQty,
  defaultValue,
  onValueChange,
  editable,
  actionQty = false,
  onPressActionQty = () => {},
}) => {
  return (
    <Card style={[styles.container, style]}>
      <View style={styles.container_up}>
        {actionQty ? (
          <View style={styles.actionContainer}>
            <View style={styles.childrenContainer}>{children}</View>
            <Icon
              name="pencil-alt"
              size={17}
              touchable={true}
              onPress={onPressActionQty}
            />
          </View>
        ) : (
          <View>{children}</View>
        )}
      </View>
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
    marginHorizontal: 16,
    marginBottom: '2%',
  },
  container_up: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    flexDirection: 'column',
    width: '100%',
    paddingBottom: '3%',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  childrenContainer: {
    flexDirection: 'column',
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
