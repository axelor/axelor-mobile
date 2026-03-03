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
import {useTranslator} from '@axelor/aos-mobile-core';
import {DropdownCardSwitch} from '@axelor/aos-mobile-ui';
import {
  DropdownDescriptionsView,
  DropdownFollowUpView,
  DropdownGeneralView,
  DropdownMarginView,
} from '../../atoms';

interface SaleOrderDropdownCardsProps {
  saleOrder: any;
}

const SaleOrderDropdownCards = ({saleOrder}: SaleOrderDropdownCardsProps) => {
  const I18n = useTranslator();

  return (
    <View style={styles.container}>
      <DropdownCardSwitch
        style={styles.dropdown}
        styleTitle={styles.textTitle}
        dropdownItems={[
          {
            key: 1,
            title: I18n.t('Sale_General'),
            childrenComp: (
              <DropdownGeneralView
                companyName={saleOrder.company?.name}
                tradingName={saleOrder.tradingName?.name}
                stockLocationName={saleOrder.stockLocation?.name}
                externalReference={saleOrder.externalReference}
                fiscalPositionName={saleOrder.fiscalPosition?.name}
                invoicedPartnerName={saleOrder.invoicedPartner?.fullName}
                mainInvoicingAddress={saleOrder.mainInvoicingAddressStr}
                deliveredPartnerName={saleOrder.deliveredPartner?.fullName}
                deliveryAddress={saleOrder.deliveryAddressStr}
                priceListName={saleOrder.priceList?.title}
                paymentModeName={saleOrder.paymentMode?.name}
                paymentConditionName={saleOrder.paymentCondition?.name}
              />
            ),
          },
          {
            key: 2,
            title: I18n.t('Sale_FollowUp'),
            childrenComp: (
              <DropdownFollowUpView
                opportunity={saleOrder.opportunity}
                salespersonUserName={saleOrder.salespersonUser?.fullName}
                teamName={saleOrder.team?.name}
                creationDate={saleOrder.creationDate}
                expectedRealisationDate={saleOrder.expectedRealisationDate}
                endOfValidityDate={saleOrder.endOfValidityDate}
                lastReminderDate={saleOrder.lastReminderDate}
                lastReminderComments={saleOrder.lastReminderComments}
              />
            ),
          },
          {
            key: 3,
            title: I18n.t('Sale_Margin'),
            childrenComp: (
              <DropdownMarginView
                accountedRevenue={saleOrder.accountedRevenue}
                totalCostPrice={saleOrder.totalCostPrice}
                totalGrossMargin={saleOrder.totalGrossMargin}
                marginRate={saleOrder.marginRate}
                markup={saleOrder.markup}
              />
            ),
          },
          {
            key: 4,
            title: I18n.t('Sale_Descriptions'),
            childrenComp: (
              <DropdownDescriptionsView
                description={saleOrder.description}
                internalNote={saleOrder.internalNote}
              />
            ),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
  },
  dropdown: {
    marginBottom: 0,
  },
  textTitle: {
    fontWeight: 'bold',
  },
});

export default SaleOrderDropdownCards;
