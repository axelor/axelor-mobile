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

import React, {ReactElement, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Icon, ScrollView} from '../../atoms';
import Chart from './chart-type';
import {
  Data,
  Max_Number_Graph_Line as MAX_GRAPH_PER_LINE,
} from './dashboard.helper';
import {ChartRender} from './Chart';

interface Graph {
  type: keyof typeof Chart.chartType;
  dataList: Data[][];
  title?: string;
  customChart?: ReactElement | JSX.Element;
  chartId?: number;
  refreshChart?: () => Promise<any>;
}

interface Line {
  graphList: Graph[];
}

interface DashboardProps {
  style?: any;
  lineList: Line[];
  hideCardBackground?: boolean;
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

const Dashboard = ({
  style,
  lineList,
  hideCardBackground = false,
}: DashboardProps) => {
  const [_lineList, setLineList] = useState(lineList);

  console.log('lineList', _lineList);
  console.log('lineList0', _lineList[0]);

  return (
    <ScrollView style={[styles.container, style]}>
      {_lineList?.map((line, indexLine) => {
        const validGraphs = line.graphList.filter(
          graph => graph.dataList?.[0]?.length > 0 || graph.customChart != null,
        );
        const nbGraphInLine = Math.min(validGraphs.length, MAX_GRAPH_PER_LINE);
        const widthGraph = getGraphWidth(nbGraphInLine);

        const limitedGraphList = validGraphs?.slice(0, nbGraphInLine);

        const _refreshChart = async (refreshChart, chartId) => {
          const newGraphData = await refreshChart().then(
            res => res?.data?.object,
          );

          //console.log(newGraphData);

          const updatedLineList = lineList.map(_line => {
            console.log('line', _line);
            return {
              ..._line,
              graphList: _line.graphList.map(graph => {
                if (graph.chartId === chartId) {
                  return {
                    ...graph,
                    dataList: [newGraphData.valueList],
                    title: newGraphData.chartName,
                    type: newGraphData.chartType,
                  };
                }
                return graph;
              }),
            };
          });

          console.log('updatedLineList', updatedLineList);
          console.log('updatedLineList', updatedLineList[0]);

          setLineList(updatedLineList);
        };

        return (
          <View style={styles.lineContainer} key={indexLine}>
            {limitedGraphList?.map(
              (
                {customChart, dataList, title, type, refreshChart, chartId},
                indexGraph,
              ) => {
                if (customChart != null) {
                  return React.cloneElement(customChart, {
                    key: indexGraph,
                    widthGraph,
                  });
                }

                return (
                  <View key={indexGraph}>
                    <ChartRender
                      dataList={dataList}
                      title={title}
                      type={type}
                      widthGraph={widthGraph}
                      hideCardBackground={hideCardBackground}
                    />
                    <Icon
                      name="arrow-clockwise"
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                        zIndex: 1,
                      }}
                      touchable={true}
                      onPress={() => {
                        _refreshChart(refreshChart, chartId);
                      }}
                    />
                  </View>
                );
              },
            )}
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
