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
import {Dimensions, StyleSheet, View} from 'react-native';
import {ScrollView} from '../../atoms';
import Chart from './chart';
import {Data, Max_Number_Graph_Line} from './dashboard.helper';
import {BarChart, LineChart, PieChart} from './Chart';

interface Graph {
  type: 'pie' | 'bar' | 'line' | 'donut';
  dataList: Data[][];
  title?: string;
}

interface Line {
  graphList: Graph[];
}

interface DashboardProps {
  style?: any;
  lineList: Line[];
}

const styleGraph = (nbGraphInLine: number) => {
  let style = null;
  let width = null;

  if (nbGraphInLine === 1) {
    style = {width: Dimensions.get('window').width - 60};
    width = Dimensions.get('window').width - 160;
  } else if (Dimensions.get('window').width < 500 && nbGraphInLine !== 1) {
    style = {width: Dimensions.get('window').width / 2 - 15};
    width = Dimensions.get('window').width / 4;
  } else if (nbGraphInLine === 2) {
    style = {width: Dimensions.get('window').width / 2 - 60};
    width = Dimensions.get('window').width / 3 - 60;
  } else if (nbGraphInLine === 3) {
    style = {width: Dimensions.get('window').width / 3 - 60};
    width = Dimensions.get('window').width / 5 - 60;
  } else if (nbGraphInLine === 4) {
    style = {width: Dimensions.get('window').width / 4 - 20};
    width = Dimensions.get('window').width / 6 - 60;
  }
  return {style, width};
};

const LineChartDashboardRender = (datasets, key, nbGraphInLine, title) => {
  const {style, width} = styleGraph(nbGraphInLine);
  return (
    <LineChart
      datasets={datasets}
      key={key}
      style={style}
      widthGraph={width}
      title={title}
    />
  );
};

const PieChartRender = (datasets, key, title, type) => {
  return (
    <PieChart
      datasets={datasets[0]}
      key={key}
      title={title}
      donut={type === Chart.chartType.donut}
    />
  );
};

const renderChart = (graph, indexGraph, nbGraphInLine) => {
  const {dataList, title, type} = graph;

  switch (type) {
    case Chart.chartType.bar:
      return BarChartDashboardRender(
        dataList,
        indexGraph,
        nbGraphInLine,
        title,
      );

    case Chart.chartType.pie:
    case Chart.chartType.donut:
      return PieChartRender(dataList, indexGraph, title, type);

    case Chart.chartType.line:
      return LineChartDashboardRender(
        dataList,
        indexGraph,
        nbGraphInLine,
        title,
      );

    default:
      return null;
  }
};

const BarChartDashboardRender = (datasets, key, nbGraphInLine, title) => {
  const {style, width} = styleGraph(nbGraphInLine);
  return (
    <BarChart
      datasets={datasets}
      key={key}
      style={style}
      widthGraph={width}
      title={title}
    />
  );
};

const Dashboard = ({style, lineList}: DashboardProps) => {
  return (
    <ScrollView style={[styles.container, style]}>
      {lineList?.map((line, indexLine) => {
        const nbGraphInLine = Math.min(
          line.graphList?.length,
          Max_Number_Graph_Line,
        );
        const limitedGraphList = line.graphList?.slice(
          0,
          Max_Number_Graph_Line,
        );

        return (
          <View style={styles.lineContainer} key={indexLine}>
            {limitedGraphList?.map((graph, indexGraph) => {
              return renderChart(graph, indexGraph, nbGraphInLine);
            })}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: null,
  },
  lineContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default Dashboard;
