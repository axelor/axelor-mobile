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
  KeyboardAvoidingScrollView,
  QuantityCard,
  Screen,
  Text,
  useDigitFormat,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {ProductCardInfo} from '@axelor/aos-mobile-stock';
import {
  ConsumedProductTrackingNumberSelect,
  ManufacturingOrderHeader,
  OperationOrderHeader,
  ProdProductFixedItems,
} from '../../../components';
import {
  addProdProductToManufOrder,
  addProdProductToOperationOrder,
  fetchConsumedProductWithId,
  updateProdProductOfManufOrder,
} from '../../../features/prodProductSlice';
import {fetchManufOrder} from '../../../features/manufacturingOrderSlice';
import {fetchOperationOrderById} from '../../../features/operationOrderSlice';

const ConsumedProductDetailsScreen = ({navigation, route}: any) => {
  const {operationOrderId, manufOrderId, consumedProdProduct} =
    route?.params ?? {};
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const formatNumber = useDigitFormat();
  const dispatch: any = useDispatch();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.production.db.ProdProduct',
  });
  const {ManufOrder, OperationOrder} = useTypes();

  const {consumedProductStockMoveLine, consumedProduct} = useSelector(
    state => state.prodProducts,
  );
  const {manufOrder, loadingOrder} = useSelector(
    state => state.manufacturingOrder,
  );
  const {operationOrder: _operationOrder, loadingOrder: loadingOperation} =
    useSelector(state => state.operationOrder);

  const operationOrder = useMemo(
    () =>
      _operationOrder?.id === operationOrderId ? _operationOrder : undefined,
    [_operationOrder, operationOrderId],
  );

  const isEditableStatus = useMemo(
    () =>
      operationOrderId != null
        ? operationOrder?.statusSelect ===
          OperationOrder?.statusSelect.InProgress
        : manufOrder?.statusSelect === ManufOrder?.statusSelect.InProgress,
    [
      ManufOrder?.statusSelect,
      OperationOrder?.statusSelect,
      manufOrder?.statusSelect,
      operationOrder?.statusSelect,
      operationOrderId,
    ],
  );

  const product = consumedProdProduct ? consumedProduct : route.params.product;

  const [consumedQty, setConsumedQty] = useState(
    consumedProdProduct ? consumedProdProduct.realQty : 0,
  );

  const trackingNumber = useMemo(() => {
    if (
      consumedProdProduct &&
      consumedProdProduct?.stockMoveLineId === consumedProductStockMoveLine?.id
    ) {
      return consumedProductStockMoveLine.trackingNumber;
    } else if (
      route.params.trackingNumber ||
      consumedProdProduct?.trackingNumber
    ) {
      return route.params.trackingNumber ?? consumedProdProduct?.trackingNumber;
    } else {
      return null;
    }
  }, [
    route.params.trackingNumber,
    consumedProdProduct,
    consumedProductStockMoveLine,
  ]);

  const isTrackingNumberSelectVisible = useMemo(
    () =>
      product?.trackingNumberConfiguration != null && trackingNumber == null,
    [product, trackingNumber],
  );

  const getOrderAndConsumedProduct = useCallback(() => {
    if (operationOrderId != null) {
      dispatch((fetchOperationOrderById as any)({operationOrderId}));
    }

    if (manufOrderId != null)
      dispatch((fetchManufOrder as any)({manufOrderId}));

    if (consumedProdProduct != null) {
      dispatch(
        (fetchConsumedProductWithId as any)(consumedProdProduct?.productId),
      );
    }
  }, [consumedProdProduct, dispatch, manufOrderId, operationOrderId]);

  useEffect(() => {
    getOrderAndConsumedProduct();
  }, [getOrderAndConsumedProduct]);

  const handleNavigateBackToList = useCallback(() => {
    navigation.popTo('ConsumedProductListScreen', {
      manufOrder,
      operationOrderId,
    });
  }, [navigation, manufOrder, operationOrderId]);

  const handleCreateConsumedProduct = useCallback(() => {
    const sliceFct: any = operationOrderId
      ? addProdProductToOperationOrder
      : addProdProductToManufOrder;

    dispatch(
      sliceFct({
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
        operationOrderId: operationOrder?.id,
        operationOrderVersion: operationOrder?.version,
        productId: product?.id,
        trackingNumberId: trackingNumber?.id,
        qty: consumedQty,
        productType: 'consumed',
      }),
    );

    handleNavigateBackToList();
  }, [
    consumedQty,
    dispatch,
    handleNavigateBackToList,
    manufOrder,
    operationOrder,
    operationOrderId,
    product,
    trackingNumber,
  ]);

  const handleUpdateConsumedProduct = useCallback(() => {
    dispatch(
      (updateProdProductOfManufOrder as any)({
        stockMoveLineVersion:
          consumedProdProduct?.stockMoveLineId ===
          consumedProductStockMoveLine?.id
            ? consumedProductStockMoveLine?.version
            : consumedProdProduct?.stockMoveLineVersion,
        stockMoveLineId: consumedProdProduct?.stockMoveLineId,
        prodProductQty: consumedQty,
        type: 'consumed',
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
        operationOrderId: operationOrder?.id,
        operationOrderVersion: operationOrder?.version,
      }),
    );

    handleNavigateBackToList();
  }, [
    consumedProdProduct,
    consumedProductStockMoveLine,
    consumedQty,
    dispatch,
    handleNavigateBackToList,
    manufOrder,
    operationOrder,
  ]);

  return (
    <Screen
      fixedItems={
        <ProdProductFixedItems
          show={isEditableStatus}
          prodProduct={consumedProdProduct}
          onPressCreate={handleCreateConsumedProduct}
          onPressUpdate={handleUpdateConsumedProduct}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          operationOrderId != null ? (
            <OperationOrderHeader
              manufOrderRef={manufOrder?.manufOrderSeq}
              name={operationOrder?.operationName}
              status={operationOrder?.statusSelect}
              priority={operationOrder?.priority}
            />
          ) : (
            <ManufacturingOrderHeader
              parentMO={manufOrder?.parentMO}
              reference={manufOrder?.manufOrderSeq}
              status={manufOrder?.statusSelect}
              priority={manufOrder?.prioritySelect}
            />
          )
        }
      />
      <KeyboardAvoidingScrollView
        keyboardOffset={{ios: 70, android: 100}}
        refresh={
          consumedProdProduct != null
            ? {
                loading: loadingOperation || loadingOrder,
                fetcher: getOrderAndConsumedProduct,
              }
            : undefined
        }>
        <ProductCardInfo
          product={product}
          trackingNumber={
            product?.trackingNumberConfiguration == null ? null : trackingNumber
          }
        />
        <View
          style={[styles.wrapper, {backgroundColor: Colors.backgroundColor}]}>
          <ConsumedProductTrackingNumberSelect
            product={product}
            stockMoveLineId={consumedProdProduct?.stockMoveLineId}
            stockMoveLineVersion={consumedProdProduct?.stockMoveLineVersion}
            manufOrderId={manufOrder?.id}
            manufOrderVersion={manufOrder?.version}
            operationOrderId={operationOrder?.id}
            operationOrderVersion={operationOrder?.version}
            visible={!readonly && isTrackingNumberSelectVisible}
          />
          <QuantityCard
            labelQty={I18n.t('Manufacturing_ConsumedQty')}
            defaultValue={consumedQty}
            onValueChange={setConsumedQty}
            editable={!readonly && isEditableStatus}
            isBigButton
            isFormWrapper
            translator={I18n.t}>
            <Text>
              {`${I18n.t('Manufacturing_PlannedQty')}: ${formatNumber(
                consumedProdProduct?.plannedQty,
              )} ${
                consumedProdProduct
                  ? consumedProdProduct.unit?.unitName
                  : product.unit?.name
              }`}
            </Text>
          </QuantityCard>
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

export default ConsumedProductDetailsScreen;
