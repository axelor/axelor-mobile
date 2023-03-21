import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as ToggleSwitch} from './ToggleSwitch';

storiesOf('ui/molecules/ToggleSwitch', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <ToggleSwitch
          leftTitle=""
          rightTitle=""
          onSwitch={console.log}
          {...args}
        />
      </View>
    );
  },
  {
    argTypes: {
      leftTitle: {
        type: 'string',
        defaultValue: 'leftTitle',
        control: {type: 'text'},
      },
      rightTitle: {
        type: 'string',
        defaultValue: 'rightTitle',
        control: {type: 'text'},
      },
      styleContainer: {
        control: {
          type: 'object',
        },
        defaultValue: {
          marginHorizontal: 0,
        },
      },
      styleToogle: {
        control: {
          type: 'object',
        },
        defaultValue: {
          marginHorizontal: 0,
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
