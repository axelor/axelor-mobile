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
import {MultiValuePicker as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/MultiValuePicker',
  component: Component,
};

export default meta;

export const MultiValuePicker: Story<typeof Component> = {
  args: {
    title: 'Select options',
    placeholder: 'Placeholder',
    readonly: false,
    required: false,
    item1_color: 'primaryColor',
    item1_title: 'Item 1',
    item2_color: 'secondaryColor',
    item2_title: 'Item 2',
    item3_color: 'cautionColor',
    item3_title: 'Item 3',
  },
  argTypes: {
    item1_color: colorPicker,
    item2_color: colorPicker,
    item3_color: colorPicker,
    onValueChange: disabledControl,
    listItems: disabledControl,
    defaultItems: disabledControl,
    translator: disabledControl,
  },
  render: args => {
    const listItem = [
      {color: args.item1_color, title: args.item1_title, key: 1},
      {color: args.item2_color, title: args.item2_title, key: 2},
      {color: args.item3_color, title: args.item3_title, key: 3},
    ];

    return (
      <Component
        listItems={listItem}
        defaultItems={[listItem[0], listItem[2]]}
        {...args}
      />
    );
  },
};
