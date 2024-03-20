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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from '@axelor/aos-mobile-core';
import {HeaderContainer, ScrollView} from '@axelor/aos-mobile-ui';
import {GtCard, InterventionHeader} from '../../molecules';
import {DropdownCards} from '../../organisms';
import {Intervention} from '../../../types';

const GeneralInformationView = ({}) => {
  const {intervention} = useSelector(
    (state: any) => state.intervention_intervention,
  );

  return (
    <View>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<InterventionHeader intervention={intervention} />}
      />
      <ScrollView style={styles.scrollView}>
        <GtCard
          titleKey={'Intervention_MaxGIT'}
          maxDate={intervention.customerRequest.maxGitDateTime}
          startDate={intervention.startDateTime}
          realGt={intervention.customerRequest.realGit}
          interventionStatus={intervention.statusSelect}
          gtStatus={Intervention.status.Started}
        />
        <GtCard
          titleKey={'Intervention_MaxGRT'}
          maxDate={intervention.customerRequest.maxGrtDateTime}
          startDate={intervention.startDateTime}
          realGt={intervention.customerRequest.realGrt}
          interventionStatus={intervention.statusSelect}
          gtStatus={Intervention.status.Finished}
        />
        <DropdownCards intervention={intervention} />
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
});

export default GeneralInformationView;
