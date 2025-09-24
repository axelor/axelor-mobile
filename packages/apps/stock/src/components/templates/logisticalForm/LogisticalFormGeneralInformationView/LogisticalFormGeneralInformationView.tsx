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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  HeaderContainer,
  KeyboardAvoidingScrollView,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {useTranslator} from '@axelor/aos-mobile-core';
import LogisticalFormHeader from '../LogisticalFormHeader/LogisticalFormHeader';
import LogisticalFormCarrierActionCard from '../LogisticalFormCarrierActionCard/LogisticalFormCarrierActionCard';
import {LogisticalFormDropdownCards} from '../../../molecules';

interface LogisticalFormGeneralInformationViewProps {
  logisticalForm?: any;
  loading: boolean;
  onRefresh: () => void;
}

const LogisticalFormGeneralInformationView = ({
  logisticalForm,
  loading,
  onRefresh,
}: LogisticalFormGeneralInformationViewProps) => {
  const I18n = useTranslator();

  return (
    <View style={styles.container}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<LogisticalFormHeader logisticalForm={logisticalForm} />}
      />
      <KeyboardAvoidingScrollView
        globalStyle={styles.scroll}
        style={styles.scrollContent}
        refresh={{loading, fetcher: onRefresh}}>
        <LogisticalFormCarrierActionCard
          carrierPartner={logisticalForm.carrierPartner}
        />
        <LogisticalFormDropdownCards logisticalForm={logisticalForm} />
        <NotesCard
          title={I18n.t('Stock_InternalDeliveryComment')}
          data={logisticalForm.internalDeliveryComment}
        />
        <NotesCard
          title={I18n.t('Stock_ExternalDeliveryComment')}
          data={logisticalForm.externalDeliveryComment}
        />
      </KeyboardAvoidingScrollView>
    </View>
  );
};

export default LogisticalFormGeneralInformationView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    marginVertical: 5,
  },
});
