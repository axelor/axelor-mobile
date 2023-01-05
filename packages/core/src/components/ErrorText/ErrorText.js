import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@axelor/aos-mobile-ui';

const ErrorText = ({message}) => {
  return <Text style={styles.text}>{message}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    alignSelf: 'center',
  },
});

export default ErrorText;
