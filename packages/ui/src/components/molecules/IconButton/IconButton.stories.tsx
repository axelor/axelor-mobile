import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as IconButton} from './IconButton';

const primary = {
  background_light: '#84DCB7',
  foreground: '#FFFFFF',
  background: '#3ECF8E',
};
const caution = {
  background_light: '#EE9B67',
  foreground: '#FFFFFF',
  background: '#F27B30',
};
const color = {primary, caution};

storiesOf('ui/molecules/IconButton', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <IconButton
          title="Press me"
          iconName="check-circle"
          onPress={console.log}
          color={primary}
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
        defaultValue: 'Button Title',
      },
      iconName: {
        control: {
          type: 'text',
        },
        defaultValue: 'check-circle',
      },
      onPress: {
        action: 'onPress',
      },
      disabled: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
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
  },
});
