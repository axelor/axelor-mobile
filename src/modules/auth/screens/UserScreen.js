import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Screen, Text} from '@/components/atoms';
import {logout} from '@/modules/auth/features/authSlice';

const UserScreen = () => {
  const dispatch = useDispatch();

  return (
    <Screen style={styles.container}>
      <Text>UserScreen (User settings)</Text>
      <Button title="logout" onPress={() => dispatch(logout())} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserScreen;
