import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as PopUpOneButton} from './PopUpOneButton';
import {action} from '@storybook/addon-actions';

storiesOf('ui/organisms/PopUpOneButton', module).add('Default', () => (
  <PopUpOneButton
    visible={true}
    title="Title"
    data="Data"
    btnTitle="Button Title"
    onPress={action('onPress')}
  />
));
