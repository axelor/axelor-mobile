import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as BlockInteractionScreen} from './BlockInteractionScreen';
import Text from '../Text/Text';

storiesOf('ui/atoms/BlockInteractionScreen', module).add(
  'default',
  args => (
    <BlockInteractionScreen {...args}>
      <Text>Example content</Text>
    </BlockInteractionScreen>
  ),
  {
    argTypes: {
      hideHeader: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
    },
  },
);
