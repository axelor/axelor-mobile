/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {ReactElement} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ScrollView, Text} from '../../atoms';
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
  customChart?: ReactElement | React.JSX.Element;
}

interface Line {
  graphList: Graph[];
}

interface DashboardProps {
  style?: any;
  lineList: Line[];
  hideCardBackground?: boolean;
  /** Formatted last update date */
  lastUpdate?: Date;
  translator: (translationKey: string) => string;
  displayLastUpdate?: boolean;
  chartWidth?: number;
}

const getGraphWidth = (chartWidth: number, nbGraphInLine: number) => {
  if (chartWidth) {
    return chartWidth;
  } else if (nbGraphInLine === 1) {
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
  translator,
  lastUpdate,
  displayLastUpdate = false,
  chartWidth = null,
}: DashboardProps) => {
  return (
    <ScrollView style={[styles.container, style]}>
      {lineList?.map((line, indexLine) => {
        const validGraphs = line.graphList.filter(
          graph => graph.dataList?.[0]?.length > 0 || graph.customChart != null,
        );
        const nbGraphInLine = Math.min(validGraphs.length, MAX_GRAPH_PER_LINE);
        const widthGraph = getGraphWidth(chartWidth, nbGraphInLine);

        const limitedGraphList = validGraphs?.slice(0, nbGraphInLine);

        return (
          <View style={styles.lineContainer} key={indexLine}>
            {limitedGraphList?.map(
              ({customChart, dataList, title, type}, indexGraph) => {
                if (customChart != null) {
                  return React.cloneElement(customChart, {
                    key: indexGraph,
                    widthGraph,
                  } as any);
                }

                return (
                  <ChartRender
                    key={indexGraph}
                    dataList={dataList}
                    title={title}
                    type={type}
                    widthGraph={widthGraph}
                    hideCardBackground={hideCardBackground}
                    translator={translator}
                  />
                );
              },
            )}
          </View>
        );
      })}
      {displayLastUpdate && lastUpdate != null && (
        <View style={styles.dateContainer}>
          <Text>{`${translator('Base_LastUpdate')} : ${lastUpdate}`}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
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
