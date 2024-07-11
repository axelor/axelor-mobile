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

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {HeaderContainer, ToggleSwitch} from '@axelor/aos-mobile-ui';
import {ProjectHeader} from '../../molecules';
import {ActivityListView, ReportingDetailsView} from '../../templates';

const modes = {
  reporting: 'reporting',
  activities: 'activities',
};

const ReportingView = () => {
  const I18n = useTranslator();

  const [mode, setMode] = useState(modes?.reporting);

  return (
    <View style={styles.container}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <>
            <ProjectHeader />
            <ToggleSwitch
              leftTitle={I18n.t('Project_Reporting')}
              rightTitle={I18n.t('Project_Activities')}
              onSwitch={() =>
                setMode(_mode => {
                  return _mode === modes.activities
                    ? modes.reporting
                    : modes.activities;
                })
              }
            />
          </>
        }
      />
      {mode === modes.activities ? (
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
