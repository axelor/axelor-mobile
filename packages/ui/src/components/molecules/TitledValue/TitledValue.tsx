import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../../atoms';

interface TitledValueProps {
  title: string;
  value: string;
  style?: any;
}

function TitledValue({title, value, style}: TitledValueProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.importantText}>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  importantText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default TitledValue;
