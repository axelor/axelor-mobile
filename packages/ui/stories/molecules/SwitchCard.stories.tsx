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
import {SwitchCard as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/SwitchCard',
  component: Component,
};

export default meta;

export const SwitchCard: Story<typeof Component> = {
  args: {
    title: 'Title',
    defaultValue: true,
    readonly: false,
    numberOfLines: 2,
    textSize: 14,
  },
  argTypes: {
    numberOfLines: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
        step: 1,
      },
    },
    textSize: {
      control: {
        type: 'number',
        min: 10,
        max: 50,
        step: 1,
      },
    },
    textColor: colorPicker,
    onToggle: disabledControl,
  },
  render: args => (
    <Component {...args} textColor={args.textColor?.background} />
  ),
};
