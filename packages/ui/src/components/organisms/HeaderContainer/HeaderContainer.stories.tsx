import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, StyleSheet} from 'react-native';
import {default as HeaderContainer} from './HeaderContainer';
import {Text} from '../../atoms';

storiesOf('ui/organisms/HeaderContainer', module)
  .addDecorator(story => <View style={styles.decorator}>{story()}</View>)
  .add('default', () => (
    <HeaderContainer>
      <View style={styles.decorator}>
        <Text>Content goes here</Text>
      </View>
    </HeaderContainer>
  ));
const styles = StyleSheet.create({
  decorator: {padding: 20},
});
