import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as Card} from './Card';
import Text from '../Text/Text';

// Define your stories
storiesOf('ui/atoms/Card', module)
  .addDecorator(story => <View style={styles.decorator}>{story()}</View>)
  .add('Default', () => (
    <Card>
      <View />
    </Card>
  ))
  .add('Text', () => (
    <Card>
      <Text>{'Text'}</Text>
    </Card>
  ))
  .add(
    'Custom Style',
    args => (
      <Card {...args}>
        <View style={styles.defaultCustom} />
      </Card>
    ),
    {
      argTypes: {
        style: {
          control: {
            type: 'object',
          },
          defaultValue: {
            width: 0,
            height: 5,
            backgroundColor: 'green',
          },
        },
      },
    },
  );
const styles = StyleSheet.create({
  decorator: {
    padding: 20,
  },
  defaultCustom: {
    height: 100,
    backgroundColor: '#B4503B',
  },
});
