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
import {Dimensions} from 'react-native';
import Chart from '../chart-type';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart/PieChart';
import {Data} from '../dashboard.helper';

const BarChartRender = (datasets, title, widthGraph) => {
  return <BarChart title={title} datasets={datasets} widthGraph={widthGraph} />;
};

const LineChartRender = (datasets, title, widthGraph) => {
  return (
    <LineChart title={title} datasets={datasets} widthGraph={widthGraph} />
  );
};

const PieChartRender = (datasets, title, widthGraph, type) => {
  return (
    <PieChart
      title={title}
      datasets={datasets[0]}
      widthGraph={widthGraph}
      donut={type === Chart.chartType.donut}
    />
  );
};

const ChartRender = ({
  dataList,
  title,
  type,
  widthGraph = Dimensions.get('window').width,
}: {
  dataList: Data[][];
  title: string;
  type: string;
  widthGraph?: number;
}) => {
  switch (type) {
    case Chart.chartType.bar:
      return BarChartRender(dataList, title, widthGraph);
    case Chart.chartType.line:
      return LineChartRender(dataList, title, widthGraph);
    case Chart.chartType.pie:
    case Chart.chartType.donut:
      return PieChartRender(dataList, title, widthGraph, type);
    default:
      return null;
  }
};

export default ChartRender;
