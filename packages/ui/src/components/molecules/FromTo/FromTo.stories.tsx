import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View} from 'react-native';
import {default as FromTo} from './FromTo';
import {Text} from '../../atoms';

storiesOf('ui/molecules/FromTo', module).add('Default', () => {
  return (
    <View>
      <FromTo fromComponent={<Text>From</Text>} toComponent={<Text>To</Text>} />
    </View>
  );
});
