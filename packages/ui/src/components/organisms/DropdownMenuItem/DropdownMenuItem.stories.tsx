import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {default as DropdownMenuItem} from './DropdownMenuItem';

storiesOf('ui/organisms/DropdownMenuItem', module)
  .add('default', () => (
    <DropdownMenuItem
      icon="paperclip"
      placeholder="Placeholder"
      onPress={action('onPress')}
    />
  ))
  .add('with indicator', () => (
    <DropdownMenuItem
      icon="paperclip"
      placeholder="Placeholder"
      indicator={5}
      onPress={action('onPress')}
    />
  ))
  .add('with FontAwesome5 icon', () => (
    <DropdownMenuItem
      icon="file-alt"
      placeholder="Placeholder"
      FontAwesome5
      onPress={action('onPress')}
    />
  ));
