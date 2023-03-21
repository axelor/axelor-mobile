import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {default as StarScore} from './StarScore';

const stories = storiesOf('ui/molecules/StarScore', module);

stories.add('Default', () => (
  <StarScore
    score={3.5}
    onPress={action('onPress')}
    size={20}
    showHalfStar
    showMissingStar
  />
));
