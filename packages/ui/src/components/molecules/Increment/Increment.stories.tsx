import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as Increment} from './Increment';
import {View, StyleSheet} from 'react-native';

storiesOf('ui/molecules/Increment', module)
  .addDecorator(story => <View style={styles.decorator}>{story()}</View>)
  .add(
    'default',
    args => {
      return <Increment {...args} value="" onValueChange={() => {}} />;
    },
    {
      argTypes: {
        value: {
          control: {
            type: 'text',
          },
        },
        onValueChange: {
          action: 'value changed',
        },
        decimalSpacer: {
          control: {
            type: 'text',
          },
        },
        thousandSpacer: {
          control: {
            type: 'text',
          },
        },
        style: {
          control: {
            type: 'object',
          },
          defaultValue: {},
        },
        inputStyle: {
          control: {
            type: 'object',
          },
          defaultValue: {},
        },
      },
    },
  );
const styles = StyleSheet.create({
  decorator: {
    padding: 20,
  },
});
