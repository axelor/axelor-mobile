/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {Text} from '../../src/components/atoms';
import {GroupByScrollList} from '../../src/components/organisms';

const DATA = [
  {id: '1', title: 'A. Item 1'},
  {id: '2', title: 'A. Item 2'},
  {id: '3', title: 'B. Item 3'},
  {id: '4', title: 'C. Item 4'},
  {id: '5', title: 'C. Item 5'},
];

const Item = ({title}: {title: string}) => (
  <View style={styles.item}>
    <Text>{title}</Text>
  </View>
);

const renderItem = ({item}: {item: any}) => {
  return <Item title={item.title} />;
};

const separatorCondition = (prevItem: any, currentItem: any) => {
  return prevItem.title[0] !== currentItem.title[0];
};

const fetchIndicator = (currentItem: any, isLoading: boolean) => {
  return {
    title: currentItem.title[0].toUpperCase(),
    numberItems: DATA.filter(item => item.title[0] === currentItem.title[0])
      .length,
    loading: isLoading,
  };
};

storiesOf('ui/organisms/GroupByScrollList', module)
  .addDecorator(story => <View style={styles.container}>{story()}</View>)
  .add('default', () => (
    <GroupByScrollList
      data={DATA}
      loadingList={false}
      moreLoading={false}
      isListEnd={false}
      renderItem={renderItem}
      fetchData={() => {}}
      filter={false}
      separatorCondition={separatorCondition}
      fetchIndicator={currentItem => fetchIndicator(currentItem, false)}
    />
  ))
  .add('loading', () => (
    <GroupByScrollList
      data={DATA}
      loadingList={true}
      moreLoading={false}
      isListEnd={false}
      renderItem={renderItem}
      fetchData={() => {}}
      filter={false}
      separatorCondition={separatorCondition}
      fetchIndicator={currentItem => fetchIndicator(currentItem, false)}
    />
  ))
  .add('empty list', () => (
    <GroupByScrollList
      data={[]}
      loadingList={false}
      moreLoading={false}
      isListEnd={false}
      renderItem={renderItem}
      fetchData={() => {}}
      filter={false}
      separatorCondition={separatorCondition}
      fetchIndicator={currentItem => fetchIndicator(currentItem, false)}
    />
  ))
  .add('list end', () => (
    <GroupByScrollList
      data={DATA}
      loadingList={false}
      moreLoading={false}
      isListEnd={true}
      renderItem={renderItem}
      fetchData={() => {}}
      filter={false}
      separatorCondition={separatorCondition}
      fetchIndicator={currentItem => fetchIndicator(currentItem, false)}
    />
  ))
  .add('more loading', () => (
    <GroupByScrollList
      data={DATA}
      loadingList={false}
      moreLoading={true}
      isListEnd={false}
      renderItem={renderItem}
      fetchData={() => {}}
      filter={false}
      separatorCondition={separatorCondition}
      fetchIndicator={currentItem => fetchIndicator(currentItem, false)}
    />
  ))
  .add('with translator', () => (
    <GroupByScrollList
      data={DATA}
      loadingList={false}
      moreLoading={false}
      isListEnd={true}
      renderItem={renderItem}
      fetchData={() => {}}
      filter={false}
      translator={key => {
        switch (key) {
          case 'Base_NoMoreItems':
            return 'You have reached the end of the list.';
          default:
            return key;
        }
      }}
      separatorCondition={separatorCondition}
      fetchIndicator={currentItem => fetchIndicator(currentItem, false)}
    />
  ))
  .add('with loading indicator', () => (
    <GroupByScrollList
      data={DATA}
      loadingList={false}
      moreLoading={false}
      isListEnd={true}
      renderItem={renderItem}
      fetchData={() => {}}
      filter={false}
      separatorCondition={separatorCondition}
      fetchIndicator={currentItem => fetchIndicator(currentItem, true)}
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
