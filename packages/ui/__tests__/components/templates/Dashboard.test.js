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
import {Dashboard} from '@axelor/aos-mobile-ui';
import {getTestIdStyles, setup} from '../../tools';

jest.mock(
  '../../../lib/components/templates/Dashboard/Chart/ChartRender',
  () => {
    const {View} = require('react-native');

    return graph => <View testID={`graph${graph.title}-${graph.type}`} />;
  },
);

describe('Dashboard Component', () => {
  const setupDashboard = overrideProps =>
    setup({
      Component: Dashboard,
      baseProps: {
        lineList: [
          {
            graphList: [
              {
                type: 'line',
                title: 'Number of SO by status',
                dataList: [
                  [
                    {label: 'Canceled', value: 1},
                    {label: 'Draft quotation', value: 2},
                  ],
                  [
                    {label: 'Canceled', value: 3},
                    {label: 'Draft quotation', value: 5},
                  ],
                ],
              },
              {
                type: 'bar',
                title: 'Sale order count by partner',
                dataList: [
                  [
                    {label: 'T0001 - APOLLO', value: 1},
                    {label: 'T0002 - MICHEL Loic', value: 2},
                  ],
                  [
                    {label: 'T0001 - APOLLO', value: 3},
                    {label: 'T0002 - MICHEL Loic', value: 5},
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
                    {label: 'Canceled', value: 0},
                    {label: 'Draft quotation', value: 1},
                  ],
                ],
              },
              {
                type: 'donut',
                title: 'Sale order count by partner',
                dataList: [
                  [
                    {label: 'T0001 - APOLLO', value: 1},
                    {label: 'T0002 - MICHEL Loic', value: 2},
                  ],
                ],
              },
            ],
          },
        ],
      },
      overrideProps,
    });

  it('should render without crashing', () => {
    const {getByTestId} = setupDashboard();

    expect(getByTestId('scrollViewContainer')).toBeTruthy();
  });

  it('should render the charts defined in lineList with the right props', () => {
    const {getByTestId, props} = setupDashboard();

    props.lineList.forEach(line => {
      line.graphList.forEach(graph => {
        expect(getByTestId(`graph${graph.title}-${graph.type}`)).toBeTruthy();
      });
    });
  });

  it('should apply custom style when provided', () => {
    const {props} = setupDashboard({style: {width: 200}});

    expect(
      getTestIdStyles('scrollViewContainer', 'contentContainerStyle'),
    ).toMatchObject(props.style);
  });
});
