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
import {Dimensions} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {Screen} from '../../../src/components/atoms';
import {Dashboard} from '../../../src/components/templates';
import Chart from '../../../src/components/templates/Dashboard/chart-type';

storiesOf('ui/templates/Dashboard/Dashboard', module)
  .addParameters({
    viewport: {
      defaultViewport: 'responsive',
    },
  })
  .add(
    'Default',
    args => {
      return (
        <Screen style={{width: Dimensions.get('window').width}}>
          <Dashboard lineList={createDashboardConfig(args)} />
        </Screen>
      );
    },
    {
      argTypes: {
        line1_graph1_type: {
          options: Object.keys(Chart.chartType),
          defaultValue: 'bar',
          control: {
            type: 'select',
          },
        },
        line1_graph1_title: {
          control: 'text',
          defaultValue: 'Title',
        },
        line1_graph1_isDisplay: {
          control: 'boolean',
          defaultValue: true,
        },
        line1_graph2_type: {
          options: Object.keys(Chart.chartType),
          defaultValue: 'pie',
          control: {
            type: 'select',
          },
        },
        line1_graph2_title: {
          control: 'text',
          defaultValue: 'Title',
        },
        line1_graph2_isDisplay: {
          control: 'boolean',
          defaultValue: true,
        },
        line1_graph3_type: {
          options: Object.keys(Chart.chartType),
          defaultValue: 'bar',
          control: {
            type: 'select',
          },
        },
        line1_graph3_title: {
          control: 'text',
          defaultValue: 'Title',
        },
        line1_graph3_isDisplay: {
          control: 'boolean',
          defaultValue: false,
        },
        line1_graph4_type: {
          options: Object.keys(Chart.chartType),
          defaultValue: 'line',
          control: {
            type: 'select',
          },
        },
        line1_graph4_title: {
          control: 'text',
          defaultValue: 'Title',
        },
        line1_graph4_isDisplay: {
          control: 'boolean',
          defaultValue: true,
        },
        line2_graph1_type: {
          options: Object.keys(Chart.chartType),
          defaultValue: 'bar',
          control: {
            type: 'select',
          },
        },
        line2_graph1_title: {
          control: 'text',
          defaultValue: 'Title',
        },
        line2_graph1_isDisplay: {
          control: 'boolean',
          defaultValue: true,
        },
        line2_graph2_type: {
          options: Object.keys(Chart.chartType),
          defaultValue: 'line',
          control: {
            type: 'select',
          },
        },
        line2_graph2_title: {
          control: 'text',
          defaultValue: 'Title',
        },
        line2_graph2_isDisplay: {
          control: 'boolean',
          defaultValue: true,
        },
        line2_graph3_type: {
          options: Object.keys(Chart.chartType),
          defaultValue: 'pie',
          control: {
            type: 'select',
          },
        },
        line2_graph3_title: {
          control: 'text',
          defaultValue: 'Title',
        },
        line2_graph3_isDisplay: {
          control: 'boolean',
          defaultValue: true,
        },
        line2_graph4_type: {
          options: Object.keys(Chart.chartType),
          defaultValue: 'donut',
          control: {
            type: 'select',
          },
        },
        line2_graph4_title: {
          control: 'text',
          defaultValue: 'Title',
        },
        line2_graph4_isDisplay: {
          control: 'boolean',
          defaultValue: true,
        },
      },
    },
  );

const DEFAULT_DATASET = [
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

const createDashboardConfig = args => {
  const NUMBER_PROPS_PER_GRAPH = 3;
  const NUMBER_GRAPH_PER_LINE = 4;
  const lines = [];

  for (
    let lineIndex = 1;
    lineIndex <=
    Object.keys(args).length / (NUMBER_PROPS_PER_GRAPH * NUMBER_GRAPH_PER_LINE);
    lineIndex++
  ) {
    const graphs = [];

    for (
      let graphIndex = 1;
      graphIndex <= NUMBER_GRAPH_PER_LINE;
      graphIndex++
    ) {
      const keyStart = `line${lineIndex}_graph${graphIndex}_`;

      if (args[`${keyStart}isDisplay`]) {
        graphs.push({
          title: args[`${keyStart}title`],
          type: args[`${keyStart}type`],
          dataList: DEFAULT_DATASET,
        });
      }
    }

    if (graphs.length > 0) {
      lines.push({graphList: graphs});
    }
  }

  return lines;
};
