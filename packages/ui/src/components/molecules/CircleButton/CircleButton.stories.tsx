import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as CircleButton} from './CircleButton';

const icons = ['heart', 'star', 'camera'];

storiesOf('ui/molecules/CircleButton', module).add('Default', () => {
  return (
    <View style={styles.container}>
      {icons.map(icon => (
        <CircleButton
          key={icon}
          iconName={icon}
          onPress={() => console.log(`Pressed ${icon} button`)}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingVertical: 50,
  },
});
