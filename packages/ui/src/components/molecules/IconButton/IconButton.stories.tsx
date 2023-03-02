import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as IconButton} from './IconButton';
import {lightTheme} from '../../../theme/themes';

storiesOf('ui/molecules/IconButton', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <IconButton
          title="Press me"
          iconName="check-circle"
          onPress={console.log}
          color={lightTheme.colors.primaryColor}
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
