/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {storiesOf} from '@storybook/react-native';
import {PieChart} from '../../../src/components/templates';

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

storiesOf('ui/templates/Dashboard/PieChart', module)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive',
    },
  })
  .add(
    'Default',
    args => {
      return <PieChart datasets={datasets} {...args} />;
    },
    {
      argTypes: {
        widthGraph: {
          control: {type: 'number'},
          defaultValue: 425,
        },
        radius: {
          control: {type: 'number'},
          defaultValue: 90,
        },
        innerRadius: {
          control: {type: 'number'},
          defaultValue: 60,
        },
        legend: {
          control: {type: 'boolean'},
          defaultValue: false,
        },
        donut: {
          control: {type: 'boolean'},
          defaultValue: false,
        },
        showGradient: {
          control: {type: 'boolean'},
          defaultValue: false,
        },
        title: {
          control: 'text',
          defaultValue: 'Title',
        },
      },
    },
  );
