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

import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ScrollView, Text} from '../../atoms';
import Chart from './chart-type';
import {
  Data,
  Max_Number_Graph_Line as MAX_GRAPH_PER_LINE,
} from './dashboard.helper';
import {BarChart, LineChart, PieChart} from './Chart';

interface Graph {
  type: keyof typeof Chart.chartType;
  dataList: Data[][];
  title?: string;
}

interface Line {
  graphList: Graph[];
}

interface DashboardProps {
  style?: any;
  lineList: Line[];
  hideCardBackground?: boolean;
  lastUpdated?: Date;
  translator?: (translationKey: string) => string;
}

const getGraphWidth = (nbGraphInLine: number) => {
  if (nbGraphInLine === 1) {
    return Dimensions.get('window').width;
  } else if (Dimensions.get('window').width < 500) {
    return Dimensions.get('window').width / 2;
  } else {
    return Dimensions.get('window').width / nbGraphInLine;
  }
};

const BarChartRender = (
  datasets,
  key,
  title,
  widthGraph,
  hideCardBackground,
) => {
  return (
    <BarChart
      key={key}
      title={title}
      datasets={datasets}
      widthGraph={widthGraph}
      hideCardBackground={hideCardBackground}
    />
  );
};

const LineChartRender = (
  datasets,
  key,
  title,
  widthGraph,
  hideCardBackground,
) => {
  return (
    <LineChart
      key={key}
      title={title}
      datasets={datasets}
      widthGraph={widthGraph}
      hideCardBackground={hideCardBackground}
    />
  );
};

const PieChartRender = (datasets, key, title, widthGraph, type) => {
  return (
    <PieChart
      key={key}
      title={title}
      datasets={datasets[0]}
      widthGraph={widthGraph}
      donut={type === Chart.chartType.donut}
    />
  );
};

const renderChart = (graph, indexGraph, nbGraphInLine, hideCardBackground) => {
  const {dataList, title, type} = graph;
  const widthGraph = getGraphWidth(nbGraphInLine);

  switch (type) {
    case Chart.chartType.bar:
      return BarChartRender(
        dataList,
        indexGraph,
        title,
        widthGraph,
        hideCardBackground,
      );

    case Chart.chartType.pie:
    case Chart.chartType.donut:
      return PieChartRender(dataList, indexGraph, title, widthGraph, type);

    case Chart.chartType.line:
      return LineChartRender(
        dataList,
        indexGraph,
        title,
        widthGraph,
        hideCardBackground,
      );

    default:
      return null;
  }
};

const Dashboard = ({
  style,
  lineList,
  hideCardBackground = false,
  translator,
  lastUpdated,
}: DashboardProps) => {
  return (
    <ScrollView style={[styles.container, style]}>
      {lineList?.map((line, indexLine) => {
        const validGraphs = line.graphList.filter(
          graph => graph.dataList?.[0]?.length > 0,
        );
        const nbGraphInLine = Math.min(validGraphs.length, MAX_GRAPH_PER_LINE);

        const limitedGraphList = line.graphList?.slice(0, MAX_GRAPH_PER_LINE);

        return (
          <View style={styles.lineContainer} key={indexLine}>
            {limitedGraphList?.map((graph, indexGraph) => {
              if (graph.dataList?.[0]?.length > 0) {
                return renderChart(
                  graph,
                  indexGraph,
                  nbGraphInLine,
                  hideCardBackground,
                );
              }
              return null;
            })}
          </View>
        );
      })}
      <View style={styles.dateContainer}>
        <Text>
          {`${translator('Base_LastUpdate')}: ${lastUpdated.toLocaleString()}`}
        </Text>
      </View>
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
  dateContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Dashboard;
