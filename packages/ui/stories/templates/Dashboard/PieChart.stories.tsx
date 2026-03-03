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
import {PieChart as Component} from '../../../src/components';
import {disabledControl, Story} from '../../utils/control-type.helpers';

const datasets = [
  {
    label: 'T0001 - APOLLO',
    value: 14,
  },
  {
    label: 'T0002 - MICHEL Loic',
    value: 18,
  },
  {
    label: 'Loic',
    value: 15,
  },
  {
    label: 'Michel',
    value: 18,
  },
  {
    label: 'Jean',
    value: 14,
  },
];

const meta: Meta<typeof Component> = {
  title: 'ui/templates/Dashboard/PieChart',
  component: Component,
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export default meta;

export const PieChart: Story<typeof Component> = {
  args: {
    title: 'Chart title',
    legend: false,
    donut: false,
    widthGraph: 350,
    radius: 90,
    innerRadius: 60,
    showGradient: false,
  },
  argTypes: {
    sectionAutoFocus: disabledControl,
    focusOnPress: disabledControl,
    datasets: disabledControl,
  },
  render: args => <Component datasets={datasets} {...args} />,
};
