import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as EditableInput} from './EditableInput';

const theme = {
  background: '#ffffff',
  text: '#000000',
};

storiesOf('ui/molecules/EditableInput', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <EditableInput
          placeholder="Enter text here"
          onValidate={console.log}
          defaultValue={args.defaultValue}
          multiline={args.multiline}
          numberOfLines={args.numberOfLines}
        />
      </View>
    );
  },
  {
    argTypes: {
      defaultValue: {
        control: {
          type: 'text',
        },
        defaultValue: '',
      },
      multiline: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      numberOfLines: {
        control: {
          type: 'range',
          min: 1,
          max: 10,
          step: 1,
        },
        defaultValue: 1,
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
    padding: 20,
  },
});
