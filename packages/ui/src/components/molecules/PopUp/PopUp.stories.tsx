import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as PopUp} from './PopUp';

storiesOf('ui/molecules/PopUp', module).add('default', () => (
  <PopUp visible={true} title="Title" data="Data">
    test
  </PopUp>
));
