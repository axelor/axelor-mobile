import React from 'react';
import {StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {default as Image} from './Image';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderWidth: 1,
    borderColor: 'gray',
  },
});

const IMAGE_URI =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=brooke-cagle-395b55a9fa4c.jpg';

storiesOf('ui/molecules/Image', module)
  .addDecorator(story => <View style={styles.container}>{story()}</View>)
  .add('default', () => (
    <Image
      source={{uri: IMAGE_URI}}
      resizeMode="contain"
      generalStyle={styles.image}
      imageSize={{width: 200, height: 200}}
      defaultIconSize={30}
    />
  ))
  .add('invalid source', () => (
    <Image
      source={{uri: 'invalid'}}
      resizeMode="contain"
      generalStyle={styles.image}
      imageSize={{width: 200, height: 200}}
      defaultIconSize={30}
    />
  ))
  .add('with default icon size', () => (
    <Image
      source={{uri: IMAGE_URI}}
      resizeMode="contain"
      generalStyle={styles.image}
      imageSize={{width: 200, height: 200}}
      defaultIconSize={100}
    />
  ));
