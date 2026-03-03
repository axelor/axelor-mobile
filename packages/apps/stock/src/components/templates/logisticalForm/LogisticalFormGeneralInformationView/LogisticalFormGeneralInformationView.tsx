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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HeaderContainer, NotesCard, ScrollView} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  CarrierActionCard,
  LogisticalFormDropdownCards,
} from '../../../molecules';
import {LogisticalFormHeader} from '../../logisticalForm';

interface LogisticalFormGeneralInformationViewProps {
  onRefresh: () => void;
}

const LogisticalFormGeneralInformationView = ({
  onRefresh,
}: LogisticalFormGeneralInformationViewProps) => {
  const I18n = useTranslator();

  const {logisticalForm, loading} = useSelector(state => state.logisticalForm);

  return (
    <View style={styles.flexOne}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<LogisticalFormHeader {...logisticalForm} />}
      />
      <ScrollView
        style={styles.scrollContent}
        refresh={{loading, fetcher: onRefresh}}>
        <CarrierActionCard carrierPartner={logisticalForm.carrierPartner} />
        <NotesCard
          title={I18n.t('Stock_InternalDeliveryComment')}
          data={logisticalForm.internalDeliveryComment}
        />
        <NotesCard
          title={I18n.t('Stock_ExternalDeliveryComment')}
          data={logisticalForm.externalDeliveryComment}
        />
        <LogisticalFormDropdownCards logisticalForm={logisticalForm} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  scrollContent: {
    marginTop: 5,
  },
});

export default LogisticalFormGeneralInformationView;
