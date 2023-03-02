import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as Switch} from './Switch';

const handleToggle = (isEnabled: boolean) => {
  console.log(`Switch toggled: ${isEnabled}`);
};

storiesOf('ui/atoms/Switch', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        <Switch isEnabled={false} handleToggle={handleToggle} {...args} />
      </View>
    );
  },
  {
    argTypes: {
      isEnabled: {
        control: {
          type: 'boolean',
        },
        defaultValue: false,
      },
      handleToggle: {
        action: 'handleToggle',
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
