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
import {StyleSheet, View} from 'react-native';
import {ScrollView} from '../../atoms';
import Chart from './chart-type';
import {
  Data,
  Max_Number_Graph_Line as MAX_GRAPH_PER_LINE,
} from './dashboard.helper';
import ChartRender from './Chart/ChartRender';

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
}

const Dashboard = ({style, lineList}: DashboardProps) => {
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
                return (
                  <ChartRender
                    key={indexGraph}
                    graph={graph}
                    indexGraph={indexGraph}
                    nbGraphInLine={nbGraphInLine}
                  />
                );
              }
              return null;
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
