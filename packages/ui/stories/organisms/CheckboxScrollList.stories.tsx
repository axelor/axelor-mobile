/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {CheckboxScrollList} from '../../src/components/organisms';

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

storiesOf('ui/organisms/CheckboxScrollList', module).add(
  'default',
  args => {
    return (
      <CheckboxScrollList
        data={DATA}
        onCheckedChange={() => {}}
        renderItem={renderItem}
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
    },
  },
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
