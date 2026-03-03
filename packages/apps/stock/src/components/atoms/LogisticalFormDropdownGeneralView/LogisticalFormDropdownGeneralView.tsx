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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Label,
  LabelText,
  checkNullString,
  useDigitFormat,
} from '@axelor/aos-mobile-ui';
import {useTranslator, useTypeHelpers, useTypes} from '@axelor/aos-mobile-core';

const isNumberValid = (
  value: number | string,
  minValue: number = 0,
): boolean => {
  const _value = typeof value === 'string' ? parseFloat(value) : value;

  return _value > minValue;
};

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

  const getAccountLabel = useCallback(
    (value: number) =>
      getItemTitle(LogisticalForm?.accountSelectionToCarrierSelect, value),
    [LogisticalForm?.accountSelectionToCarrierSelect, getItemTitle],
  );

  const renderField = (
    titleKey: string,
    value?: string | number,
    formatter?: (value: any) => string,
    isNumber: boolean = false,
  ): React.JSX.Element => {
    if (isNumber ? !isNumberValid(value) : checkNullString(value)) return null;

    const _value = formatter ? formatter(value) : value;

    return (
      <LabelText title={I18n.t(titleKey)} value={_value} onlyOneLine={false} />
    );
  };

  const hasContent =
    isNumberValid(accountSelectionToCarrierSelect) ||
    !checkNullString(customerAccountNumberToCarrier) ||
    !checkNullString(forwarderPartner?.simpleFullName) ||
    !checkNullString(incoterm?.name) ||
    !checkNullString(tracking) ||
    isNumberValid(totalGrossMass) ||
    isNumberValid(totalNetMass) ||
    isNumberValid(totalVolume);

  if (!hasContent) {
    return (
      <Label
        message={I18n.t('Stock_NoInformationAvailable')}
        type="info"
        iconName="info-circle-fill"
      />
    );
  }

  return (
    <View style={styles.container}>
      {renderField(
        'Stock_LogisticalForm_AccountSelectionToCarrier',
        accountSelectionToCarrierSelect,
        getAccountLabel,
        true,
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
        totalGrossMass,
        formatNumber,
        true,
      )}
      {renderField(
        'Stock_LogisticalForm_TotalNetMass',
        totalNetMass,
        formatNumber,
        true,
      )}
      {renderField(
        'Stock_LogisticalForm_TotalVolume',
        totalVolume,
        formatNumber,
        true,
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
});

export default LogisticalFormDropdownGeneralView;
