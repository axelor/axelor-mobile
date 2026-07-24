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
    <DropdownCardSwitch
      dropdownItems={[
        {
          key: 1,
          title: I18n.t('Sale_General'),
          iconName: 'card-text',
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
          iconName: 'people-fill',
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
          iconName: 'search-dollar',
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
          iconName: 'journals',
          childrenComp: (
            <DropdownDescriptionsView
              description={saleOrder.description}
              internalNote={saleOrder.internalNote}
            />
          ),
        },
      ]}
    />
  );
};

export default SaleOrderDropdownCards;
