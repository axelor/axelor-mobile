import React from 'react';
import {View, StyleSheet} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {default as Screen} from './Screen';
import Text from '../Text/Text';

storiesOf('ui/atoms/Screen', module)
  .addDecorator(story => <View style={styles.padding}>{story()}</View>)
  .add('default', () => (
    <Screen>
      <View style={styles.container}>
        <Text>Hello World!</Text>
      </View>
    </Screen>
  ))
  .add('loading', () => (
    <Screen loading>
      <Text>Hello World loading!</Text>
    </Screen>
  ))
  .add('with fixed items', () => (
    <Screen
      fixedItems={<Text style={styles.padding}>Fixed Item</Text>}
      style={styles.padding}>
      <View style={styles.container}>
        <Text>Hello World!</Text>
      </View>
    </Screen>
  ))
  .add('without top space', () => (
    <Screen removeSpaceOnTop>
      <View style={styles.container}>
        <Text>Hello World!</Text>
      </View>
    </Screen>
  ));

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  padding: {padding: 16},
});
