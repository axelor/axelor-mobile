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
import {ChartRender} from '@axelor/aos-mobile-ui';
import {
  fetchActionView,
  fetchChartDataset,
  fetchTypeChart,
  getChartParameter,
} from './api.helpers';
import {transformData} from './format.helpers';

const DEFAULT_CHART_CONFIG = {type: '', dataset: [], title: ''};

const AOPChart = ({
  actionViewName,
  widthGraph,
}: {
  actionViewName: string;
  widthGraph?: number;
}) => {
  const [chart, setChart] = useState(DEFAULT_CHART_CONFIG);

  useEffect(() => {
    const fetchChartData = async () => {
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
          parameter,
          context,
        });
        result.dataset = datasetResponse?.data?.data?.dataset;
      } catch (error) {
        result = {...DEFAULT_CHART_CONFIG};
      }

      setChart(result);
    };

    fetchChartData();
  }, [actionViewName]);

  if (chart.dataset?.length <= 0) {
    return null;
  }

  return (
    <ChartRender
      dataList={transformData(chart.dataset)}
      title={chart.title}
      type={chart.type}
      widthGraph={widthGraph}
    />
  );
};

export default AOPChart;
