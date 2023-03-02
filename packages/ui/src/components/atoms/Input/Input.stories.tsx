import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as Input} from './Input';

const writingTypeOptions = ['title', 'subtitle', 'important', 'details'];

storiesOf('ui/atoms/Input', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <Input
          value=""
          onChange={console.log}
          placeholder="Enter text here"
          {...args}
        />
      </View>
    );
  },
  {
    argTypes: {
      value: {
        control: {
          type: 'text',
        },
        defaultValue: '',
      },
      onChange: {
        action: 'onChange',
      },
      placeholder: {
        control: {
          type: 'text',
        },
        defaultValue: 'Enter text here',
      },
      secureTextEntry: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      readOnly: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      multiline: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
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
      keyboardType: {
        control: {
          type: 'select',
          options: [
            'default',
            'email-address',
            'numeric',
            'phone-pad',
            'ascii-capable',
            'numbers-and-punctuation',
            'url',
            'number-pad',
            'name-phone-pad',
            'decimal-pad',
            'twitter',
            'web-search',
            'visible-password',
          ],
        },
        defaultValue: 'default',
      },
      writingType: {
        control: {
          type: 'select',
          options: writingTypeOptions,
        },
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
