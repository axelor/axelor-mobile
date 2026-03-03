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
import {DoubleIcon as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/DoubleIcon',
  component: Component,
};

export default meta;

export const Story1: Story<typeof Component> = {
  name: 'with pre-defined position',
  args: {
    predefinedPosition: 'bottom',
    configTopIcon_name: 'heart-fill',
    configTopIcon_color: 'importantColor',
    configTopIcon_size: 15,
    configBottomIcon_name: 'person-fill',
    configBottomIcon_color: 'primaryColor',
    configBottomIcon_size: 22,
    touchable: false,
  },
  argTypes: {
    configTopIcon_color: colorPicker,
    configBottomIcon_color: colorPicker,
    topIconConfig: disabledControl,
    topIconPosition: disabledControl,
    bottomIconConfig: disabledControl,
    size: disabledControl,
    onPress: disabledControl,
  },
  render: args => (
    <Component
      {...args}
      style={{
        width: args.configBottomIcon_size,
        height: args.configBottomIcon_size,
        margin: args.configTopIcon_size,
      }}
      topIconConfig={{
        name: args.configTopIcon_name,
        size: args.configTopIcon_size,
        color: args.configTopIcon_color.background,
      }}
      bottomIconConfig={{
        name: args.configBottomIcon_name,
        size: args.configBottomIcon_size,
        color: args.configBottomIcon_color.background,
      }}
    />
  ),
};

export const Story2: Story<typeof Component> = {
  name: 'with custom position',
  args: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    size: 30,
    configTopIcon_name: 'heart-fill',
    configTopIcon_color: 'importantColor',
    configBottomIcon_name: 'person-fill',
    configBottomIcon_color: 'primaryColor',
    touchable: false,
  },
  argTypes: {
    configTopIcon_color: colorPicker,
    configBottomIcon_color: colorPicker,
    topIconConfig: disabledControl,
    topIconPosition: disabledControl,
    bottomIconConfig: disabledControl,
    onPress: disabledControl,
    predefinedPosition: disabledControl,
  },
  render: args => (
    <Component
      {...args}
      topIconPosition={{
        top: args.top,
        right: args.right,
        left: args.left,
        bottom: args.bottom,
      }}
      topIconConfig={{
        name: args.configTopIcon_name,
        color: args.configTopIcon_color.background,
      }}
      bottomIconConfig={{
        name: args.configBottomIcon_name,
        color: args.configBottomIcon_color.background,
      }}
    />
  ),
};
