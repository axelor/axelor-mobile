import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as ImageBubble} from './ImageBubble';
import {Text} from '../../atoms';
import {StyleSheet} from 'react-native';

storiesOf('ui/organisms/ImageBubble', module)
  .add('default', () => (
    <ImageBubble
      source={{
        uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=brooke-cagle-395b55a9fa4c.jpg',
      }}
      listComponent={[
        <Text key="1">Text Component 1</Text>,
        <Text key="2">Text Component 2</Text>,
      ]}
    />
  ))
  .add('with custom styles', () => (
    <ImageBubble
      source={{
        uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=brooke-cagle-395b55a9fa4c.jpg',
      }}
      listComponent={[
        <Text key="1">Text Component 1</Text>,
        <Text key="2">Text Component 2</Text>,
      ]}
      style={styles.custom}
    />
  ));

const styles = StyleSheet.create({
  custom: {backgroundColor: 'red'},
});
