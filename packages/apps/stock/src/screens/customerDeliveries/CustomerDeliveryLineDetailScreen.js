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

import React, {useEffect, useMemo, useState} from 'react';
import {
  HeaderContainer,
  Screen,
  ScrollView,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  ProductCardInfo,
  StockMoveHeader,
  CustomerDeliveryLineButtons,
  CustomerDeliveryLineQuantityCard,
  CustomerDeliveryLineTrackingNumberSelect,
} from '../../components';
import {fetchProductWithId} from '../../features/productSlice';
import {StockMove, StockMoveLine} from '../../types';
import {fetchCustomerDeliveryLine} from '../../features/customerDeliveryLineSlice';

const CustomerDeliveryLineDetailScreen = ({route, navigation}) => {
  const {customerDelivery, customerDeliveryLineId, productId} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {productFromId: product} = useSelector(state => state.product);
  const {customerDeliveryLine, loadingCustomerDeliveryLine} = useSelector(
    state => state.customerDeliveryLine,
  );

  const [realQty, setRealQty] = useState(0);

  const trackingNumber = useMemo(
    () => customerDeliveryLine?.trackingNumber ?? route.params.trackingNumber,
    [customerDeliveryLine, route.params.trackingNumber],
  );

  const isTrackingNumberSelectVisible = useMemo(
    () =>
      StockMove.isTrackingNumberSelectVisible(
        customerDelivery?.statusSelect,
        product,
        trackingNumber,
      ),
    [customerDelivery, product, trackingNumber],
  );

  useEffect(() => {
    setRealQty(
      StockMoveLine.hideLineQty(customerDeliveryLine, customerDelivery)
        ? 0
        : customerDeliveryLine?.realQty || 0,
    );
  }, [customerDeliveryLine, customerDelivery]);

  useEffect(() => {
    dispatch(
      fetchProductWithId(productId ?? customerDeliveryLine?.product?.id),
    );
  }, [dispatch, productId, customerDeliveryLine]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  useEffect(() => {
    if (customerDeliveryLineId) {
      dispatch(
        fetchCustomerDeliveryLine({
          customerDeliveryLineId: customerDeliveryLineId,
        }),
      );
    }
  }, [dispatch, customerDeliveryLineId]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <CustomerDeliveryLineButtons
          customerDelivery={customerDelivery}
          customerDeliveryLine={customerDeliveryLine}
          realQty={realQty}
          visible={!isTrackingNumberSelectVisible}
        />
      }
      loading={loadingCustomerDeliveryLine}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <StockMoveHeader
            reference={customerDelivery?.stockMoveSeq}
            status={customerDelivery?.statusSelect}
            lineRef={customerDeliveryLine?.name}
            date={
              customerDelivery
                ? StockMove.getStockMoveDate(
                    customerDelivery.statusSelect,
                    customerDelivery,
                  )
                : null
            }
            availability={customerDelivery?.availableStatusSelect}
          />
        }
      />
      <ScrollView>
        <ProductCardInfo
          onPress={handleShowProduct}
          picture={product?.picture}
          code={product?.code}
          name={product?.name}
          trackingNumber={trackingNumber?.trackingNumberSeq}
          locker={customerDeliveryLine?.locker}
        />
        <CustomerDeliveryLineTrackingNumberSelect
          product={product}
          customerDeliveryLine={customerDeliveryLine}
          visible={isTrackingNumberSelectVisible}
        />
        <CustomerDeliveryLineQuantityCard
          customerDelivery={customerDelivery}
          customerDeliveryLine={customerDeliveryLine}
          realQty={realQty}
          setRealQty={setRealQty}
        />
        <NotesCard
          title={I18n.t('Stock_NotesClient')}
          data={customerDelivery?.pickingOrderComments}
        />
        <NotesCard
          title={I18n.t('Stock_LineComment')}
          data={customerDeliveryLine?.['saleOrderLine.pickingOrderInfo']}
        />
      </ScrollView>
    </Screen>
  );
};

export default CustomerDeliveryLineDetailScreen;
