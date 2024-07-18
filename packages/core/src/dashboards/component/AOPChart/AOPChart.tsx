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

import React, {useEffect, useState, useCallback} from 'react';
import {Button, View} from 'react-native';
import {ChartRender} from '@axelor/aos-mobile-ui';
import {
  fetchActionView,
  fetchChartDataset,
  fetchTypeChart,
  getChartParameter,
} from './api.helpers';
import {transformData} from './format.helpers';
import {useTranslator} from '../../../i18n';
import DynamicSearchForm from './DynamicSearchForm';

const DEFAULT_CHART_CONFIG = {type: '', dataset: [], title: ''};

const AOPChart = ({
  actionViewName,
  widthGraph,
}: {
  actionViewName: string;
  widthGraph?: number;
}) => {
  const I18n = useTranslator();
  const [chart, setChart] = useState(DEFAULT_CHART_CONFIG);
  const [searchFields, setSearchFields] = useState([]);
  const [searchValues, setSearchValues] = useState({});

  const handleSearchChange = (name, value) => {
    setSearchValues(prevValues => ({...prevValues, [name]: value}));
  };

  const fetchChartData = useCallback(async () => {
    let result = {...DEFAULT_CHART_CONFIG};

    try {
      const actionViewResponse = await fetchActionView({
        actionViewName: actionViewName,
      });

      const context = actionViewResponse?.data?.data[0]?.view?.context;
      const chartName = actionViewResponse?.data?.data[0]?.view.views[0].name;

      const typeResponse = await fetchTypeChart({chartName: chartName});
      result.title = typeResponse?.data?.data?.title;
      result.type = typeResponse?.data?.data?.series[0].type;
      const onInit = typeResponse?.data?.data?.onInit;

      const searchFieldsList = typeResponse?.data?.data?.search || [];
      setSearchFields(searchFieldsList);

      let parameter = null;
      if (onInit) {
        const paramResponse = await getChartParameter({
          chartName,
          action: onInit,
          context: context,
        });
        parameter = paramResponse?.data?.data[0].values;
      }

      const datasetResponse = await fetchChartDataset({
        chartName,
        parameter: {...parameter, ...searchValues},
        context,
      });
      result.dataset = datasetResponse?.data?.data?.dataset;
    } catch (error) {
      result = {...DEFAULT_CHART_CONFIG};
    }

    setChart(result);
  }, [actionViewName, searchValues]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  if (chart.dataset?.length <= 0) {
    return null;
  }

  return (
    <View style={{width: widthGraph}}>
      <DynamicSearchForm
        fields={searchFields}
        values={searchValues}
        onChange={handleSearchChange}
      />
      <Button title="Search" onPress={fetchChartData} />
      <ChartRender
        dataList={transformData(chart.dataset)}
        title={chart.title}
        type={chart.type}
        widthGraph={widthGraph}
        translator={I18n.t}
      />
    </View>
  );
};

export default AOPChart;
