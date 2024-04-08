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
import {storiesOf} from '@storybook/react-native';
import {GridView} from '../../src/components/organisms';
import {Dimensions, StyleSheet, View} from 'react-native';

const data = [
  {id: 1, name: 'Test 1', code: 'hehe', fullName: 'hehe - Test 1'},
  {id: 2, name: 'Test 2', code: 'lala', fullName: 'lala - Test 2'},
  {id: 3, name: 'Test 3', code: 'ui', fullName: 'ui - Test 3'},
];

storiesOf('ui/organisms/GridView', module).add(
  'Default',
  args => {
    return (
      <View style={styles.view}>
        <GridView
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
    );
  },
  {
    argTypes: {
      title: {
        type: 'string',
        defaultValue: 'Array component',
        control: {type: 'text'},
      },
      fullName_useCustomWidth: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      fullName_width: {
        control: {
          type: 'number',
          min: 50,
          max: 500,
          step: 1,
        },
        defaultValue: 100,
      },
    },
  },
);

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    width: 50,
  },
});
