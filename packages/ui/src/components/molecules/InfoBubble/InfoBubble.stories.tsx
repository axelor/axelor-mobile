import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as InfoBubble} from './InfoBubble';
import {View} from 'react-native';

const primary = {
  background_light: '#84DCB7',
  foreground: '#000000',
  background: '#3ECF8E',
};

storiesOf('ui/molecules/InfoBubble', module)
  .addDecorator(story => <View>{story()}</View>)
  .add('Default', () => (
    <InfoBubble
      iconName="info"
      badgeColor={primary}
      indication="This is some information."
    />
  ));
