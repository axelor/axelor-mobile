import React from 'react';
import {Dimensions} from 'react-native';
import Chart from '../chart-type';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart/PieChart';
import IndicatorChart from './IndicatorChart/IndicatorChart';
import {Data} from '../dashboard.helper';

const BarChartRender = (datasets, title, widthGraph, hideCardBackground) => {
  return (
    <BarChart
      title={title}
      datasets={datasets}
      widthGraph={widthGraph}
      hideCardBackground={hideCardBackground}
    />
  );
};

const LineChartRender = (datasets, title, widthGraph, hideCardBackground) => {
  return (
    <LineChart
      title={title}
      datasets={datasets}
      widthGraph={widthGraph}
      hideCardBackground={hideCardBackground}
    />
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

const IndicatorChartRender = (
  datasets,
  title,
  widthGraph,
  hideCardBackground,
) => {
  return (
    <IndicatorChart
      title={title}
      datasets={datasets}
      widthGraph={widthGraph}
      hideCardBackground={hideCardBackground}
    />
  );
};

const ChartRender = ({
  dataList,
  title,
  type,
  widthGraph = Dimensions.get('window').width,
  hideCardBackground = false,
}: {
  dataList: Data[][];
  title: string;
  type: string;
  widthGraph?: number;
  hideCardBackground?: boolean;
}) => {
  switch (type) {
    case Chart.chartType.bar:
      return BarChartRender(dataList, title, widthGraph, hideCardBackground);
    case Chart.chartType.line:
      return LineChartRender(dataList, title, widthGraph, hideCardBackground);
    case Chart.chartType.pie:
    case Chart.chartType.donut:
      return PieChartRender(dataList, title, widthGraph, type);
    case Chart.chartType.indicator:
      return IndicatorChartRender(
        dataList,
        title,
        widthGraph,
        hideCardBackground,
      );
    default:
      return null;
  }
};

export default ChartRender;
