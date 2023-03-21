import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as MultiSelectValue} from './MultiSelectValue';

storiesOf('ui/organisms/MultiSelectValue', module)
  .addDecorator(story => <View style={styles.decorator}>{story()}</View>)
  .add('default', () => (
    <MultiSelectValue
      title="Selected Items"
      itemList={['Item 1', 'Item 2', 'Item 3']}
    />
  ));
const styles = StyleSheet.create({
  decorator: {padding: 20},
});
