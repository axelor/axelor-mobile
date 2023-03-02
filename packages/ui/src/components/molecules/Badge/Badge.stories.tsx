import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as Badge} from './Badge';

const primary = {
  background_light: '#84DCB7',
  foreground: '#000000',
  background: '#3ECF8E',
};
const caution = {
  background_light: '#EE9B67',
  foreground: '#000000',
  background: '#F27B30',
};
const color = {primary, caution};

storiesOf('ui/molecules/Badge', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <Badge title={''} {...args} />
      </View>
    );
  },
  {
    argTypes: {
      title: {
        control: {
          type: 'text',
        },
        defaultValue: 'Badge',
      },
      color: {
        options: Object.keys(color),
        mapping: color,
        control: {
          type: 'select',
          labels: {
            primary: 'Primary',
            caution: 'Caution',
          },
        },
      },
      numberOfLines: {
        control: {
          type: 'range',
          min: 1,
          max: 5,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
