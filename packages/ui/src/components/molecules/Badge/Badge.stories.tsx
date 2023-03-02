import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as Badge} from './Badge';
import {lightTheme} from '../../../theme/themes';

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
