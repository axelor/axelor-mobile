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

import React, {useEffect, useMemo} from 'react';
import {View} from 'react-native';
import {Text} from '@axelor/aos-mobile-ui';
import {
  isEmpty,
  useNavigation,
  useSelector,
  useTranslator,
  getLastItem,
  useTypes,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {SaleOrderCard} from '../../atoms';
import {fetchSaleOrder} from '../../../features/saleOrderSlice';

const DropDownSaleOrderView = ({customerId}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {SaleOrder} = useTypes();

  const {saleOrderList} = useSelector(state => state.sale_saleOrder);

  useEffect(() => {
    dispatch((fetchSaleOrder as any)({customerId: customerId}));
  }, [customerId, dispatch]);

  const _saleOderList = useMemo(() => {
    return saleOrderList.filter(
      saleOrder =>
        saleOrder?.statusSelect === SaleOrder?.statusSelect.Confirmed ||
        saleOrder?.statusSelect === SaleOrder?.statusSelect.Completed,
    );
  }, [
    SaleOrder?.statusSelect.Completed,
    SaleOrder?.statusSelect.Confirmed,
    saleOrderList,
  ]);

  const quotationList = useMemo(() => {
    return saleOrderList.filter(
      saleOrder =>
        saleOrder?.statusSelect === SaleOrder?.statusSelect.Draft ||
        saleOrder?.statusSelect === SaleOrder?.statusSelect.Finalized,
    );
  }, [
    SaleOrder?.statusSelect.Draft,
    SaleOrder?.statusSelect.Finalized,
    saleOrderList,
  ]);

  const lastOrderList = useMemo(() => {
    return getLastItem(_saleOderList, 'creationDate');
  }, [_saleOderList]);

  const lasQuotationList = useMemo(() => {
    return getLastItem(quotationList, 'creationDate');
  }, [quotationList]);

  if (isEmpty(lastOrderList) && isEmpty(lasQuotationList)) {
    return (
      <View>
        <Text>{I18n.t('Sale_NoOrderSaleorQutotation')}</Text>
      </View>
    );
  }

  return (
    <View>
      {!isEmpty(lasQuotationList) && lasQuotationList != null && (
        <>
          <Text>{I18n.t('Sale_LastQuotation')}</Text>
          <SaleOrderCard
            statusSelect={lasQuotationList.statusSelect}
            sequence={lasQuotationList.saleOrderSeq}
            orderBeingEdited={lasQuotationList.orderBeingEdited}
            externalReference={lasQuotationList.externalReference}
            clientPartnerName={lasQuotationList.clientPartner?.fullName}
            companyName={lasQuotationList.company?.name}
            tradingName={lasQuotationList.tradingName?.name}
            orderDate={lasQuotationList.orderDate}
            WTPrice={lasQuotationList.exTaxTotal}
            ATIPrice={lasQuotationList.inTaxTotal}
            currencySymbol={lasQuotationList.currency?.symbol}
            deliveryState={lasQuotationList.deliveryState}
            invoicingState={lasQuotationList.invoicingState}
            onPress={() =>
              navigation.navigate('SaleOrderDetailsScreen', {
                saleOrderId: lasQuotationList.id,
              })
            }
          />
        </>
      )}
      {!isEmpty(lasQuotationList) && lasQuotationList != null && (
        <>
          <Text>{I18n.t('Sale_LastOrder')}</Text>
          <SaleOrderCard
            statusSelect={lastOrderList.statusSelect}
            sequence={lastOrderList.saleOrderSeq}
            orderBeingEdited={lastOrderList.orderBeingEdited}
            externalReference={lastOrderList.externalReference}
            clientPartnerName={lastOrderList.clientPartner?.fullName}
            companyName={lastOrderList.company?.name}
            tradingName={lastOrderList.tradingName?.name}
            orderDate={lastOrderList.orderDate}
            WTPrice={lastOrderList.exTaxTotal}
            ATIPrice={lastOrderList.inTaxTotal}
            currencySymbol={lastOrderList.currency?.symbol}
            deliveryState={lastOrderList.deliveryState}
            invoicingState={lastOrderList.invoicingState}
            onPress={() =>
              navigation.navigate('SaleOrderDetailsScreen', {
                saleOrderId: lastOrderList.id,
              })
            }
          />
        </>
      )}
    </View>
  );
};

export default DropDownSaleOrderView;
