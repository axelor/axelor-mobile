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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  LabelText,
  checkNullString,
  useDigitFormat,
} from '@axelor/aos-mobile-ui';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';

interface LogisticalFormDropdownGeneralViewProps {
  accountSelectionToCarrierSelect?: number;
  customerAccountNumberToCarrier?: string;
  forwarderPartner?: any;
  incoterm?: any;
  tracking?: string;
  totalGrossMass?: number;
  totalNetMass?: number;
  totalVolume?: number;
}

const LogisticalFormDropdownGeneralView = ({
  accountSelectionToCarrierSelect,
  customerAccountNumberToCarrier,
  forwarderPartner,
  incoterm,
  tracking,
  totalGrossMass,
  totalNetMass,
  totalVolume,
}: LogisticalFormDropdownGeneralViewProps) => {
  const I18n = useTranslator();
  const {LogisticalForm} = useTypes();
  const {getItemTitle} = useTypeHelpers();
  const formatNumber = useDigitFormat();

  const accountSelectionLabel = useMemo(() => {
    if (accountSelectionToCarrierSelect == null) {
      return null;
    }

    return getItemTitle(
      LogisticalForm?.accountSelectionToCarrierSelect,
      accountSelectionToCarrierSelect,
    );
  }, [
    LogisticalForm?.accountSelectionToCarrierSelect,
    accountSelectionToCarrierSelect,
    getItemTitle,
  ]);

  const hasAccountSelection = !checkNullString(accountSelectionLabel);
  const hasCustomerAccountNumber = !checkNullString(
    customerAccountNumberToCarrier,
  );

  const hasForwarder = !checkNullString(forwarderPartner.simpleFullName);
  const hasIncoterm = !checkNullString(incoterm?.name);
  const hasTracking = !checkNullString(tracking);
  const hasTotalGrossMass = totalGrossMass != null;
  const hasTotalNetMass = totalNetMass != null;
  const hasTotalVolume = totalVolume != null;

  if (
    !hasAccountSelection &&
    !hasCustomerAccountNumber &&
    !hasForwarder &&
    !hasIncoterm &&
    !hasTracking &&
    !hasTotalGrossMass &&
    !hasTotalNetMass &&
    !hasTotalVolume
  ) {
    return null;
  }

  return (
    <View style={styles.container}>
      {hasAccountSelection && (
        <LabelText
          title={I18n.t('Stock_LogisticalForm_AccountSelectionToCarrier')}
          value={accountSelectionLabel}
          onlyOneLine={false}
        />
      )}
      {hasCustomerAccountNumber && (
        <LabelText
          title={I18n.t('Stock_LogisticalForm_CustomerAccountNumberToCarrier')}
          value={customerAccountNumberToCarrier}
          onlyOneLine={false}
        />
      )}
      {hasForwarder && (
        <LabelText
          title={I18n.t('Stock_ForwarderPartner')}
          value={forwarderPartner.simpleFullName}
          onlyOneLine={false}
        />
      )}
      {hasIncoterm && (
        <LabelText
          title={I18n.t('Stock_Incoterm')}
          value={incoterm?.name}
          onlyOneLine={false}
        />
      )}
      {hasTracking && (
        <LabelText
          title={I18n.t('Stock_LogisticalForm_Tracking')}
          value={tracking}
          onlyOneLine={false}
        />
      )}
      {hasTotalGrossMass && (
        <LabelText
          title={I18n.t('Stock_LogisticalForm_TotalGrossMass')}
          value={formatNumber(totalGrossMass)}
          onlyOneLine={false}
        />
      )}
      {hasTotalNetMass && (
        <LabelText
          title={I18n.t('Stock_LogisticalForm_TotalNetMass')}
          value={formatNumber(totalNetMass)}
          onlyOneLine={false}
        />
      )}
      {hasTotalVolume && (
        <LabelText
          title={I18n.t('Stock_LogisticalForm_TotalVolume')}
          value={formatNumber(totalVolume)}
          onlyOneLine={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    gap: 8,
  },
});

export default LogisticalFormDropdownGeneralView;
