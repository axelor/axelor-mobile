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
import {ToggleButton as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/ToggleButton',
  component: Component,
};

export default meta;

export const ToggleButton: Story<typeof Component> = {
  args: {
    isActive: false,
    isNeutralBackground: true,
    activeColor: 'primaryColor',
    inactiveColor: 'secondaryColor',
    button_iconName: 'car-front',
    button_title: 'Press me',
    button_width: 300,
    button_disabled: false,
  },
  argTypes: {
    activeColor: colorPicker,
    inactiveColor: colorPicker,
    buttonConfig: disabledControl,
    onPress: disabledControl,
  },
  render: args => (
    <Component
      {...args}
      buttonConfig={{
        title: args.button_title,
        iconName: args.button_iconName,
        disabled: args.button_disabled,
        width: args.button_width,
      }}
    />
  ),
};
