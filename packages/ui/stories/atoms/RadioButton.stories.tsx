import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {RadioButton} from '../../src/components';

storiesOf('ui/atoms/RadioButton', module).add(
  'Default',
  args => {
    return <RadioButton onPress={() => {}} title={'Option title'} {...args} />;
  },
  {
    argTypes: {
      selected: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      size: {
        control: {
          type: 'number',
          min: 5,
          step: 5,
        },
        defaultValue: 20,
      },
    },
  },
);
