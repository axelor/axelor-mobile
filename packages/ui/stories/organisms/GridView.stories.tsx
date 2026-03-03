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
import {Dimensions, StyleSheet, View} from 'react-native';
import type {Meta} from '@storybook/react';
import {GridView as Component} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const data = [
  {id: 1, name: 'Test 1', code: 'hehe', fullName: 'hehe - Test 1'},
  {id: 2, name: 'Test 2', code: 'lala', fullName: 'lala - Test 2'},
  {id: 3, name: 'Test 3', code: 'ui', fullName: 'ui - Test 3'},
];

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/GridView',
  component: Component,
};

export default meta;

export const GridView: Story<typeof Component> = {
  args: {
    title: 'Array component',
    fullName_useCustomWidth: false,
    fullName_width: 100,
  },
  argTypes: {
    translator: disabledControl,
    columns: disabledControl,
    data: disabledControl,
  },
  render: args => (
    <View style={styles.view}>
      <Component
        columns={[
          {title: 'Name', key: 'name'},
          {title: 'Code', key: 'code'},
          {
            title: 'Complete name',
            key: 'fullName',
            width: args.fullName_useCustomWidth
              ? args.fullName_width
              : undefined,
            getValue: row => row.code + ' - ' + row.name,
          },
        ]}
        data={data}
        {...args}
      />
    </View>
  ),
};

const styles = StyleSheet.create({
  view: {
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
