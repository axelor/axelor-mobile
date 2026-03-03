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
import {ProgressBar as Component} from '../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../utils/control-type.helpers';

const meta: Meta<typeof Component> = {
  title: 'ui/organisms/ProgressBar',
  component: Component,
};

export default meta;

export const ProgressBar: Story<typeof Component> = {
  args: {
    value: 50,
    total: 100,
    showPercent: true,
    centeredPercent: false,
    stripe: true,
    stripeDuration: 8000,
    stripeWidth: 10,
    height: 30,
    part1_color: 'errorColor',
    part1_start: 0,
    part2_color: 'cautionColor',
    part2_start: 25,
    part3_color: 'progressColor',
    part3_start: 50,
    part4_color: 'priorityColor',
    part4_start: 75,
    part5_color: 'successColor',
    part5_start: 100,
  },
  argTypes: {
    part1_color: colorPicker,
    part2_color: colorPicker,
    part3_color: colorPicker,
    part4_color: colorPicker,
    part5_color: colorPicker,
    colorRepartition: disabledControl,
  },
  render: args => (
    <Component
      {...args}
      colorRepartition={{
        [args.part1_start]: args.part1_color,
        [args.part2_start]: args.part2_color,
        [args.part3_start]: args.part3_color,
        [args.part4_start]: args.part4_color,
        [args.part5_start]: args.part5_color,
      }}
    />
  ),
};
