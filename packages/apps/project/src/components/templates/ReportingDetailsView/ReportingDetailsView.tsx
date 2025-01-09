/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {Label, ScrollView} from '@axelor/aos-mobile-ui';
import {getProjectReportingIndicator} from '../../../features/reportingSlice';
import IndicatorCategory from './IndicatorCategory';

const ReportingDetailsView = () => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {project} = useSelector(state => state.project_project);
  const {reportingIndicator} = useSelector(state => state.project_reporting);

  const fetchIndicators = useCallback(() => {
    dispatch((getProjectReportingIndicator as any)({projectId: project?.id}));
  }, [dispatch, project?.id]);

  useEffect(() => {
    fetchIndicators();
  }, [fetchIndicators]);

  return (
    <ScrollView
      style={styles.scroll}
      refresh={{fetcher: fetchIndicators, loading: false}}>
      {!reportingIndicator && (
        <Label
          style={styles.label}
          message={I18n.t('Base_NoData')}
          type="info"
        />
      )}
      {reportingIndicator.map((data, idx) => (
        <IndicatorCategory {...data} key={`${data.title}-${idx}`} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    height: null,
  },
  label: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default ReportingDetailsView;
