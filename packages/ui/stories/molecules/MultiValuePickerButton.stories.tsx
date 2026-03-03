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
import {MultiValuePickerButton as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/MultiValuePickerButton',
  component: Component,
};

export default meta;

export const MultiValuePickerButton: Story<typeof Component> = {
  args: {
    readonly: false,
    item1_title: 'Test 1',
    item1_color: 'secondaryColor',
    item2_title: 'Test 2',
    item2_color: 'primaryColor',
  },
  argTypes: {
    item1_color: colorPicker,
    item2_color: colorPicker,
    onPress: disabledControl,
    onPressItem: disabledControl,
    listItem: disabledControl,
  },
  render: args => (
    <Component
      listItem={[
        {color: args.item1_color, title: args.item1_title, key: 1},
        {color: args.item2_color, title: args.item2_title, key: 2},
      ]}
      {...args}
    />
  ),
};
