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
import {Dimensions} from 'react-native';
import type {Meta} from '@storybook/react';
import {Dashboard as Component, Screen} from '../../../src/components';
import {
  chartTypePicker,
  disabledControl,
  Story,
} from '../../utils/control-type.helpers';

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
          dataList: [
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
          ],
        });
      }
    }

    if (graphs.length > 0) {
      lines.push({graphList: graphs});
    }
  }

  return lines;
};

const meta: Meta<typeof Component> = {
  title: 'ui/templates/Dashboard/Dashboard',
  component: Component,
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export default meta;

export const Dashboard: Story<typeof Component> = {
  args: {
    hideCardBackground: false,
    line1_graph1_type: 'bar',
    line1_graph1_title: 'Title',
    line1_graph1_isDisplay: true,
    line1_graph2_type: 'pie',
    line1_graph2_title: 'Title',
    line1_graph2_isDisplay: true,
    line1_graph3_type: 'bar',
    line1_graph3_title: 'Title',
    line1_graph3_isDisplay: true,
    line1_graph4_type: 'line',
    line1_graph4_title: 'Title',
    line1_graph4_isDisplay: true,
    line2_graph1_type: 'bar',
    line2_graph1_title: 'Title',
    line2_graph1_isDisplay: true,
    line2_graph2_type: 'line',
    line2_graph2_title: 'Title',
    line2_graph2_isDisplay: true,
    line2_graph3_type: 'pie',
    line2_graph3_title: 'Title',
    line2_graph3_isDisplay: true,
    line2_graph4_type: 'donut',
    line2_graph4_title: 'Title',
    line2_graph4_isDisplay: true,
  },
  argTypes: {
    line1_graph1_type: chartTypePicker,
    line1_graph2_type: chartTypePicker,
    line1_graph3_type: chartTypePicker,
    line1_graph4_type: chartTypePicker,
    line2_graph1_type: chartTypePicker,
    line2_graph2_type: chartTypePicker,
    line2_graph3_type: chartTypePicker,
    line2_graph4_type: chartTypePicker,
    lineList: disabledControl,
    lastUpdate: disabledControl,
    translator: disabledControl,
    displayLastUpdate: disabledControl,
  },
  render: args => (
    <Screen style={{width: Dimensions.get('window').width}}>
      <Component lineList={createDashboardConfig(args)} {...args} />
    </Screen>
  ),
};
