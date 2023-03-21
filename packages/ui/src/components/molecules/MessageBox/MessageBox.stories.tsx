import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as MessageBox} from './MessageBox';
storiesOf('ui/molecules/MessageBox', module).add(
  'Default',
  args => <MessageBox placeholder="placeholder" {...args} />,
  {
    argTypes: {
      disabled: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
    },
  },
);
