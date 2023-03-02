import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as LabelText} from './LabelText';

const primary = {
  background_light: '#84DCB7',
  foreground: '#000000',
  background: '#3ECF8E',
};

storiesOf('ui/molecules/LabelText', module)
  .addDecorator(story => <View style={styles.container}>{story()}</View>)
  .add('Default', () => (
    <LabelText
      title="Label"
      value="Text"
      iconName="heart"
      color={primary.background_light}
      style={styles.labelText}
    />
  ));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    marginBottom: 10,
  },
});
