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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  HeaderContainer,
  Screen,
  KeyboardAvoidingScrollView,
  NotesCard,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  ProductCardInfo,
  StockMoveHeader,
  CustomerDeliveryLineButtons,
  CustomerDeliveryLineQuantityCard,
  CustomerDeliveryLineTrackingNumberSelect,
  StockLocationSearchBar,
} from '../../components';
import {fetchProductWithId} from '../../features/productSlice';
import {StockMove as StockMoveType, StockMoveLine} from '../../types';
import {fetchCustomerDeliveryLine} from '../../features/customerDeliveryLineSlice';

const stockLocationScanKey =
  'from-stock-location_customer-delivery-line-update';

const CustomerDeliveryLineDetailScreen = ({route, navigation}) => {
  const {customerDelivery, customerDeliveryLineId, productId} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {StockMove} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
  });

  const {stock: stockConfig} = useSelector(state => state.appConfig);
  const {productFromId: product} = useSelector(state => state.product);
  const {customerDeliveryLine, loadingCustomerDeliveryLine} = useSelector(
    state => state.customerDeliveryLine,
  );

  const [fromStockLocation, setFromStockLocation] = useState();
  const [realQty, setRealQty] = useState(0);

  const trackingNumber = useMemo(
    () => customerDeliveryLine?.trackingNumber ?? route.params.trackingNumber,
    [customerDeliveryLine, route.params.trackingNumber],
  );

  const isTrackingNumberSelectVisible = useMemo(
    () =>
      StockMoveType.isTrackingNumberSelectVisible(
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
    setFromStockLocation(customerDeliveryLine?.fromStockLocation);
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

  const getCustomerDeliveryLine = useCallback(() => {
    dispatch(
      fetchCustomerDeliveryLine({
        customerDeliveryLineId: customerDeliveryLineId,
      }),
    );
  }, [customerDeliveryLineId, dispatch]);

  useEffect(() => {
    getCustomerDeliveryLine();
  }, [getCustomerDeliveryLine]);

  if (customerDeliveryLine?.id !== customerDeliveryLineId) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <CustomerDeliveryLineButtons
          customerDelivery={customerDelivery}
          customerDeliveryLine={customerDeliveryLine}
          realQty={realQty}
          fromStockLocation={fromStockLocation}
          visible={!readonly && !isTrackingNumberSelectVisible}
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
                ? StockMoveType.getStockMoveDate(
                    customerDelivery.statusSelect,
                    customerDelivery,
                  )
                : null
            }
            availability={customerDelivery?.availableStatusSelect}
          />
        }
      />
      <KeyboardAvoidingScrollView
        refresh={{
          loading: loadingCustomerDeliveryLine,
          fetcher: getCustomerDeliveryLine,
        }}>
        {stockConfig.isManageStockLocationOnStockMoveLine ? (
          <StockLocationSearchBar
            placeholderKey="Stock_FromStockLocation"
            defaultValue={fromStockLocation}
            onChange={setFromStockLocation}
            scanKey={stockLocationScanKey}
            isFocus={true}
            defaultStockLocation={customerDelivery.fromStockLocation}
            readOnly={
              readonly ||
              customerDelivery?.statusSelect !== StockMove?.statusSelect.Planned
            }
          />
        ) : null}
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
          visible={!readonly && isTrackingNumberSelectVisible}
        />
        <CustomerDeliveryLineQuantityCard
          customerDelivery={customerDelivery}
          customerDeliveryLine={customerDeliveryLine}
          realQty={realQty}
          setRealQty={setRealQty}
          readonly={readonly}
        />
        <NotesCard
          title={I18n.t('Stock_NotesClient')}
          data={customerDelivery?.pickingOrderComments}
        />
        <NotesCard
          title={I18n.t('Stock_LineComment')}
          data={customerDeliveryLine?.saleOrderLine?.pickingOrderInfo}
        />
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

export default CustomerDeliveryLineDetailScreen;
