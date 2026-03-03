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
import {Checkbox as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/Checkbox',
  component: Component,
};

export default meta;

export const Checkbox: Story<typeof Component> = {
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
