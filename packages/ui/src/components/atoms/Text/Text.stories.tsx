import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as Text} from './Text';

storiesOf('ui/atoms/Text', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <Text {...args}>Lorem ipsum dolor sit amet</Text>
      </View>
    );
  },
  {
    argTypes: {
      style: {
        control: {
          type: 'object',
        },
        defaultValue: {fontWeight: 'bold', textAlign: 'center'},
      },
      numberOfLines: {
        control: {
          type: 'number',
          min: 1,
          max: 10,
          step: 1,
        },
        defaultValue: 1,
      },
      adjustsFontSizeToFit: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      textColor: {
        control: {
          type: 'color',
        },
        defaultValue: '#000000',
      },
      fontSize: {
        control: {
          type: 'number',
          min: 10,
          max: 50,
          step: 1,
        },
        defaultValue: 14,
      },
      writingType: {
        options: ['title', 'subtitle', 'important', 'details', undefined],
        control: {
          type: 'select',
        },
        defaultValue: undefined,
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
