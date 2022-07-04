import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@/components/atoms';

const LoginButton = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Button style={styles.button} title="LOGIN" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    marginTop: 15,
    width: '30%',
    elevation: 5,
  },
});

export default LoginButton;
