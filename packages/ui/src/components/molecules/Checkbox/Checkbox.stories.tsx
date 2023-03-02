import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as Checkbox} from './Checkbox';

const colors = {
  primary: {
    background: '#3ECF8E',
  },
  secondary: {
    background: '#84DCB7',
  },
};

storiesOf('ui/molecules/Checkbox', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <Checkbox
          title="Check me"
          isDefaultChecked={false}
          onChange={console.log}
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
        defaultValue: 'Checkbox Title',
      },
      isDefaultChecked: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      disabled: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      onChange: {
        action: 'onChange',
      },
      iconSize: {
        control: {
          type: 'range',
          min: 10,
          max: 50,
          step: 2,
        },
        defaultValue: 30,
      },
      style: {
        control: {
          type: 'object',
        },
      },
      styleTxt: {
        control: {
          type: 'object',
        },
      },
    },
    parameters: {
      backgrounds: {
        default: 'white',
        values: [
          {name: 'white', value: '#ffffff'},
          {name: 'primary', value: colors.primary.background},
          {name: 'secondary', value: colors.secondary.background},
        ],
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
