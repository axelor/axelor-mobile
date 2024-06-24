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

import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  useDispatch,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {HeaderContainer, Screen, ScrollView} from '@axelor/aos-mobile-ui';
import {
  PartnerActionCard,
  PriceDetails,
  SaleOrderBottomButton,
  SaleOrderDropdownCards,
  SaleOrderHeader,
  SaleOrderSeeLinesButton,
} from '../../components';
import {fetchSaleOrderById} from '../../features/saleOrderSlice';

const SaleOrderDetailsScreen = ({route}) => {
  const {saleOrderId} = route?.params;
  const I18n = useTranslator();
  const {SaleOrder} = useTypes();
  const dispatch = useDispatch();

  const {loadingSaleOrder, saleOrder} = useSelector(
    (state: any) => state.sales_saleOrder,
  );

  const getSaleOrder = useCallback(() => {
    dispatch((fetchSaleOrderById as any)({saleOrderId}));
  }, [dispatch, saleOrderId]);

  useEffect(() => {
    getSaleOrder();
  }, [getSaleOrder]);

  const priceList = useMemo(
    () => [
      {
        title: I18n.t('Sales_TotalWT'),
        value: saleOrder.exTaxTotal,
        unit: saleOrder.currency?.symbol,
      },
      {
        title: I18n.t('Sales_TotalTax'),
        value: saleOrder.taxTotal,
        unit: saleOrder.currency?.symbol,
      },
      {
        title: I18n.t('Sales_TotalATI'),
        value: saleOrder.inTaxTotal,
        unit: saleOrder.currency?.symbol,
        size: 20,
        showLine: true,
      },

      {
        title: I18n.t('Sales_AmountInvoiced'),
        value: saleOrder.amountInvoiced,
        unit: saleOrder.currency?.symbol,
        hideIf: saleOrder.statusSelect <= SaleOrder?.statusSelect.Finalized,
      },
      {
        title: I18n.t('Sales_AdvanceTotal'),
        value: saleOrder.advanceTotal,
        unit: saleOrder.currency?.symbol,
        hideIf: saleOrder.statusSelect <= SaleOrder?.statusSelect.Finalized,
      },
    ],
    [I18n, SaleOrder?.statusSelect.Finalized, saleOrder],
  );

  if (saleOrder?.id !== saleOrderId) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop
      fixedItems={<SaleOrderBottomButton saleOrder={saleOrder} />}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<SaleOrderHeader saleOrder={saleOrder} />}
      />
      <ScrollView
        style={styles.scrollView}
        refresh={{loading: loadingSaleOrder, fetcher: getSaleOrder}}>
        <PriceDetails style={styles.marginBottom} lineList={priceList} />
        <PartnerActionCard partner={saleOrder.clientPartner} />
        <PartnerActionCard
          style={styles.marginBottom}
          partner={saleOrder.contactPartner}
          isContact
        />
        <SaleOrderDropdownCards saleOrder={saleOrder} />
        <SaleOrderSeeLinesButton numberLines={3} />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: null,
  },
  marginBottom: {
    marginBottom: 10,
  },
});

export default SaleOrderDetailsScreen;
