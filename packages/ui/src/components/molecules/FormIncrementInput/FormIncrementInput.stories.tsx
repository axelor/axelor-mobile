import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as FormIncrementInput} from './FormIncrementInput';

storiesOf('ui/molecules/FormIncrementInput', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <FormIncrementInput
          title="Increment Input"
          defaultValue="0"
          decimalSpacer=","
          thousandSpacer="."
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
        defaultValue: 'Increment Input',
      },
      defaultValue: {
        control: {
          type: 'text',
        },
        defaultValue: '0',
      },
      decimalSpacer: {
        control: {
          type: 'text',
        },
        defaultValue: ',',
      },
      thousandSpacer: {
        control: {
          type: 'text',
        },
        defaultValue: '.',
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
