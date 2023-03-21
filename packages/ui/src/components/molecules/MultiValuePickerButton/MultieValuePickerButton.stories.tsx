import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as MultiValuePickerButton} from './MultiValuePickerButton';
import {lightTheme} from '../../../theme/themes';
import {action} from '@storybook/addon-actions';

storiesOf('ui/molecules/MultiValuePickerButton', module).add(
  'custom',
  args => (
    <MultiValuePickerButton
      onPress={() => action('onPress')}
      onPressItem={() => action('onPressItem')}
      listItem={[
        {id: 1, name: 'name1'},
        {id: 2, name: 'name2'},
        {id: 3, name: 'name3'},
      ]}
      labelField={'name'}
      itemColor={lightTheme.colors.primaryColor}
      {...args}
    />
  ),
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
      labelField: {
        control: 'select',
        options: ['name', 'id'],
      },
      itemColor: {
        options: Object.keys(lightTheme.colors),
        mapping: lightTheme.colors,
        control: {
          type: 'select',
        },
      },
    },
  },
);
