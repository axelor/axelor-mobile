/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ChartRender, Icon} from '@axelor/aos-mobile-ui';
import {fetchChartById} from '../../api.helpers';
import {useTranslator} from '../../../i18n';
import AOPChart from '../AOPChart/AOPChart';

const DEFAULT_CONFIG = {
  dataList: [],
  chartName: null,
  chartType: null,
  actionViewName: null,
};

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
  const I18n = useTranslator();

  const [charConfig, setChartConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    refreshChart(chartId);
  }, [chartId]);

  const refreshChart = _chartId => {
    fetchChartById(_chartId)
      .then(res => {
        const {data} = res;

        if (data?.object?.metaActionName) {
          setChartConfig({
            ...DEFAULT_CONFIG,
            actionViewName: data.object.metaActionName,
          });
        } else {
          setChartConfig({
            ...DEFAULT_CONFIG,
            dataList: [data.object.valueList],
            chartName: data.object.chartName,
            chartType: data.object.chartType,
          });
        }
      })
      .catch(() => {
        setChartConfig(DEFAULT_CONFIG);
      });
  };

  const content = useMemo(() => {
    if (charConfig.actionViewName) {
      return <AOPChart actionViewName={charConfig.actionViewName} />;
    } else if (charConfig.dataList.length > 0 && charConfig.chartType) {
      return (
        <ChartRender
          dataList={charConfig.dataList}
          title={charConfig.chartName}
          type={charConfig.chartType}
          hideCardBackground={hideCardBackground}
          translator={I18n.t}
        />
      );
    }
    return null;
  }, [I18n.t, charConfig, hideCardBackground]);

  if (content == null) {
    return null;
  }

  return (
    <View style={style}>
      {content}
      <Icon
        name="arrow-clockwise"
        style={styles.icon}
        touchable={true}
        onPress={() => refreshChart(chartId)}
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
