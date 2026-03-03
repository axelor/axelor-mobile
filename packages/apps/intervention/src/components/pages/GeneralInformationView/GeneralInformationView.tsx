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

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  calculateDiff,
  getNowDateZonesISOString,
  Stopwatch,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {HeaderContainer, ScrollView} from '@axelor/aos-mobile-ui';
import {GtCard, InterventionHeader} from '../../molecules';
import {DropdownCards} from '../../organisms';
import {Intervention as InterventionType} from '../../../types';
import {updateInterventionStatus} from '../../../features/interventionSlice';

const NUMBER_MILLISECONDS_IN_SECOND = 1000;

const GeneralInformationView = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.intervention.db.Intervention',
  });
  const {Intervention} = useTypes();

  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );

  const [duration, setDuration] = useState(
    intervention.totalDuration * NUMBER_MILLISECONDS_IN_SECOND,
  );
  const [lastStart, setLastStart] = useState(intervention.lastStartDateTime);

  useEffect(() => {
    setDuration(intervention.totalDuration * NUMBER_MILLISECONDS_IN_SECOND);
    setLastStart(intervention.lastStartDateTime);
  }, [intervention]);

  const getDuration = useCallback(() => {
    if (intervention.statusSelect === Intervention?.statusSelect.Started) {
      return duration + calculateDiff(lastStart, new Date());
    }
    return duration;
  }, [
    Intervention?.statusSelect,
    duration,
    intervention.statusSelect,
    lastStart,
  ]);

  const updateIntervention = useCallback(
    (targetStatus: number) => {
      dispatch(
        (updateInterventionStatus as any)({
          interventionId: intervention.id,
          version: intervention.version,
          targetStatus,
        }),
      );
    },
    [dispatch, intervention.id, intervention.version],
  );

  const handlePlay = useCallback(() => {
    updateIntervention(Intervention?.statusSelect.Started);
    setLastStart(getNowDateZonesISOString());
  }, [Intervention?.statusSelect, updateIntervention]);

  const handlePause = useCallback(() => {
    updateIntervention(Intervention?.statusSelect.Suspended);
    setDuration(current => current + calculateDiff(lastStart, new Date()));
  }, [Intervention?.statusSelect, lastStart, updateIntervention]);

  const handleStop = useCallback(() => {
    updateIntervention(Intervention?.statusSelect.Finished);
  }, [Intervention?.statusSelect, updateIntervention]);

  return (
    <View>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<InterventionHeader intervention={intervention} />}
      />
      <ScrollView style={styles.scrollView}>
        <GtCard
          titleKey={'Intervention_MaxGIT'}
          maxDate={intervention.customerRequest?.maxGitDateTime}
          realGt={intervention.customerRequest?.realGit}
          plannedGt={intervention.contract?.guaranteedInterventionTime}
          interventionStatus={intervention.statusSelect}
          gtStatus={Intervention?.statusSelect.Started}
        />
        <GtCard
          titleKey={'Intervention_MaxGRT'}
          maxDate={intervention.customerRequest?.maxGrtDateTime}
          realGt={intervention.customerRequest?.realGrt}
          plannedGt={intervention.contract?.guaranteedRecoveryTime}
          interventionStatus={intervention.statusSelect}
          gtStatus={Intervention?.statusSelect.Finished}
        />
        <DropdownCards intervention={intervention} />
        <Stopwatch
          style={styles.stopwatch}
          disable={readonly}
          startTime={getDuration()}
          status={InterventionType.getStopwatchStatus(
            intervention.statusSelect,
          )}
          timerFormat={I18n.t('Intervention_TimerFormat')}
          onPlay={handlePlay}
          onPause={handlePause}
          onStop={handleStop}
          disableStop={
            intervention.statusSelect !== Intervention?.statusSelect.Started
          }
          useObjectStatus
          hideCancel
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
  },
  dropdownCardTitle: {
    fontWeight: 'bold',
  },
  stopwatch: {
    width: '90%',
    marginTop: 30,
    marginVertical: 0,
    marginBottom: 100,
  },
});

export default GeneralInformationView;
