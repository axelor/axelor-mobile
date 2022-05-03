import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@/components/atoms';

const Badge = ({style, title}) => {
  return (
    <View style={style}>
      <Text style={styles.badgeTxt}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeTxt: {
    fontSize: 14,
    color: '#2A2A2A',
  },
});

export default Badge;
