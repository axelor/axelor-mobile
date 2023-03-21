import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as LoadingIndicator} from './LoadingIndicator';
import {useConfig} from '@axelor/aos-mobile-ui';

storiesOf('ui/molecules/LoadingIndicator', module).add('custom', () => {
  const {setActivityIndicator} = useConfig();
  setActivityIndicator(true);
  return <LoadingIndicator />;
});
