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
import {ChipSelect as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/ChipSelect',
  component: Component,
};

export default meta;

export const ChipSelect: Story<typeof Component> = {
  args: {
    mode: 'switch',
    readonly: false,
    width: 200,
    marginHorizontal: 12,
    option1_title: 'Option 1',
    option1_color: 'primaryColor',
    option2_title: 'Option 2',
    option2_color: 'plannedColor',
    option3_title: 'Option 3',
    option3_color: 'infoColor',
    showClearButton: false,
  },
  argTypes: {
    option1_color: colorPicker,
    option2_color: colorPicker,
    option3_color: colorPicker,
    selectionItems: disabledControl,
    isRefresh: disabledControl,
    onChangeValue: disabledControl,
  },
  render: args => (
    <Component
      selectionItems={[
        {
          title: args.option1_title,
          color: args.option1_color,
          key: 'option1',
        },
        {
          title: args.option2_title,
          color: args.option2_color,
          key: 'option2',
          isActive: true,
        },
        {
          title: args.option3_title,
          color: args.option3_color,
          key: 'option3',
        },
      ]}
      onChangeValue={() => {}}
      {...args}
    />
  ),
};
