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

import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {HeaderContainer, Screen, ScrollList} from '@axelor/aos-mobile-ui';
import {
  SaleOrderHeader,
  SaleOrderLineCard,
  SaleOrderPriceDetails,
} from '../../components';
import {fetchSaleOrderLine} from '../../features/saleOrderLineSlice';

const SaleOrderLineListScreen = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {saleOrder} = useSelector((state: any) => state.sale_saleOrder);
  const {loading, moreLoading, isListEnd, saleOrderLineList} = useSelector(
    (state: any) => state.sale_saleOrderLine,
  );

  const fetchSaleOrderLineAPI = useCallback(
    (page = 0) => {
      dispatch(
        (fetchSaleOrderLine as any)({saleOrderId: saleOrder.id, page: page}),
      );
    },
    [dispatch, saleOrder.id],
  );

  return (
    <Screen removeSpaceOnTop>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<SaleOrderHeader saleOrder={saleOrder} />}
      />
      <SaleOrderPriceDetails
        style={styles.marginVertical}
        saleOrder={saleOrder}
      />
      <ScrollList
        loadingList={loading}
        data={saleOrderLineList}
        renderItem={({item}) => (
          <SaleOrderLineCard
            {...item}
            unit={item.unit?.name}
            SOinAti={saleOrder.inAti}
            isShowEndOfPackTotal={item.isShowTotal}
            currency={saleOrder.currency}
            onPress={() =>
              navigation.navigate('SaleOrderLineDetailsScreen', {
                saleOrderLineId: item.id,
              })
            }
          />
        )}
        fetchData={fetchSaleOrderLineAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  marginVertical: {
    marginVertical: 10,
  },
});

export default SaleOrderLineListScreen;
