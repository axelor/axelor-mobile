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
  BarCharDashboard,
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
}

interface Ligne {
  graph: Graph[];
}

interface DashboardProps {
  style?: any;
  ligne: Ligne[];
}

const PieChartRender = (datasets, key) => {
  return <PieChartDashboard datasets={datasets} key={key} />;
};

const BarCharDashboardRender = (datasets, key) => {
  return (
    <BarCharDashboard
      datasets={datasets}
      key={key}
      style={{
        width:
          Dimensions.get('window').width > 500
            ? Dimensions.get('window').width / 4
            : Dimensions.get('window').width / 2,
      }}
    />
  );
};

const LineChartDashboardRender = (datasets, key) => {
  return <LineChartDashboard datasets={datasets} key={key} />;
};

const Dashboard = ({style, ligne}: DashboardProps) => {
  return (
    <ScrollView style={[styles.container, style]}>
      {ligne?.map((l, nbline) => {
        return (
          <View style={styles.lineContainer} key={nbline}>
            {l?.graph.map((g, nbGraph) => {
              if (nbGraph > 4) {
                return null;
              }
              if (g?.type === 'bar') {
                return BarCharDashboardRender(g.dataList, nbGraph);
              }
              if (g?.type === 'pie') {
                return PieChartRender(g.dataList, nbGraph);
              }
              if (g?.type === 'line') {
                return LineChartDashboardRender(g.dataList, nbGraph);
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
