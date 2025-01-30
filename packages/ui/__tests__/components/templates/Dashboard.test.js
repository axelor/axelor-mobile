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
import {shallow} from 'enzyme';
import {
  BarChart,
  Dashboard,
  LineChart,
  PieChart,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('Dashboard Component', () => {
  const chartType = {
    bar: 'bar',
    pie: 'pie',
    line: 'line',
    donut: 'donut',
  };

  const props = {
    lineList: [
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
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Dashboard {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render the charts defined in lineList with the right props', () => {
    const wrapper = shallow(<Dashboard {...props} />);

    const testChart = (chartComponent, idx, chart) => {
      expect(wrapper.find(chartComponent).at(idx).exists()).toBe(true);
      if (chart.type === chartType.donut) {
        expect(wrapper.find(chartComponent).at(idx).prop('donut')).toBe(true);
      }
      expect(wrapper.find(chartComponent).at(idx).prop('title')).toBe(
        chart.title,
      );
      expect(wrapper.find(chartComponent).at(idx).prop('datasets')).toBe(
        chart.type === chartType.pie || chart.type === chartType.donut
          ? chart.dataList[0]
          : chart.dataList,
      );
    };

    let barChartIdx = 0;
    let lineChartIdx = 0;
    let pieChartIdx = 0;
    props.lineList.forEach(line =>
      line.graphList.forEach(graph => {
        switch (graph.type) {
          case chartType.bar:
            testChart(BarChart, barChartIdx, graph);
            barChartIdx++;
            break;
          case chartType.line:
            testChart(LineChart, lineChartIdx, graph);
            lineChartIdx++;
            break;
          case chartType.pie:
          case chartType.donut:
            testChart(PieChart, pieChartIdx, graph);
            pieChartIdx++;
            break;
          default:
            console.warn(
              `Chart type provided with value ${graph.type} is not supported`,
            );
            break;
        }
      }),
    );
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<Dashboard {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(ScrollView))).toMatchObject(
      customStyle,
    );
  });
});
