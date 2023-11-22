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
import BarChartDashboard from '../BarChartDashboard/BarChartDashboard';
import LineChartDashboard from '../LineChartDashboard/LineChartDashboard';
import PieChartDashboard from '../PieChartDashboard/PieChartDashboard';
import {Data, Max_Number_Graph_Line} from '../types/chart';

interface Graph {
  type: 'pie' | 'bar' | 'line';
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
    <LineChartDashboard
      datasets={datasets}
      key={key}
      style={style}
      widthGraph={width}
      title={title}
    />
  );
};

const PieChartRender = (datasets, key, title) => {
  return <PieChartDashboard datasets={datasets[0]} key={key} title={title} />;
};

const BarChartDashboardRender = (datasets, key, nbGraphInLine, title) => {
  const {style, width} = styleGraph(nbGraphInLine);
  return (
    <BarChartDashboard
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
              const title = graph?.title;

              switch (graph?.type) {
                case 'bar':
                  return BarChartDashboardRender(
                    graph.dataList,
                    indexGraph,
                    nbGraphInLine,
                    title,
                  );
                case 'pie':
                  return PieChartRender(graph.dataList, indexGraph, title);
                case 'line':
                  return LineChartDashboardRender(
                    graph.dataList,
                    indexGraph,
                    nbGraphInLine,
                    title,
                  );
                default:
                  return null;
              }
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
