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
import {Dashboard} from '../../../src/components/templates';
import {Dimensions} from 'react-native';
import {Screen} from '../../../src/components/atoms';

storiesOf('ui/templates/Dashboard/Dashboard', module).add(
  'Default',
  args => {
    const selectedDataset = datasets[args.selectedDataset];
    return (
      <Screen style={{width: Dimensions.get('window').width}}>
        <Dashboard lineList={selectedDataset} />
      </Screen>
    );
  },
  {
    argTypes: {
      selectedDataset: {
        options: ['Example 1', 'Example 2', 'Example 3'],
        defaultValue: 'Example 1',
        control: {
          type: 'select',
        },
      },
    },
  },
);

const datasets = {
  'Example 1': [
    {
      graphList: [
        {
          type: 'line',
          title: 'Number of SO by status',
          dataList: [
            [
              {
                label: 'Canceled',
                value: 1,
              },
              {
                label: 'Draft quotation',
                value: 2,
              },
            ],
            [
              {
                label: 'Canceled',
                value: 3,
              },
              {
                label: 'Draft quotation',
                value: 5,
              },
            ],
          ],
        },
        {
          type: 'bar',
          title: 'Sale order count by partner',
          dataList: [
            [
              {
                label: 'T0001 - APOLLO',
                value: 1,
              },
              {
                label: 'T0002 - MICHEL Loic',
                value: 2,
              },
            ],
            [
              {
                label: 'T0001 - APOLLO',
                value: 3,
              },
              {
                label: 'T0002 - MICHEL Loic',
                value: 5,
              },
            ],
          ],
        },
      ],
    },
    {
      graphList: [
        {
          type: 'pie',
          title: 'Number of SO by status',
          dataList: [
            [
              {
                label: 'Canceled',
                value: 0,
              },
              {
                label: 'Draft quotation',
                value: 1,
              },
            ],
          ],
        },
        {
          type: 'donut',
          title: 'Sale order count by partner',
          dataList: [
            [
              {
                label: 'T0001 - APOLLO',
                value: 1,
              },
              {
                label: 'T0002 - MICHEL Loic',
                value: 2,
              },
            ],
          ],
        },
      ],
    },
  ],
  'Example 2': [
    {
      graphList: [
        {
          type: 'line',
          title: 'Number of SO by status',
          dataList: [
            [
              {
                label: 'Canceled',
                value: 1,
              },
              {
                label: 'Draft quotation',
                value: 2,
              },
            ],
            [
              {
                label: 'Canceled',
                value: 3,
              },
              {
                label: 'Draft quotation',
                value: 5,
              },
            ],
          ],
        },
      ],
    },
  ],
  'Example 3': [
    {
      graphList: [
        {
          type: 'line',
          title: 'Number of SO by status',
          dataList: [
            [
              {
                label: 'Canceled',
                value: 1,
              },
              {
                label: 'Draft quotation',
                value: 2,
              },
            ],
            [
              {
                label: 'Canceled',
                value: 3,
              },
              {
                label: 'Draft quotation',
                value: 5,
              },
            ],
          ],
        },
        {
          type: 'line',
          title: 'Number of SO by status',
          dataList: [
            [
              {
                label: 'Canceled',
                value: 1,
              },
              {
                label: 'Draft quotation',
                value: 2,
              },
            ],
            [
              {
                label: 'Canceled',
                value: 3,
              },
              {
                label: 'Draft quotation',
                value: 5,
              },
            ],
          ],
        },
        {
          type: 'bar',
          title: 'Sale order count by partner',
          dataList: [
            [
              {
                label: 'T0001 - APOLLO',
                value: 1,
              },
              {
                label: 'T0002 - MICHEL Loic',
                value: 2,
              },
            ],
            [
              {
                label: 'T0001 - APOLLO',
                value: 3,
              },
              {
                label: 'T0002 - MICHEL Loic',
                value: 5,
              },
            ],
          ],
        },
        {
          type: 'bar',
          title: 'Sale order count by partner',
          dataList: [
            [
              {
                label: 'T0001 - APOLLO',
                value: 1,
              },
              {
                label: 'T0002 - MICHEL Loic',
                value: 2,
              },
            ],
            [
              {
                label: 'T0001 - APOLLO',
                value: 3,
              },
              {
                label: 'T0002 - MICHEL Loic',
                value: 5,
              },
            ],
          ],
        },
      ],
    },
    {
      graphList: [
        {
          type: 'line',
          title: 'Number of SO by status',
          dataList: [
            [
              {
                label: 'Canceled',
                value: 1,
              },
              {
                label: 'Draft quotation',
                value: 2,
              },
            ],
            [
              {
                label: 'Canceled',
                value: 3,
              },
              {
                label: 'Draft quotation',
                value: 5,
              },
            ],
          ],
        },
        {
          type: 'bar',
          title: 'Sale order count by partner',
          dataList: [
            [
              {
                label: 'T0001 - APOLLO',
                value: 1,
              },
              {
                label: 'T0002 - MICHEL Loic',
                value: 2,
              },
            ],
            [
              {
                label: 'T0001 - APOLLO',
                value: 3,
              },
              {
                label: 'T0002 - MICHEL Loic',
                value: 5,
              },
            ],
          ],
        },
        {
          type: 'bar',
          title: 'Sale order count by partner',
          dataList: [
            [
              {
                label: 'T0001 - APOLLO',
                value: 1,
              },
              {
                label: 'T0002 - MICHEL Loic',
                value: 2,
              },
            ],
            [
              {
                label: 'T0001 - APOLLO',
                value: 3,
              },
              {
                label: 'T0002 - MICHEL Loic',
                value: 5,
              },
            ],
          ],
        },
      ],
    },
    {
      graphList: [
        {
          type: 'pie',
          title: 'Number of SO by status',
          dataList: [
            [
              {
                label: 'Canceled',
                value: 0,
              },
              {
                label: 'Draft quotation',
                value: 1,
              },
            ],
          ],
        },
        {
          type: 'donut',
          title: 'Sale order count by partner',
          dataList: [
            [
              {
                label: 'T0001 - APOLLO',
                value: 1,
              },
              {
                label: 'T0002 - MICHEL Loic',
                value: 2,
              },
            ],
          ],
        },
      ],
    },
  ],
};
