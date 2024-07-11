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

import React, {useEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from '@axelor/aos-mobile-core';
import {IndicatorChart} from '@axelor/aos-mobile-ui';
import {
  getProjectTimeData,
  getProjectFinancialData,
} from '../../../features/reportingSlice';

const ReportingDetailsView = () => {
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

  return (
    <ScrollView>
      <View style={styles.container}>
        {reportingTimeData?.dataset?.map((data, index) =>
          dataToIndicators(data).map((indicatorData, idx) => (
            <IndicatorChart
              key={`${index}-${idx}`}
              datasets={[indicatorData] as any}
              widthGraph={Dimensions.get('window').width / 2}
            />
          )),
        )}
        {reportingFinancialData?.dataset?.map((data, index) =>
          dataToIndicators(data).map((indicatorData, idx) => (
            <IndicatorChart
              key={`${index + reportingTimeData?.dataset.length}-${idx}`}
              datasets={[indicatorData] as any}
              widthGraph={Dimensions.get('window').width / 2}
            />
          )),
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ReportingDetailsView;
