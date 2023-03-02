import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as Chip} from './Chip';
import {lightTheme} from '../../../theme/themes';

storiesOf('ui/molecules/Chip', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <Chip
          title="Press me"
          selected={false}
          onPress={console.log}
          selectedColor={lightTheme.colors.primaryColor}
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
        options: Object.keys(lightTheme.colors),
        mapping: lightTheme.colors,
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
