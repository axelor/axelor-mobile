import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as FormInput} from './FormInput';

storiesOf('ui/molecules/FormInput', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <FormInput
          title="Input Title"
          defaultValue=""
          required
          onChange={console.log}
          {...args}
        />
      </View>
    );
  },
  {
    argTypes: {
      title: {
        control: {
          type: 'text',
        },
        defaultValue: 'Input Title',
      },
      defaultValue: {
        control: {
          type: 'text',
        },
        defaultValue: '',
      },
      required: {
        control: {
          type: 'boolean',
        },
        defaultValue: true,
      },
      onChange: {
        action: 'onChange',
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
