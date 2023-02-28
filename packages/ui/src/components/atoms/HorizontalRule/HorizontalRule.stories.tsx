import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as HorizontalRule} from './HorizontalRule';
import {StyleSheet} from 'react-native';
import Text from '../Text/Text';

storiesOf('ui/atoms/HorizontalRule', module).add('default', () => (
  <>
    <Text>Before rule</Text>
    <HorizontalRule style={styles.container} />
    <Text>After rule</Text>
  </>
));

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
