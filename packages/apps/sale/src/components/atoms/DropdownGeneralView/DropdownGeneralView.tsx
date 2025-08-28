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
import {View} from 'react-native';
import {useTranslator} from '@axelor/aos-mobile-core';
import {checkNullString, LabelText} from '@axelor/aos-mobile-ui';
import AdressLine from './AdressLine';

interface DropdownGeneralViewProps {
  companyName: string;
  tradingName: string;
  stockLocationName: string;
  externalReference: string;
  fiscalPositionName: string;
  invoicedPartnerName: string;
  mainInvoicingAddress: string;
  deliveredPartnerName: string;
  deliveryAddress: string;
  priceListName: string;
  paymentModeName?: string;
  paymentConditionName?: string;
}

const DropdownGeneralView = ({
  companyName,
  tradingName,
  stockLocationName,
  externalReference,
  fiscalPositionName,
  invoicedPartnerName,
  mainInvoicingAddress,
  deliveredPartnerName,
  deliveryAddress,
  priceListName,
  paymentModeName,
  paymentConditionName,
}: DropdownGeneralViewProps) => {
  const I18n = useTranslator();

  return (
    <View>
      <LabelText title={I18n.t('Crm_Company')} value={companyName} />
      {!checkNullString(tradingName) && (
        <LabelText title={I18n.t('Sale_TradingName')} value={tradingName} />
      )}
      {!checkNullString(stockLocationName) && (
        <LabelText
          title={I18n.t('Sale_StockLocation')}
          value={stockLocationName}
        />
      )}
      {!checkNullString(externalReference) && (
        <LabelText
          title={I18n.t('Sale_CustomerReference')}
          value={externalReference}
        />
      )}
      {!checkNullString(fiscalPositionName) && (
        <LabelText
          title={I18n.t('Sale_FiscalPosition')}
          value={fiscalPositionName}
        />
      )}
      {!checkNullString(priceListName) && (
        <LabelText title={I18n.t('Sale_PriceList')} value={priceListName} />
      )}
      {!checkNullString(paymentModeName) && (
        <LabelText title={I18n.t('Sale_PaymentMode')} value={paymentModeName} />
      )}
      {!checkNullString(paymentConditionName) && (
        <LabelText
          title={I18n.t('Sale_PaymentCondition')}
          value={paymentConditionName}
        />
      )}
      {!checkNullString(invoicedPartnerName) && (
        <LabelText
          title={I18n.t('Sale_InvoicedPartner')}
          value={invoicedPartnerName}
        />
      )}
      <AdressLine address={mainInvoicingAddress} />
      {!checkNullString(deliveredPartnerName) && (
        <LabelText
          title={I18n.t('Sale_DeliveredPartner')}
          value={deliveredPartnerName}
        />
      )}
      <AdressLine address={deliveryAddress} />
    </View>
  );
};

export default DropdownGeneralView;
