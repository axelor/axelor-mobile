import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as CardIconButton} from './CardIconButton';

const iconNames = ['heart', 'star', 'bell'];

storiesOf('ui/molecules/CardIconButton', module).add(
  'Default',
  args => {
    return (
      <View style={styles.container}>
        {iconNames.map((iconName, index) => (
          <CardIconButton
            key={index}
            iconName={iconName}
            iconColor="#000000"
            onPress={() => console.log(`Button ${index + 1} pressed`)}
            {...args}
          />
        ))}
      </View>
    );
  },
  {
    argTypes: {
      iconName: {
        control: {
          type: 'select',
          options: iconNames,
        },
        defaultValue: 'heart',
      },
      iconColor: {
        control: {
          type: 'color',
        },
        defaultValue: '#000000',
      },
      onPress: {
        action: 'onPress',
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
