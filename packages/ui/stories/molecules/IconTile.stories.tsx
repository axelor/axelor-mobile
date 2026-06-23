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

import type {Meta} from '@storybook/react';
import {IconTile as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/IconTile',
  component: Component,
};

export default meta;

export const IconTile: Story<typeof Component> = {
  args: {
    icon: 'heart-fill',
    color: 'primaryColor',
    iconSize: 18,
    size: 40,
    padding: 10,
    borderRadius: 12,
    disabled: false,
  },
  argTypes: {
    color: colorPicker,
    iconSize: {control: {type: 'number', min: 10, max: 40}},
    size: {control: {type: 'number', min: 20, max: 80}},
    padding: {control: {type: 'number', min: 0, max: 24}},
    borderRadius: {control: {type: 'number', min: 0, max: 40}},
    onPress: disabledControl,
  },
};
