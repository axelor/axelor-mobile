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
import {Data} from '../types/chart';

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

const styleGraph = (nbGraphInLine: number, type: 'style' | 'width') => {
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

  return type === 'style' ? style : width;
};

const LineChartDashboardRender = (datasets, key, nbGraphInLine, title) => {
  return (
    <LineChartDashboard
      datasets={datasets}
      key={key}
      style={styleGraph(nbGraphInLine, 'style')}
      widthGraph={styleGraph(nbGraphInLine, 'width')}
      title={title}
    />
  );
};

const PieChartRender = (datasets, key) => {
  return <PieChartDashboard datasets={datasets} key={key} legend={true} />;
};

const BarChartDashboardRender = (datasets, key, nbGraphInLine, title) => {
  return (
    <BarChartDashboard
      datasets={datasets}
      key={key}
      style={styleGraph(nbGraphInLine, 'style')}
      widthGraph={styleGraph(nbGraphInLine, 'width')}
      title={title}
    />
  );
};

const Dashboard = ({style, lineList}: DashboardProps) => {
  return (
    <ScrollView style={[styles.container, style]}>
      {lineList?.map((line, indexLine) => {
        const nbGraphInLine =
          line.graphList?.length > 4 ? 4 : line.graphList?.length;
        return (
          <View style={styles.lineContainer} key={indexLine}>
            {line?.graphList.map((graph, indexGraph) => {
              const title = graph?.title;
              if (indexGraph > 4) {
                return null;
              }
              if (graph?.type === 'bar') {
                return BarChartDashboardRender(
                  graph.dataList,
                  indexGraph,
                  nbGraphInLine,
                  title,
                );
              }
              if (graph?.type === 'pie') {
                return PieChartRender(graph.dataList, indexGraph);
              }
              if (graph?.type === 'line') {
                return LineChartDashboardRender(
                  graph.dataList,
                  indexGraph,
                  nbGraphInLine,
                  title,
                );
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
