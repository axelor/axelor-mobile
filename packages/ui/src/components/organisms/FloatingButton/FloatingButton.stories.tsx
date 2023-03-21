import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as FloatingButton} from './FloatingButton';
import {action} from '@storybook/addon-actions';

const actions = [
  {
    key: 1,
    title: 'Add',
    iconName: 'plus',
    disabled: false,
    onPress: action('Add button pressed'),
  },
  {
    key: 2,
    title: 'Edit',
    iconName: 'pencil',
    disabled: false,
    onPress: action('Edit button pressed'),
  },
  {
    key: 3,
    title: 'Delete',
    iconName: 'trash',
    disabled: true,
    onPress: action('Delete button pressed'),
  },
];

storiesOf('ui/organisms/FloatingButton', module)
  .addDecorator(story => <View style={styles.decorator}>{story()}</View>)
  .add('default', () => (
    <FloatingButton
      actions={actions}
      iconName="plus"
      size={60}
      style={styles.component}
      translator={text => text}
    />
  ));
const styles = StyleSheet.create({
  decorator: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  component: {marginBottom: 20},
});
