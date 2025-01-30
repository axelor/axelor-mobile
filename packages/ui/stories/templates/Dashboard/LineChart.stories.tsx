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
import {LineChart} from '../../../src/components/templates';
import {lightTheme} from '../../../src/theme';

const datasets = [
  [
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
  ],
  [
    {
      label: 'T0001 - APOLLO',
      value: 14,
    },
    {
      label: 'T0002 - MICHEL Loic',
      value: 10,
    },
    {
      label: 'Loic',
      value: 6,
    },
    {
      label: 'Michel',
      value: 10,
    },
    {
      label: 'Jean',
      value: 14,
    },
  ],
];

storiesOf('ui/templates/Dashboard/LineChart', module)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive',
    },
  })
  .add(
    'Default',
    args => {
      return (
        <LineChart
          datasets={datasets}
          backgroundColor={lightTheme.colors[args.color]?.background}
          {...args}
        />
      );
    },
    {
      argTypes: {
        widthGraph: {
          control: {type: 'number'},
          defaultValue: 400,
        },
        spacing: {
          control: {type: 'number'},
          defaultValue: 50,
        },
        title: {
          control: 'text',
          defaultValue: 'title',
        },
        color: {
          options: Object.entries(lightTheme.colors)
            .filter(([, _color]) => typeof _color !== 'string')
            .map(([key]) => key),
          defaultValue: 'plannedColor',
          control: {
            type: 'select',
          },
        },
      },
    },
  );
