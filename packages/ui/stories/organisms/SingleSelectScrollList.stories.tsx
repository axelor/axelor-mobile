/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import type {Meta} from '@storybook/react';
import {SingleSelectScrollList as Component, Text} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/SingleSelectScrollList',
  component: Component,
};

export default meta;

export const SingleSelectScrollList: Story<typeof Component> = {
  args: {
    loadingList: false,
    moreLoading: false,
    isListEnd: true,
    buttonSize: 20,
  },
  argTypes: {
    data: disabledControl,
    onChange: disabledControl,
    renderItem: disabledControl,
    fetchData: disabledControl,
    defaultSelected: disabledControl,
    translator: disabledControl,
    keyField: disabledControl,
  },
  render: args => (
    <Component
      data={[
        {id: 1, title: 'A. Item 1'},
        {id: 2, title: 'B. Item 2'},
        {id: 3, title: 'C. Item 3'},
        {id: 4, title: 'D. Item 4'},
        {id: 5, title: 'E. Item 5'},
      ]}
      defaultSelected={{id: 2}}
      onChange={() => {}}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text>{item.title}</Text>
        </View>
      )}
      {...args}
    />
  ),
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    borderRadius: 7,
    padding: 20,
  },
});
