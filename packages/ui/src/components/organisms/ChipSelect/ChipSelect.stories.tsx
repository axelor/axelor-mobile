import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {default as ChipSelect} from './ChipSelect';
import {lightTheme} from '../../../theme/themes';

const items = [
  {
    title: 'Option 1',
    color: lightTheme.colors.primaryColor,
    key: 'option1',
  },
  {
    title: 'Option 2',
    color: lightTheme.colors.cautionColor,
    key: 'option2',
    isActive: true,
  },
  {
    title: 'Option 3',
    color: lightTheme.colors.infoColor,
    key: 'option3',
  },
];

storiesOf('ui/organisms/ChipSelect', module)
  .add('multi-select', () => (
    <ChipSelect
      selectionItems={items}
      mode="multi"
      onChangeValue={action('onChangeValue')}
      width={100}
    />
  ))
  .add('switch-select', () => (
    <ChipSelect
      selectionItems={items}
      mode="switch"
      onChangeValue={action('onChangeValue')}
      width={100}
    />
  ))
  .add(
    'custom',
    args => (
      <ChipSelect
        selectionItems={items}
        mode="switch"
        onChangeValue={action('onChangeValue')}
        {...args}
      />
    ),
    {
      argTypes: {
        width: {
          control: {
            type: 'range',
            min: 100,
            max: 500,
            step: 10,
          },
          defaultValue: 200,
        },
        marginHorizontal: {
          control: {
            type: 'range',
            min: 0,
            max: 50,
            step: 2,
          },
          defaultValue: 12,
        },
        mode: {
          options: ['multi', 'switch'],
          control: {type: 'radio'},
        },
      },
    },
  );
