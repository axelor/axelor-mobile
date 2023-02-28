import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View} from 'react-native';
import {default as DottedLine} from './DottedLine';

storiesOf('ui/atoms/DottedLine', module).add(
  'default',
  args => (
    <View {...args}>
      <DottedLine />
    </View>
  ),
  {
    argTypes: {
      style: {
        control: {
          type: 'object',
        },
        defaultValue: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
  },
);
