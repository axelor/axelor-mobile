import React from 'react';
import {StyleSheet} from 'react-native';
import {Screen, Text} from '@axelor/aos-mobile-ui';

function EventDetailsScreen({navigation}) {
  return (
    <Screen removeSpaceOnTop={true}>
      <Text>Test</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  toggleSwitchContainer: {
    width: '90%',
    marginLeft: '4%',
  },
  toggle: {
    width: '54%',
    height: 38,
    borderRadius: 13,
  },
});

export default EventDetailsScreen;
