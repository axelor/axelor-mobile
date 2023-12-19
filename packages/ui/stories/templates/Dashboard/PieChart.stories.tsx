/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

storiesOf('ui/templates/Dashboard/PieChart', module).add(
  'Default',
  args => {
    return <PieChart datasets={datasets} {...args} />;
  },
  {
    argTypes: {
      widthGraph: {
        control: {type: 'number'},
      },
      radius: {
        control: {type: 'number'},
      },
      innerRadius: {
        control: {type: 'number'},
      },
      spacing: {
        control: {type: 'number'},
        defaultValue: 50,
      },
      legend: {
        control: {type: 'boolean'},
        defaultValue: true,
      },
      donut: {
        control: {type: 'boolean'},
      },
      showGradient: {
        control: {type: 'boolean'},
      },
      sectionAutoFocus: {
        control: {type: 'boolean'},
      },
      focusOnPress: {
        control: {type: 'boolean'},
        defaultValue: false,
      },
      title: {
        control: 'text',
      },
    },
  },
);
