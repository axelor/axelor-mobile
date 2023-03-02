import React from 'react';
import {StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {default as HalfLabelCard} from './HalfLabelCard';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
});

storiesOf('ui/molecules/HalfLabelCard', module)
  .addDecorator(story => <>{story()}</>)
  .add('Default', () => (
    <HalfLabelCard
      iconName="user"
      title="Profile"
      onPress={action('Card pressed')}
    />
  ))
  .add('With custom style', () => (
    <HalfLabelCard
      iconName="settings"
      title="Settings"
      onPress={action('Card pressed')}
      style={styles.container}
    />
  ));
