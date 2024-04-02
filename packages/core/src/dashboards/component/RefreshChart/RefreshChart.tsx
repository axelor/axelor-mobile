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
import {StyleSheet, View} from 'react-native';
import {ChartRender, Icon, checkNullString} from '@axelor/aos-mobile-ui';
import {fetchChartById} from '../../api.helpers';
import AOPChart from '../AOPChart/AOPChart';

interface RefreshChartProps {
  style?: any;
  chartId: number;
  hideCardBackground?: boolean;
}

const RefreshChart = ({
  style,
  chartId,
  hideCardBackground = false,
}: RefreshChartProps) => {
  const [dataList, setDataList] = useState([]);
  const [chartName, setChartName] = useState();
  const [chartType, setChartType] = useState();
  const [actionViewNAme, setActionViewNAme] = useState(null);

  useEffect(() => {
    refreshChart(chartId);
  }, [chartId]);

  const refreshChart = _chartId => {
    fetchChartById(_chartId)
      .then(res => {
        if (res?.data?.object?.metaActionName != null) {
          setActionViewNAme(res?.data?.object?.metaActionName);
        } else {
          setActionViewNAme(null);
          setChartName(res.data?.object?.chartName);
          setChartType(res.data?.object?.chartType);
          setDataList([res.data?.object?.valueList]);
        }
      })
      .catch(() => {
        setActionViewNAme(null);
        setChartName(null);
        setChartType(null);
        setDataList([]);
      });
  };

  if (actionViewNAme != null) {
    return (
      <View style={style}>
        <AOPChart actionViewName={actionViewNAme} />
        <Icon
          name="arrow-clockwise"
          style={styles.icon}
          touchable={true}
          onPress={() => {
            refreshChart(chartId);
          }}
        />
      </View>
    );
  }

  return (
    Array.isArray(dataList) &&
    dataList.length > 0 &&
    !checkNullString(chartType) && (
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
            refreshChart(chartId);
          }}
        />
      </View>
    )
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
