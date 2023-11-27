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
import {lightTheme} from '../../src/theme';

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

const fetchTopIndicator = (
  currentItem: any,
  position?: 'left' | 'center' | 'right' | 'separate',
  iconName?: string,
  iconSize?: number,
  iconColorIndex?: number,
  titleSize?: number,
  numberSize?: number,
  loadingNumber?: boolean,
) => {
  return {
    position: position,
    iconName: iconName,
    iconSize: iconSize,
    iconColor: lightTheme.colors[iconColorIndex],
    title: currentItem.title[0].toUpperCase(),
    titleSize: titleSize,
    numberItems: DATA.filter(item => item.title[0] === currentItem.title[0])
      .length,
    numberSize: numberSize || 30,
    loadingNumber: loadingNumber,
  };
};

const fetchBottomIndicator = (prevItem: any) => {
  return {
    text: 'End of: ' + prevItem.title[0],
  };
};

storiesOf('ui/organisms/GroupByScrollList', module)
  .addDecorator(story => <View style={styles.container}>{story()}</View>)
  .add(
    'default',
    args => (
      <GroupByScrollList
        data={DATA}
        loadingList={false}
        moreLoading={false}
        isListEnd={false}
        renderItem={renderItem}
        fetchData={() => {}}
        filter={false}
        separatorCondition={separatorCondition}
        fetchTopIndicator={currentItem =>
          fetchTopIndicator(
            currentItem,
            args.topIndicator_position,
            args.topIndicator_iconName,
            args.topIndicator_iconSize,
            args.topIndicator_iconColor,
            args.topIndicator_titleSize,
            args.topIndicator_numberSize,
            args.topIndicator_loadingNumber,
          )
        }
        fetchBottomIndicator={prevItem => fetchBottomIndicator(prevItem)}
      />
    ),
    {
      argTypes: {
        topIndicator_position: {
          control: {
            type: 'select',
            options: ['left', 'center', 'right', 'separate'],
          },
        },
        topIndicator_iconName: {
          type: 'string',
          defaultValue: 'car',
          control: {type: 'text'},
        },
        topIndicator_iconSize: {
          control: {
            type: 'range',
            min: 10,
            max: 50,
            step: 2,
          },
          defaultValue: 30,
        },
        topIndicator_iconColor: {
          options: Object.entries(lightTheme.colors)
            .filter(([, _color]) => typeof _color !== 'string')
            .map(([key]) => key),
          defaultValue: 'primaryColor',
          control: {
            type: 'select',
          },
        },
        topIndicator_titleSize: {
          control: {
            type: 'range',
            min: 10,
            max: 50,
            step: 2,
          },
          defaultValue: 18,
        },
        topIndicator_numberSize: {
          control: {
            type: 'range',
            min: 10,
            max: 50,
            step: 2,
          },
          defaultValue: 30,
        },
        topIndicator_loadingNumber: {
          type: 'boolean',
          defaultValue: false,
          control: {type: 'boolean'},
        },
      },
    },
  )
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
      fetchTopIndicator={currentItem => fetchTopIndicator(currentItem)}
      fetchBottomIndicator={prevItem => fetchBottomIndicator(prevItem)}
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
      fetchTopIndicator={currentItem => fetchTopIndicator(currentItem)}
      fetchBottomIndicator={prevItem => fetchBottomIndicator(prevItem)}
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
      fetchTopIndicator={currentItem => fetchTopIndicator(currentItem)}
      fetchBottomIndicator={prevItem => fetchBottomIndicator(prevItem)}
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
      fetchTopIndicator={currentItem => fetchTopIndicator(currentItem)}
      fetchBottomIndicator={prevItem => fetchBottomIndicator(prevItem)}
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
      fetchTopIndicator={currentItem => fetchTopIndicator(currentItem)}
      fetchBottomIndicator={prevItem => fetchBottomIndicator(prevItem)}
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
