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
import {BottomBar as Component, Text} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const viewContent = <Text>View Content</Text>;

const meta: Meta<typeof Component> = {
  title: 'ui/templates/BottomBar',
  component: Component,
};

export default meta;

export const BottomBar: Story<typeof Component> = {
  args: {
    itemSize: 50,
    item1_iconName: 'house',
    item1_color: 'secondaryColor_dark',
    item1_indicator: 0,
    item1_disabled: false,
    item2_iconName: 'clock-history',
    item2_color: 'plannedColor',
    item2_indicator: 0,
    item2_disabled: false,
    item3_iconName: 'trash',
    item3_color: 'infoColor',
    item3_indicator: 0,
    item3_disabled: false,
    item4_iconName: 'x-lg',
    item4_color: 'progressColor',
    item4_indicator: 0,
    item4_disabled: false,
    item5_iconName: 'person-fill',
    item5_color: undefined,
    item5_indicator: 0,
    item5_disabled: false,
  },
  argTypes: {
    item1_color: colorPicker,
    item2_color: colorPicker,
    item3_color: colorPicker,
    item4_color: colorPicker,
    item5_color: colorPicker,
    items: disabledControl,
  },
  render: args => (
    <Component
      items={[
        {
          iconName: args.item1_iconName,
          viewComponent: viewContent,
          indicator: args.item1_indicator,
          color: args.item1_color,
          disabled: args.item1_disabled,
        },
        {
          iconName: args.item2_iconName,
          viewComponent: viewContent,
          indicator: args.item2_indicator,
          color: args.item2_color,
          disabled: args.item2_disabled,
        },
        {
          iconName: args.item3_iconName,
          viewComponent: viewContent,
          indicator: args.item3_indicator,
          color: args.item3_color,
          disabled: args.item3_disabled,
        },
        {
          iconName: args.item4_iconName,
          viewComponent: viewContent,
          indicator: args.item4_indicator,
          color: args.item4_color,
          disabled: args.item4_disabled,
        },
        {
          iconName: args.item5_iconName,
          viewComponent: viewContent,
          indicator: args.item5_indicator,
          color: args.item5_color,
          disabled: args.item5_disabled,
        },
      ]}
      {...args}
    />
  ),
};
