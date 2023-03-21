import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as PopUpTwoButton} from './PopUpTwoButton';
import {action} from '@storybook/addon-actions';

storiesOf('ui/organisms/PopUpTwoButton', module).add('Default', () => (
  <PopUpTwoButton
    visible={true}
    title="Title"
    data="Data"
    PrimaryBtnTitle="Primary Button"
    onPressPrimary={action('onPressPrimary')}
    SecondaryBtnTitle="Secondary Button"
    onPressSecondary={action('onPressSecondary')}
  />
));
