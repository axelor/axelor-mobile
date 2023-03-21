import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {default as ScrollList} from './ScrollList';
import {StyleSheet, View} from 'react-native';
import {Text} from '../../atoms';

const DATA = [
  {id: '1', title: 'Item 1'},
  {id: '2', title: 'Item 2'},
  {id: '3', title: 'Item 3'},
  {id: '4', title: 'Item 4'},
  {id: '5', title: 'Item 5'},
];

const Item = ({title}: {title: string}) => (
  <View style={styles.item}>
    <Text>{title}</Text>
  </View>
);

const renderItem = ({item}: {item: any}) => <Item title={item.title} />;

storiesOf('ui/organisms/ScrollList', module)
  .addDecorator(story => <View style={styles.container}>{story()}</View>)
  .add('default', () => (
    <ScrollList
      data={DATA}
      loadingList={false}
      moreLoading={false}
      isListEnd={false}
      renderItem={renderItem}
      fetchData={() => {}}
      filter={false}
    />
  ))
  .add('loading', () => (
    <ScrollList
      data={[]}
      loadingList={true}
      moreLoading={false}
      isListEnd={false}
      renderItem={renderItem}
      fetchData={() => {}}
      filter={false}
    />
  ))
  .add('empty list', () => (
    <ScrollList
      data={[]}
      loadingList={false}
      moreLoading={false}
      isListEnd={false}
      renderItem={renderItem}
      fetchData={() => {}}
      filter={false}
    />
  ))
  .add('list end', () => (
    <ScrollList
      data={DATA}
      loadingList={false}
      moreLoading={false}
      isListEnd={true}
      renderItem={renderItem}
      fetchData={() => {}}
      filter={false}
    />
  ))
  .add('more loading', () => (
    <ScrollList
      data={DATA}
      loadingList={false}
      moreLoading={true}
      isListEnd={false}
      renderItem={renderItem}
      fetchData={() => {}}
      filter={false}
    />
  ))
  .add('with translator', () => (
    <ScrollList
      data={[]}
      loadingList={false}
      moreLoading={false}
      isListEnd={false}
      renderItem={renderItem}
      fetchData={() => {}}
      filter={false}
      translator={key => {
        switch (key) {
          case 'Base_NoData':
            return 'There are no items to display.';
          case 'Base_NoMoreItems':
            return 'You have reached the end of the list.';
          default:
            return key;
        }
      }}
    />
  ));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
