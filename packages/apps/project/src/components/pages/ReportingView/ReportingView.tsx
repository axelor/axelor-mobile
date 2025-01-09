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

import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {HeaderContainer, ToggleSwitch} from '@axelor/aos-mobile-ui';
import {ProjectHeader} from '../../molecules';
import {ActivityListView, ReportingDetailsView} from '../../templates';
import {ReportingType} from '../../../types';
import {useReportingConfiguration} from '../../../hooks/use-reporting-configuration';

const ReportingView = () => {
  const I18n = useTranslator();

  const {project} = useSelector((state: any) => state.project_project);

  const {showActivities, showIndicators, noReporting} =
    useReportingConfiguration(project);

  const [mode, setMode] = useState(ReportingType.indicators);

  useEffect(() => {
    if (!showIndicators) {
      setMode(ReportingType.activities);
    } else if (!showActivities) {
      setMode(ReportingType.indicators);
    }
  }, [showActivities, showIndicators]);

  if (noReporting) {
    return null;
  }

  return (
    <View style={styles.container}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <>
            <ProjectHeader />
            {showIndicators && showActivities && (
              <ToggleSwitch
                leftTitle={I18n.t('Project_Reporting')}
                rightTitle={I18n.t('Project_Activities')}
                onSwitch={() =>
                  setMode(_mode => {
                    return _mode === ReportingType.activities
                      ? ReportingType.indicators
                      : ReportingType.activities;
                  })
                }
              />
            )}
          </>
        }
      />
      {mode === ReportingType.activities ? (
        <ActivityListView />
      ) : (
        <ReportingDetailsView />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ReportingView;
