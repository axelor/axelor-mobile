import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as Button} from './Button';
import {lightTheme} from '../../../theme/themes';

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
        options: Object.keys(lightTheme.colors),
        mapping: lightTheme.colors,
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
