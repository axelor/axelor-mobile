/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
  ChartRender,
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

    const testChart = (component, lineIdx, graphIdx, chart) => {
      const chartComponent = wrapper
        .find('View')
        .at(lineIdx)
        .dive()
        .find(ChartRender)
        .at(graphIdx)
        .dive();

      expect(chartComponent.exists()).toBe(true);
      expect(chartComponent.find(component).exists()).toBe(true);
      if (chart.type === chartType.donut) {
        expect(chartComponent.find(component).prop('donut')).toBe(true);
      }
      expect(chartComponent.find(component).prop('title')).toBe(chart.title);
      expect(chartComponent.find(component).prop('datasets')).toBe(
        chart.type === chartType.pie || chart.type === chartType.donut
          ? chart.dataList[0]
          : chart.dataList,
      );
    };

    props.lineList.forEach((line, lineIdx) => {
      line.graphList.forEach((graph, index) => {
        switch (graph.type) {
          case chartType.bar:
            testChart(BarChart, lineIdx, index, graph);
            break;
          case chartType.line:
            testChart(LineChart, lineIdx, index, graph);
            break;
          case chartType.pie:
          case chartType.donut:
            testChart(PieChart, lineIdx, index, graph);
            break;
          default:
            console.warn(
              `Chart type provided with value ${graph.type} is not supported`,
            );
            break;
        }
      });
    });
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(<Dashboard {...props} style={customStyle} />);

    expect(getGlobalStyles(wrapper.find(ScrollView))).toMatchObject(
      customStyle,
    );
  });
});
