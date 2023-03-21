import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as Picker} from './Picker';
import {action} from '@storybook/addon-actions';

const listItems = [
  {id: '1', label: 'Item 1'},
  {id: '2', label: 'Item 2'},
  {id: '3', label: 'Item 3'},
];

storiesOf('ui/organisms/Picker', module).add('Default', () => (
  <Picker
    title="Select an item"
    onValueChange={action('onValueChange')}
    defaultValue="1"
    listItems={listItems}
    labelField="label"
    valueField="id"
  />
));
