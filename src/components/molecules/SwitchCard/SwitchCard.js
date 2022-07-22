import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Switch, Text} from '@/components/atoms';

const SwitchCard = ({style, title, defaultValue, onToggle = () => {}}) => {
  return (
    <Card style={[styles.container, style]}>
      <Text>{title}</Text>
      <Switch isEnabled={defaultValue} handleToggle={onToggle} />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 12,
    paddingLeft: 12,
    paddingVertical: 10,
    elevation: 1,
    marginBottom: 8,
  },
});

export default SwitchCard;
