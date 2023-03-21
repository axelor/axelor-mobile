import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as UnorderedList} from './UnorderedList';
import {View, StyleSheet} from 'react-native';
import {Text} from '../../atoms';

const items = [
  {id: 1, text: 'Item 1'},
  {id: 2, text: 'Item 2'},
  {id: 3, text: 'Item 3'},
  {id: 4, text: 'Item 4'},
];

storiesOf('ui/molecules/UnorderedList', module)
  .addDecorator(story => <View style={styles.decorator}>{story()}</View>)
  .add('default', () => (
    <UnorderedList
      data={items}
      renderItem={({item}) => <Text>{item.text}</Text>}
    />
  ))
  .add('with 2 items', () => (
    <UnorderedList
      data={items}
      numberOfItems={2}
      renderItem={({item}) => <Text>{item.text}</Text>}
    />
  ))
  .add('with 0 items', () => (
    <UnorderedList
      data={[]}
      renderItem={({item}) => <Text>{item.text}</Text>}
    />
  ));

const styles = StyleSheet.create({
  decorator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
