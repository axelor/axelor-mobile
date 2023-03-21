import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as TitledValue} from './TitledValue';

storiesOf('ui/molecules/TitledValue', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <TitledValue title="" value="" {...args} />
      </View>
    );
  },
  {
    argTypes: {
      title: {
        type: 'string',
        defaultValue: 'title',
        control: {type: 'text'},
      },
      value: {
        type: 'string',
        defaultValue: 'value',
        control: {type: 'text'},
      },
      style: {
        control: {
          type: 'object',
        },
        defaultValue: {
          marginHorizontal: 20,
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
