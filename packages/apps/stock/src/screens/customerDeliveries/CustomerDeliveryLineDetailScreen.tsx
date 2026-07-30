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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  HeaderContainer,
  Screen,
  KeyboardAvoidingScrollView,
  NotesCard,
  FormHtmlInput,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useContextRegister,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {fetchCustomerDeliveryLine} from '../../features/customerDeliveryLineSlice';
import {StockMove as StockMoveType, StockMoveLine} from '../../types';
import {useLineWithRack, useProductByCompany} from '../../hooks';
import {
  ProductCardInfo,
  StockMoveHeader,
  CustomerDeliveryLineButtons,
  CustomerDeliveryLineQuantityCard,
  CustomerDeliveryLineTrackingNumberSelect,
  StockLocationSearchBar,
  ClipableSaleOrderLabel,
} from '../../components';

const stockLocationScanKey =
  'from-stock-location_customer-delivery-line-update';

const CustomerDeliveryLineDetailScreen = ({route}: any) => {
  const {customerDelivery, customerDeliveryLineId, productId} =
    route?.params ?? {};
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();
  const {StockMove} = useTypes();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.stock.db.StockMoveLine',
  });
  useContextRegister({
    models: [
      {
        model: 'com.axelor.apps.stock.db.StockMoveLine',
        id: customerDeliveryLineId,
      },
    ],
  });

  const {stock: stockConfig} = useSelector(state => state.appConfig);
  const {customerDeliveryLine, loadingCustomerDeliveryLine} = useSelector(
    state => state.customerDeliveryLine,
  );

  const product = useProductByCompany(
    productId ?? customerDeliveryLine?.product?.id,
  );

  const locker = useLineWithRack(
    customerDelivery?.fromStockLocation?.id,
    customerDeliveryLine,
  );

  const [fromStockLocation, setFromStockLocation] = useState<any>();
  const [realQty, setRealQty] = useState<number>(0);
  const [description, setDescription] = useState<string | undefined>('');

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
    setDescription(customerDeliveryLine?.description ?? '');
  }, [customerDeliveryLine, customerDelivery]);

  const getCustomerDeliveryLine = useCallback(() => {
    dispatch((fetchCustomerDeliveryLine as any)({customerDeliveryLineId}));
  }, [customerDeliveryLineId, dispatch]);

  useEffect(() => {
    getCustomerDeliveryLine();
  }, [getCustomerDeliveryLine]);

  const isReadonly = useMemo(
    () =>
      readonly ||
      customerDelivery?.statusSelect !== StockMove?.statusSelect.Planned,
    [StockMove?.statusSelect.Planned, customerDelivery?.statusSelect, readonly],
  );

  if (customerDeliveryLine?.id !== customerDeliveryLineId) return null;

  return (
    <Screen
      fixedItems={
        <CustomerDeliveryLineButtons
          customerDelivery={customerDelivery}
          customerDeliveryLine={customerDeliveryLine}
          realQty={realQty}
          fromStockLocation={fromStockLocation}
          visible={!readonly && !isTrackingNumberSelectVisible}
          description={description}
        />
      }
      loading={loadingCustomerDeliveryLine}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <>
            <StockMoveHeader
              reference={customerDelivery?.stockMoveSeq}
              status={customerDelivery?.statusSelect}
              lineRef={customerDeliveryLine?.name}
              date={StockMoveType.getStockMoveDate(
                customerDelivery?.statusSelect,
                customerDelivery,
              )}
              availability={customerDeliveryLine?.availableStatusSelect}
              stockMoveLineId={customerDeliveryLine?.id}
            />
            <ClipableSaleOrderLabel
              saleOrderLine={customerDeliveryLine?.saleOrderLine}
            />
          </>
        }
      />
      <KeyboardAvoidingScrollView
        keyboardOffset={{ios: 70, android: 100}}
        refresh={{
          loading: loadingCustomerDeliveryLine,
          fetcher: getCustomerDeliveryLine,
        }}>
        <ProductCardInfo
          product={product}
          trackingNumber={trackingNumber}
          locker={locker}
        />
        <View
          style={[styles.wrapper, {backgroundColor: Colors.backgroundColor}]}>
          {stockConfig?.isManageStockLocationOnStockMoveLine ? (
            <StockLocationSearchBar
              placeholderKey="Stock_FromStockLocation"
              defaultValue={fromStockLocation}
              onChange={setFromStockLocation}
              scanKey={stockLocationScanKey}
              isFocus
              defaultStockLocation={customerDelivery.fromStockLocation}
              readonly={isReadonly}
            />
          ) : null}
          <CustomerDeliveryLineTrackingNumberSelect
            product={product}
            customerDeliveryLine={customerDeliveryLine}
            visible={!isReadonly && isTrackingNumberSelectVisible}
          />
          <CustomerDeliveryLineQuantityCard
            customerDeliveryLine={customerDeliveryLine}
            realQty={realQty}
            setRealQty={setRealQty}
            readonly={isReadonly}
          />
          <NotesCard
            title={I18n.t('Stock_PickingOrderComments')}
            data={customerDelivery?.pickingOrderComments}
          />
          <NotesCard
            title={I18n.t('Stock_LineComment')}
            data={customerDeliveryLine?.saleOrderLine?.pickingOrderInfo}
          />
          <FormHtmlInput
            title={I18n.t('Base_Description')}
            onChange={setDescription}
            defaultValue={description}
            readonly={isReadonly}
          />
        </View>
      </KeyboardAvoidingScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    width: '92%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingBottom: 10,
    marginTop: 4,
    marginBottom: 125,
  },
});

export default CustomerDeliveryLineDetailScreen;
