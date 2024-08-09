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
import type {StoryObj, Meta} from '@storybook/react';
import {Checkbox as Component} from '../../src/components';
import {colorPicker, disabledControl} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/Checkbox',
  component: Component,
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Checkbox: Story = {
  args: {
    title: 'Check me',
    isDefaultChecked: false,
    isDefaultPartialChecked: false,
    disabled: false,
    iconSize: 20,
    iconColor: 'primaryColor',
  },
  argTypes: {
    iconColor: colorPicker,
    onChange: disabledControl,
  },
  render: args => (
    <Component {...args} iconColor={args.iconColor?.background} />
  ),
};
