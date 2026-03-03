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
import {View} from 'react-native';
import type {Meta} from '@storybook/react';
import {Card, Text, TreeView as Component} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const branchData = [
  {id: 2, parent: {id: 1}, isBranch: false, title: 'Leaf 1'},
  {id: 3, parent: {id: 1}, isBranch: false, title: 'Leaf 2'},
  {id: 4, parent: {id: 1}, isBranch: true, title: 'Branch 2'},
  {id: 5, parent: {id: 4}, isBranch: false, title: 'Leaf 3'},
];

const actionList = [
  {
    iconName: 'car-front',
    title: 'Car',
    onPress: () => console.log('Car'),
  },
  {
    iconName: 'truck-front',
    title: 'Truck',
    onPress: () => console.log('Truck'),
  },
  {
    iconName: 'bicycle',
    title: 'Bicycle',
    onPress: () => console.log('Bicycle'),
  },
];

const meta: Meta<typeof Component> = {
  title: 'ui/templates/TreeView',
  component: Component,
};

export default meta;

export const TreeView: Story<typeof Component> = {
  args: {
    loadingList: false,
    data: [{id: 1, parent: null, isBranch: true, title: 'Branch 1'}],
    parentFieldName: 'parent',
    branchCardInfoButtonIndication: 'Filter',
    moreLoading: false,
    isListEnd: true,
    actionList: actionList,
    verticalActions: true,
  },
  argTypes: {
    style: disabledControl,
    styleFooter: disabledControl,
    data: disabledControl,
    parentFieldName: disabledControl,
    renderBranch: disabledControl,
    renderLeaf: disabledControl,
    fetchData: disabledControl,
    fetchBranchData: disabledControl,
    branchCondition: disabledControl,
    onBranchFilterPress: disabledControl,
    filter: disabledControl,
    translator: disabledControl,
    disabledRefresh: disabledControl,
    actionList: disabledControl,
  },
  render: args => (
    <Component
      renderBranch={({item}) => (
        <View>
          <Text>{item.title}</Text>
        </View>
      )}
      renderLeaf={({item}) => (
        <Card>
          <Text>{item.title}</Text>
        </Card>
      )}
      fetchBranchData={idParent => {
        return new Promise(function (resolve) {
          resolve({
            data: {
              data: branchData.filter(item => item.parent.id === idParent),
            },
          });
        });
      }}
      branchCondition={item => item.isBranch}
      {...args}
    />
  ),
};
