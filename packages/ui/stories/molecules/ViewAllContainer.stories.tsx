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
import {storiesOf} from '@storybook/react-native';
import {Text} from '../../src/components/atoms';
import {ViewAllContainer} from '../../src/components/molecules';

const data = [
  {id: '1', name: 'Item 1'},
  {id: '2', name: 'Item 2'},
  {id: '3', name: 'Item 3'},
  {id: '4', name: 'Item 4'},
  {id: '5', name: 'Item 5'},
];

storiesOf('ui/molecules/ViewAllContainer', module).add(
  'default',
  args => {
    return (
      <ViewAllContainer
        data={data}
        children={<Text>Children</Text>}
        onViewPress={() => console.log('View all pressed.')}
        renderFirstTwoItems={item => <Text>{item.name}</Text>}
        {...args}
      />
    );
  },
  {
    argTypes: {
      title: {
        type: 'string',
        defaultValue: 'Title',
        control: {type: 'text'},
      },
      disabled: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
      isHeaderExist: {
        type: 'boolean',
        defaultValue: false,
        control: {type: 'boolean'},
      },
    },
  },
);
