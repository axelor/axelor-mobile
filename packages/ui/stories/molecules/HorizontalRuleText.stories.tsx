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
import {HorizontalRuleText as Component} from '../../src/components/molecules';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/molecules/HorizontalRuleText',
  component: Component,
};

export default meta;

export const HorizontalRuleText: Story<typeof Component> = {
  args: {
    text: 'Hello',
    color: 'secondaryColor',
  },
  argTypes: {
    style: disabledControl,
    lineStyle: disabledControl,
    textStyle: disabledControl,
    color: colorPicker,
  },
  render: args => <Component {...args} color={args.color?.background_light} />,
};
