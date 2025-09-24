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

  const renderField = (
    titleKey: string,
    value?: string | null,
  ): JSX.Element | null => {
    if (checkNullString(value)) {
      return null;
    }

    return (
      <LabelText title={I18n.t(titleKey)} value={value} onlyOneLine={false} />
    );
  };

  const hasContent =
    !checkNullString(accountSelectionLabel) ||
    !checkNullString(customerAccountNumberToCarrier) ||
    !checkNullString(forwarderPartner?.simpleFullName) ||
    !checkNullString(incoterm?.name) ||
    !checkNullString(tracking) ||
    totalGrossMass != null ||
    totalNetMass != null ||
    totalVolume != null;

  if (!hasContent) {
    return null;
  }

  return (
    <View style={styles.container}>
      {renderField(
        'Stock_LogisticalForm_AccountSelectionToCarrier',
        accountSelectionLabel,
      )}
      {renderField(
        'Stock_LogisticalForm_CustomerAccountNumberToCarrier',
        customerAccountNumberToCarrier,
      )}
      {renderField('Stock_ForwarderPartner', forwarderPartner?.simpleFullName)}
      {renderField('Stock_Incoterm', incoterm?.name)}
      {renderField('Stock_LogisticalForm_Tracking', tracking)}
      {renderField(
        'Stock_LogisticalForm_TotalGrossMass',
        totalGrossMass != null ? formatNumber(totalGrossMass) : null,
      )}
      {renderField(
        'Stock_LogisticalForm_TotalNetMass',
        totalNetMass != null ? formatNumber(totalNetMass) : null,
      )}
      {renderField(
        'Stock_LogisticalForm_TotalVolume',
        totalVolume != null ? formatNumber(totalVolume) : null,
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
