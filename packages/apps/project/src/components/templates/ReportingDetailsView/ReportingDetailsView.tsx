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

import React, {useCallback, useEffect, useMemo} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {IndicatorChart, Label} from '@axelor/aos-mobile-ui';
import {
  getProjectTimeData,
  getProjectFinancialData,
} from '../../../features/reportingSlice';

const ReportingDetailsView = () => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {project} = useSelector((state: any) => state.project_project);
  const {reportingTimeData, reportingFinancialData} = useSelector(
    (state: any) => state.project_reporting,
  );

  useEffect(() => {
    dispatch((getProjectTimeData as any)({projetId: project?.id}));
    dispatch((getProjectFinancialData as any)({projetId: project?.id}));
  }, [dispatch, project?.id]);

  const dataToIndicators = (data: any) => {
    return Object.keys(data).map(key => ({
      title: key,
      value: data[key],
    }));
  };

  const formattedData = useCallback(dataset => {
    if (Array.isArray(dataset) && dataset.length > 0) {
      return dataToIndicators(dataset[0]);
    } else {
      return null;
    }
  }, []);

  const timeData = useMemo(
    () => formattedData(reportingTimeData?.dataset),
    [formattedData, reportingTimeData?.dataset],
  );

  const financialData = useMemo(
    () => formattedData(reportingFinancialData?.dataset),
    [formattedData, reportingFinancialData?.dataset],
  );

  return (
    <ScrollView>
      {!timeData && !financialData && (
        <Label
          style={styles.label}
          message={I18n.t('Base_NoData')}
          type="info"
        />
      )}
      <View style={styles.dataContainer}>
        {timeData?.map((indicatorData, idx) => (
          <IndicatorChart
            key={`reportingTimeData${idx}`}
            datasets={[indicatorData]}
            widthGraph={Dimensions.get('window').width / 2}
          />
        ))}
        {financialData?.map((indicatorData, idx) => (
          <IndicatorChart
            key={`reportingFinancialData${idx}`}
            datasets={[indicatorData]}
            widthGraph={Dimensions.get('window').width / 2}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '90%',
    alignSelf: 'center',
  },
  dataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ReportingDetailsView;
