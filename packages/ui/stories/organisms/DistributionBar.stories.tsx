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
import {DistributionBar as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/DistributionBar',
  component: Component,
};

export default meta;

export const DistributionBar: Story<typeof Component> = {
  args: {
    total: 10,
    height: 30,
    group1_value: 3,
    group1_color: 'errorColor',
    group2_value: 3,
    group2_color: 'primaryColor',
    group3_value: 3,
    group3_color: 'progressColor',
  },
  argTypes: {
    group1_color: colorPicker,
    group2_color: colorPicker,
    group3_color: colorPicker,
    distribution: disabledControl,
  },
  render: args => (
    <Component
      {...args}
      distribution={[
        {
          value: args.group1_value,
          color: args.group1_color,
        },
        {
          value: args.group2_value,
          color: args.group2_color,
        },
        {
          value: args.group3_value,
          color: args.group3_color,
        },
      ]}
    />
  ),
};
