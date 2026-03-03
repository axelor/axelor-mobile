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
import {IndicatorChart as Component} from '../../../src/components';
import {
  colorPicker,
  disabledControl,
  Story,
} from '../../utils/control-type.helpers';

const datasets = [
  {
    title: 'Revenue',
    value: 1500,
    unit: '€',
    icon: 'currency-dollar',
    color: 'green',
  },
  {
    title: 'Expenses',
    value: 200,
    unit: '€',
    icon: 'receipt',
    color: 'red',
  },
  {
    title: 'Profit',
    value: 10,
    unit: '€',
    icon: 'graph-up-arrow',
    color: 'blue',
  },
];

const meta: Meta<typeof Component> = {
  title: 'ui/templates/Dashboard/IndicatorChart',
  component: Component,
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export default meta;

export const IndicatorChart: Story<typeof Component> = {
  args: {
    title: 'Financial Overview',
    widthGraph: 350,
    hideCardBackground: false,
    singleIndicator: false,
    display_icon: true,
    indicator_color: 'primaryColor',
  },
  argTypes: {
    display_icon: {
      control: 'boolean',
      if: {arg: 'singleIndicator', truthy: true},
    },
    indicator_color: {
      ...colorPicker,
      if: {arg: 'singleIndicator', truthy: true},
    },
    style: disabledControl,
    datasets: disabledControl,
  },
  render: (args: any) => (
    <Component
      {...args}
      datasets={
        args.singleIndicator
          ? [
              {
                ...datasets[0],
                icon: args.display_icon ? 'currency-dollar' : null,
                color: args.indicator_color?.background,
              },
            ]
          : datasets
      }
    />
  ),
};
