/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {ScrollList} from '../../src/components/organisms';

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

const actionList = [
  {
    iconName: 'car-front',
    title: 'Test 1',
    onPress: () => console.log('Test 1 pressed.'),
  },
  {
    iconName: 'car-front',
    title: 'Test 2',
    onPress: () => console.log('Test 2 pressed.'),
  },
  {
    iconName: 'car-front',
    title: 'Test 3',
    onPress: () => console.log('Test 3 pressed.'),
  },
];

storiesOf('ui/organisms/ScrollList', module).add(
  'default',
  args => {
    return (
      <ScrollList
        loadingList={false}
        data={DATA}
        renderItem={renderItem}
        fetchData={() => {}}
        moreLoading={false}
        isListEnd={false}
        filter={false}
        actionList={actionList}
        {...args}
      />
    );
  },
  {
    argTypes: {
      loadingList: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      moreLoading: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      isListEnd: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      horizontal: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      verticalAction: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
    },
  },
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
  },
});
