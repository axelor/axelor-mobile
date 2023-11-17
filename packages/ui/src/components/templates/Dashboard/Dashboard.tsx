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
import {
  BarChartDashboard,
  LineChartDashboard,
  PieChartDashboard,
} from '../../molecules';
import {ScrollView} from '../../atoms';

interface Data {
  value: number;
  color?: string;
  label: string;
}

interface Graph {
  type: 'pie' | 'bar' | 'line';
  dataList: Data[][];
  title?: string;
}

interface Line {
  graph: Graph[];
}

interface DashboardProps {
  style?: any;
  line: Line[];
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

const Dashboard = ({style, line}: DashboardProps) => {
  return (
    <ScrollView style={[styles.container, style]}>
      {line?.map((l, nbline) => {
        const nbGraphInLine = l.graph?.length > 4 ? 4 : l.graph?.length;
        return (
          <View style={styles.lineContainer} key={nbline}>
            {l?.graph.map((g, nbGraph) => {
              const title = g?.title;
              if (nbGraph > 4) {
                return null;
              }
              if (g?.type === 'bar') {
                return BarChartDashboardRender(
                  g.dataList,
                  nbGraph,
                  nbGraphInLine,
                  title,
                );
              }
              if (g?.type === 'pie') {
                return PieChartRender(g.dataList, nbGraph);
              }
              if (g?.type === 'line') {
                return LineChartDashboardRender(
                  g.dataList,
                  nbGraph,
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
