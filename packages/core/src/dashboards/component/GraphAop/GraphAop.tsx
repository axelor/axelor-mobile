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
import {Dimensions, View} from 'react-native';
import {Chart, BarChart, LineChart, PieChart} from '@axelor/aos-mobile-ui';
import {fetchGraphDataset, fetchTypeGraph} from '../../../api/graph-api';

interface GraphAopProps {
  chartName: string;
}

const GraphAop = ({
  chartName = 'chart.created.leads.per.month',
}: GraphAopProps) => {
  const [graph, setGraph] = useState({type: '', dataset: [], title: ''});

  useEffect(() => {
    let result = {type: '', dataset: [], title: ''};
    let onInit = null;
    fetchTypeGraph({
      chartName: chartName,
    }).then(response => {
      console.log('response?.data?.data', response?.data?.data);
      result.title = response?.data?.data?.title;
      result.type = response?.data?.data?.series[0].type;
      onInit = response?.data?.data?.onInit;

      console.log('onInit', onInit);

      return fetchGraphDataset({
        chartName: chartName,
      }).then(res => {
        result.dataset = res?.data?.data?.dataset;

        setGraph(result);
      });
    });
  }, [chartName]);

  const BarChartRender = (datasets, title) => {
    return (
      <BarChart
        datasets={datasets}
        widthGraph={Dimensions.get('window').width}
        title={title}
      />
    );
  };

  const LineChartRender = (datasets, title) => {
    return (
      <LineChart
        datasets={datasets}
        widthGraph={Dimensions.get('window').width}
        title={title}
      />
    );
  };

  const PieChartRender = (datasets, type, title) => {
    return (
      <PieChart
        datasets={datasets[0]}
        widthGraph={Dimensions.get('window').width}
        donut={type === Chart.chartType.donut}
        title={title}
      />
    );
  };

  const renderChar = (type, dataset, title) => {
    switch (type) {
      case Chart.chartType.bar:
        return BarChartRender(dataset, title);

      case Chart.chartType.pie:
      case Chart.chartType.donut:
        return PieChartRender(dataset, type, title);

      case Chart.chartType.line:
        return LineChartRender(dataset, title);

      default:
        return null;
    }
  };

  const transformData = data => {
    const sample = data[0];
    let valueKey = '';
    let labelKey = '';

    Object.keys(sample).forEach(key => {
      const value = sample[key];
      if (!isNaN(parseFloat(value))) {
        valueKey = key;
      } else {
        labelKey = key;
      }
    });

    return data.map(item => ({
      label: item[labelKey],
      value: parseFloat(item[valueKey]) || 0,
    }));
  };

  if (graph.dataset?.length <= 0) {
    return null;
  }

  return (
    <View>
      {renderChar(graph.type, [transformData(graph.dataset)], graph.title)}
    </View>
  );
};

export default GraphAop;
