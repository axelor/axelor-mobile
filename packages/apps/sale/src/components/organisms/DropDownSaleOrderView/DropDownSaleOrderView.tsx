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

import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  isEmpty,
  useNavigation,
  useSelector,
  useTranslator,
  getLastItem,
  useTypes,
  useDispatch,
  useIsFocused,
} from '@axelor/aos-mobile-core';
import {SaleOrderCard} from '../../atoms';
import {fetchSaleOrder} from '../../../features/saleOrderSlice';

const DropDownSaleOrderView = ({customer}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Colors = useThemeColor();
  const isFocused = useIsFocused();

  const {SaleOrder} = useTypes();

  const {user} = useSelector(state => state.user);
  const {saleOrderList} = useSelector(state => state.sale_saleOrder);

  useEffect(() => {
    if (isFocused) {
      dispatch(
        (fetchSaleOrder as any)({
          customerId: customer?.id,
          companyId: user.activeCompany?.id,
        }),
      );
    }
  }, [customer, dispatch, isFocused, user.activeCompany?.id]);

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

  const _quotationList = useMemo(() => {
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

  const lastOrder = useMemo(() => {
    return getLastItem(_saleOderList, 'creationDate');
  }, [_saleOderList]);

  const lasQuotation = useMemo(() => {
    return getLastItem(_quotationList, 'creationDate');
  }, [_quotationList]);

  const SeeMoreIcon = useCallback(
    screen => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screen, {customer: customer});
          }}
          activeOpacity={0.9}>
          <View style={styles.iconContainer}>
            <Text style={styles.txtDetails}>{I18n.t('Base_ViewAll')}</Text>
            <Icon
              name="chevron-right"
              color={Colors.secondaryColor.background_light}
              size={20}
            />
          </View>
        </TouchableOpacity>
      );
    },
    [Colors.secondaryColor.background_light, I18n, customer, navigation],
  );

  if (isEmpty(lastOrder) && isEmpty(lasQuotation)) {
    return (
      <View>
        <Text>{I18n.t('Sale_NoSaleOrderOrQuotation')}</Text>
      </View>
    );
  }

  return (
    <View>
      {!isEmpty(lasQuotation) && (
        <>
          <Text>{I18n.t('Sale_LastQuotation')}</Text>
          <SaleOrderCard
            statusSelect={lasQuotation.statusSelect}
            sequence={lasQuotation.saleOrderSeq}
            orderBeingEdited={lasQuotation.orderBeingEdited}
            externalReference={lasQuotation.externalReference}
            clientPartnerName={lasQuotation.clientPartner?.fullName}
            companyName={lasQuotation.company?.name}
            tradingName={lasQuotation.tradingName?.name}
            orderDate={lasQuotation.orderDate}
            WTPrice={lasQuotation.exTaxTotal}
            ATIPrice={lasQuotation.inTaxTotal}
            currency={lasQuotation.currency}
            deliveryState={lasQuotation.deliveryState}
            invoicingState={lasQuotation.invoicingState}
            onPress={() =>
              navigation.navigate('SaleOrderDetailsScreen', {
                saleOrderId: lasQuotation.id,
              })
            }
          />
          {SeeMoreIcon('SaleQuotationsScreen')}
        </>
      )}
      {!isEmpty(lastOrder) && (
        <>
          <Text>{I18n.t('Sale_LastOrder')}</Text>
          <SaleOrderCard
            statusSelect={lastOrder.statusSelect}
            sequence={lastOrder.saleOrderSeq}
            orderBeingEdited={lastOrder.orderBeingEdited}
            externalReference={lastOrder.externalReference}
            clientPartnerName={lastOrder.clientPartner?.fullName}
            companyName={lastOrder.company?.name}
            tradingName={lastOrder.tradingName?.name}
            orderDate={lastOrder.orderDate}
            WTPrice={lastOrder.exTaxTotal}
            ATIPrice={lastOrder.inTaxTotal}
            currency={lastOrder.currency}
            deliveryState={lastOrder.deliveryState}
            invoicingState={lastOrder.invoicingState}
            onPress={() =>
              navigation.navigate('SaleOrderDetailsScreen', {
                saleOrderId: lastOrder.id,
              })
            }
          />
          {SeeMoreIcon('SaleOrdersScreen')}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 2,
    elevation: 3,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
  },
  txtDetails: {
    fontSize: 14,
    marginHorizontal: 15,
  },
});

export default DropDownSaleOrderView;
