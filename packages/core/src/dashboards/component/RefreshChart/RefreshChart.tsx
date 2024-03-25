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

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ChartRender, Icon, Data} from '@axelor/aos-mobile-ui';
import {fetchChartById} from '../../api.helpers';

interface Chart {
  title: string;
  type: 'line' | 'bar' | 'pie' | 'donut';
  id: number;
  datasets: Data[][];
}

interface RefreshChartProps {
  style?: any;
  chart: Chart;
  hideCardBackground?: boolean;
}

const RefreshChart = ({
  style,
  chart,
  hideCardBackground = false,
}: RefreshChartProps) => {
  const [dataList, setDataList] = useState(chart.datasets);
  const [chartName, setChartName] = useState(chart.title);
  const [chartType, setChartType] = useState(chart.type);

  const refreshChart = chartId => {
    fetchChartById(chartId)
      .then(res => {
        setChartName(res.data?.object?.chartName);
        setChartType(res.data?.object?.chartType);
        setDataList([res.data?.object?.valueList]);
      })
      .catch(() => {
        setChartName(chart.title);
        setChartType(chart.type);
        setDataList(chart.datasets);
      });
  };

  return (
    <View style={style}>
      <ChartRender
        dataList={dataList}
        title={chartName}
        type={chartType}
        hideCardBackground={hideCardBackground}
      />
      <Icon
        name="arrow-clockwise"
        style={styles.icon}
        touchable={true}
        onPress={() => {
          refreshChart(chart.id);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
});

export default RefreshChart;
