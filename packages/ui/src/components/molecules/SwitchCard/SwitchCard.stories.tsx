import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as SwitchCard} from './SwitchCard';

storiesOf('ui/molecules/SwitchCard', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <SwitchCard
          title={'Press me'}
          defaultValue={true}
          onToggle={console.log}
          {...args}
        />
      </View>
    );
  },
  {
    argTypes: {
      title: {
        type: 'string',
        defaultValue: 'Press me',
        control: {type: 'text'},
      },
      onToggle: {
        action: 'clicked',
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
