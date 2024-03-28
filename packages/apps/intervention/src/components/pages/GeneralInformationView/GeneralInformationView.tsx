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

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  calculateDiff,
  Stopwatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {HeaderContainer, ScrollView} from '@axelor/aos-mobile-ui';
import {GtCard, InterventionHeader} from '../../molecules';
import {DropdownCards} from '../../organisms';
import {Intervention} from '../../../types';

const NUMBER_MILLISECONDS_IN_SECOND = 1000;

const GeneralInformationView = ({}) => {
  const I18n = useTranslator();

  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );

  const [duration, setDuration] = useState(
    intervention.totalDuration * NUMBER_MILLISECONDS_IN_SECOND,
  );
  const [lastStart, setLastStart] = useState(intervention.lastStartDateTime);

  const getDuration = useCallback(() => {
    if (intervention.statusSelect === Intervention.status.Started) {
      return duration + calculateDiff(lastStart, new Date());
    }
    return duration;
  }, [duration, intervention.statusSelect, lastStart]);

  const handlePlay = useCallback(() => {
    console.log('Play button pressed.');
    const now = new Date();
    setLastStart(now.toISOString());
  }, []);

  const handlePause = useCallback(() => {
    console.log('Pause button pressed.');
    setDuration(current => current + calculateDiff(lastStart, new Date()));
  }, [lastStart]);

  const handleStop = useCallback(() => {
    console.log('Stop button pressed.');
  }, []);

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
          gtStatus={Intervention.status.Started}
        />
        <GtCard
          titleKey={'Intervention_MaxGRT'}
          maxDate={intervention.customerRequest?.maxGrtDateTime}
          realGt={intervention.customerRequest?.realGrt}
          plannedGt={intervention.contract?.guaranteedRecoveryTime}
          interventionStatus={intervention.statusSelect}
          gtStatus={Intervention.status.Finished}
        />
        <DropdownCards intervention={intervention} />
        <Stopwatch
          style={styles.stopwatch}
          startTime={getDuration()}
          status={Intervention.getStopwatchStatus(intervention.statusSelect)}
          timerFormat={I18n.t('Intervention_TimerFormat')}
          onPlay={handlePlay}
          onPause={handlePause}
          onStop={handleStop}
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
  },
});

export default GeneralInformationView;
