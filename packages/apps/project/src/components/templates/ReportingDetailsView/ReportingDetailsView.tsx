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
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from '@axelor/aos-mobile-core';
import {IndicatorChart} from '@axelor/aos-mobile-ui';
import {getReportingData, getReportingData2} from '../../../api/reporting-api';

const ReportingDetailsView = () => {
  const {project} = useSelector((state: any) => state.project_project);

  const [reportingData, setReportingData] = useState<any[]>([]);
  const [reportingData2, setReportingData2] = useState<any[]>([]);

  useEffect(() => {
    getReportingData({projetId: project?.id}).then(res => {
      setReportingData(res?.data?.data?.dataset || []);
    });
    getReportingData2({projetId: project?.id}).then(res => {
      setReportingData2(res?.data?.data?.dataset || []);
    });
  }, [project?.id]);

  const dataToIndicators = (data: any) => {
    return Object.keys(data).map(key => ({
      title: key,
      value: data[key],
    }));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {reportingData.map((data, index) =>
          dataToIndicators(data).map((indicatorData, idx) => (
            <IndicatorChart
              key={`${index}-${idx}`}
              datasets={[indicatorData] as any}
              title={`Indicator Chart ${index + 1}`}
              widthGraph={Dimensions.get('window').width / 2}
            />
          )),
        )}
        {reportingData2.map((data, index) =>
          dataToIndicators(data).map((indicatorData, idx) => (
            <IndicatorChart
              key={`${index + reportingData.length}-${idx}`}
              datasets={[indicatorData] as any}
              title={`Indicator Chart ${index + reportingData.length + 1}`}
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
