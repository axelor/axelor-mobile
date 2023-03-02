import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as ClearableCard} from './ClearableCard';

const Colors = {
  background: '#ffffff',
  text: '#000000',
  primary: '#3ECF8E',
};

storiesOf('ui/molecules/ClearableCard', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <ClearableCard
          valueTxt="Some text"
          onClearPress={console.log}
          clearable={true}
          {...args}
        />
      </View>
    );
  },
  {
    argTypes: {
      valueTxt: {
        control: {
          type: 'text',
        },
        defaultValue: 'Some text',
      },
      clearable: {
        control: {
          type: 'boolean',
        },
        defaultValue: true,
      },
      onClearPress: {
        action: 'onClearPress',
      },
      style: {
        control: {
          type: 'object',
        },
        defaultValue: {},
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 20,
  },
});
