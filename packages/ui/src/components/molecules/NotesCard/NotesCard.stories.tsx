import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as NotesCard} from './NotesCard';

storiesOf('ui/molecules/NotesCard', module).add(
  'custom',
  args => <NotesCard title={'title'} data={'data'} {...args} />,
  {
    argTypes: {
      style: {
        control: {
          type: 'object',
        },
        defaultValue: {
          marginHorizontal: 20,
        },
      },
      title: {
        control: 'text',
        defaultValue: 'title',
      },
      data: {
        control: 'text',
        defaultValue: 'data',
      },
    },
  },
);
