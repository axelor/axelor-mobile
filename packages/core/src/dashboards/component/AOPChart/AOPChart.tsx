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

import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {ChartRender, Text} from '@axelor/aos-mobile-ui';
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
  const [initialDefaultValue, setInitialDefaultValue] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchChartData = useCallback(
    async (initial = false) => {
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
          if (initial) {
            setSearchValues(parameter);
            setInitialDefaultValue(parameter);
          }
        }

        const datasetResponse = await fetchChartDataset({
          chartName,
          parameter: {...parameter, ...searchValues},
          context,
        });

        if (datasetResponse?.data?.data?.dataset != null) {
          result.dataset = datasetResponse?.data?.data?.dataset;
        } else {
          result = {...DEFAULT_CHART_CONFIG};
        }
      } catch (error) {
        result = {...DEFAULT_CHART_CONFIG};
      }

      setChart(result);
    },
    [actionViewName, searchValues],
  );

  useEffect(() => {
    if (initialLoad) {
      fetchChartData(true);
      setInitialLoad(false);
    }
  }, [initialLoad, fetchChartData]);

  useEffect(() => {
    if (!initialLoad) {
      fetchChartData();
    }
  }, [fetchChartData, initialLoad, searchValues]);

  return (
    <View
      style={{
        width: widthGraph,
      }}>
      <View style={styles.flex}>
        <DynamicSearchForm
          fields={searchFields}
          values={initialDefaultValue}
          onChange={setSearchValues}
          actionViewName={actionViewName}
        />
      </View>
      <View style={styles.flex}>
        {chart.dataset?.length > 0 ? (
          <ChartRender
            dataList={transformData(chart.dataset)}
            title={chart.title}
            type={chart.type}
            widthGraph={widthGraph}
            translator={I18n.t}
          />
        ) : (
          <Text style={styles.text}>{I18n.t('Base_NoRecordsFound')}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  text: {
    alignSelf: 'center',
    padding: 15,
  },
});

export default AOPChart;
