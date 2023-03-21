import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as ViewAllContainer} from './ViewAllContainer';
import {View, StyleSheet} from 'react-native';
import {Text} from '../../atoms';

const data = [
  {id: '1', name: 'Item 1'},
  {id: '2', name: 'Item 2'},
  {id: '3', name: 'Item 3'},
  {id: '4', name: 'Item 4'},
  {id: '5', name: 'Item 5'},
];

storiesOf('ui/molecules/ViewAllContainer', module)
  .addDecorator(story => <View style={styles.decorator}>{story()}</View>)
  .add('default', () => (
    <ViewAllContainer
      children={''}
      title="View All Container"
      data={data}
      onViewPress={() => console.log('View All Pressed')}
      renderFirstTwoItems={item => <Text>{item.name}</Text>}
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
