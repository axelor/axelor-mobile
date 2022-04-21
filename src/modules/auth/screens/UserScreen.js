import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@/components/atoms';

const UserScreen = () => {
  return (
    <View style={styles.container}>
      <Text>UserScreen (User settings)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserScreen;
