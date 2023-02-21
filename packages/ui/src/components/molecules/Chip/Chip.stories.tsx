import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as Chip} from './Chip';

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

storiesOf('ui/molecules/Chip', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <Chip
          title="Press me"
          selected={false}
          onPress={console.log}
          selectedColor={primary}
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
        defaultValue: 'Chip Title',
      },
      selected: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      selectedColor: {
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
      onPress: {
        action: 'onPress',
      },
      width: {
        control: {
          type: 'range',
          min: 100,
          max: 500,
          step: 10,
        },
        defaultValue: 200,
      },
      marginHorizontal: {
        control: {
          type: 'range',
          min: 0,
          max: 50,
          step: 2,
        },
        defaultValue: 12,
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
