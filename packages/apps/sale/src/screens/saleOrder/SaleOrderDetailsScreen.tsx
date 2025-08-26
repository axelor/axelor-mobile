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

import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {HeaderContainer, Screen, ScrollView, Text} from '@axelor/aos-mobile-ui';
import {
  PartnerActionCard,
  SaleOrderBottomButton,
  SaleOrderDropdownCards,
  SaleOrderHeader,
  SaleOrderPriceDetails,
  SaleOrderSeeLinesButton,
} from '../../components';
import {fetchSaleOrderById} from '../../features/saleOrderSlice';
import {fetchSaleOrderLine} from '../../features/saleOrderLineSlice';

const SaleOrderDetailsScreen = ({route}) => {
  const {saleOrderId} = route?.params;
  const dispatch = useDispatch();
  const I18n = useTranslator();

  const {loadingSaleOrder, saleOrder} = useSelector(
    (state: any) => state.sale_saleOrder,
  );
  const {totalSaleOrderLine} = useSelector(
    (state: any) => state.sale_saleOrderLine,
  );
  const {base: baseConfig} = useSelector((state: any) => state.appConfig);

  const getSaleOrder = useCallback(() => {
    dispatch((fetchSaleOrderById as any)({saleOrderId}));
  }, [dispatch, saleOrderId]);

  useEffect(() => {
    getSaleOrder();
  }, [getSaleOrder]);

  useEffect(() => {
    dispatch((fetchSaleOrderLine as any)({saleOrderId}));
  }, [dispatch, saleOrderId]);

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
        <SaleOrderPriceDetails
          style={styles.marginBottom}
          saleOrder={saleOrder}
        />
        <PartnerActionCard partner={saleOrder.clientPartner} />
        <PartnerActionCard
          style={styles.marginBottom}
          partner={saleOrder.contactPartner}
          isContact
        />
        {baseConfig?.activatePartnerRelations && (
          <>
            {saleOrder.invoicedPartner &&
              saleOrder.invoicedPartner.id !== saleOrder.clientPartner?.id && (
                <>
                  <Text style={styles.title} writingType="important">
                    {I18n.t('Sale_InvoicedPartner')}
                  </Text>
                  <PartnerActionCard partner={saleOrder.invoicedPartner} />
                </>
              )}
            {saleOrder.deliveredPartner &&
              saleOrder.deliveredPartner.id !== saleOrder.clientPartner?.id && (
                <>
                  <Text style={styles.title} writingType="important">
                    {I18n.t('Sale_DeliveredPartner')}
                  </Text>
                  <PartnerActionCard
                    style={styles.marginBottom}
                    partner={saleOrder.deliveredPartner}
                  />
                </>
              )}
          </>
        )}
        <SaleOrderDropdownCards saleOrder={saleOrder} />
        <SaleOrderSeeLinesButton numberLines={totalSaleOrderLine} />
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
  title: {
    marginHorizontal: 20,
  },
});

export default SaleOrderDetailsScreen;
