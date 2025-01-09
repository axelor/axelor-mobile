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
import {UnorderedList} from '../../src/components/molecules';

const items = [
  {id: 1, text: 'Item 1'},
  {id: 2, text: 'Item 2'},
  {id: 3, text: 'Item 3'},
  {id: 4, text: 'Item 4'},
];

storiesOf('ui/molecules/UnorderedList', module)
  .add('default', () => (
    <UnorderedList
      data={items}
      renderItem={({item}) => <Text>{item.text}</Text>}
    />
  ))
  .add('with 0 items', () => (
    <UnorderedList
      data={[]}
      renderItem={({item}) => <Text>{item.text}</Text>}
    />
  ))
  .add('with 2 items', () => (
    <UnorderedList
      data={items}
      numberOfItems={2}
      renderItem={({item}) => <Text>{item.text}</Text>}
    />
  ));
