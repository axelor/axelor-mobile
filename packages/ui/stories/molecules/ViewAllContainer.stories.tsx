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
import type {Meta} from '@storybook/react';
import {ViewAllContainer as Component, Text} from '../../src/components';
import {disabledControl, Story} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/ViewAllContainer',
  component: Component,
};

export default meta;

export const ViewAllContainer: Story<typeof Component> = {
  args: {
    title: 'Title',
    disabled: false,
    isHeaderExist: false,
  },
  argTypes: {
    translator: disabledControl,
    onNewIcon: disabledControl,
    onViewPress: disabledControl,
    renderFirstTwoItems: disabledControl,
    data: disabledControl,
  },
  render: args => (
    <Component
      data={[
        {id: '1', name: 'Item 1'},
        {id: '2', name: 'Item 2'},
        {id: '3', name: 'Item 3'},
        {id: '4', name: 'Item 4'},
        {id: '5', name: 'Item 5'},
      ]}
      children={<Text>Children</Text>}
      onViewPress={() => console.log('View all pressed.')}
      renderFirstTwoItems={item => <Text>{item.name}</Text>}
      {...args}
    />
  ),
};
