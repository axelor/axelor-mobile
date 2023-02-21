import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as Button} from './Button';

const primary = {
  background_light: '#84DCB7',
  foreground: '#000000',
  background: '#3ECF8E',
};
const secondary = {
  background_light: '#DDDDDD',
  foreground: '#000000',
  background: '#CECECE',
};
const color = {primary, secondary};

storiesOf('ui/molecules/Button', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <Button title={'Press me'} {...args} />
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
      color: {
        options: Object.keys(color),
        mapping: color,
        control: {
          type: 'select',
          labels: {
            primary: 'Primary',
            secondary: 'Secondary',
          },
        },
      },
      disabled: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      onPress: {
        action: 'clicked',
        table: {disable: true},
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
