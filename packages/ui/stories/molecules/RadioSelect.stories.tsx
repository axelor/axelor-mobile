import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {RadioSelect} from '../../src/components';

storiesOf('ui/molecules/RadioSelect', module).add(
  'Default',
  args => {
    return (
      <RadioSelect
        items={[
          {id: '0', title: 'Option 1'},
          {id: '1', title: 'Option 2'},
        ]}
        {...args}
      />
    );
  },
  {
    argTypes: {
      question: {
        control: {
          type: 'text',
        },
        defaultValue: 'Question title',
      },
      radioSize: {
        control: {
          type: 'number',
          min: 5,
          step: 5,
        },
        defaultValue: 20,
      },
      direction: {
        control: 'radio',
        options: ['row', 'column'],
        defaultValue: 'row',
      },
    },
  },
);
