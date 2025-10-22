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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  HeaderContainer,
  QuantityCard,
  Screen,
  ScrollView,
  Text,
  useDigitFormat,
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

const ConsumedProductDetailsScreen = ({route, navigation}) => {
  const {operationOrderId, manufOrderId, consumedProdProduct} =
    route?.params ?? {};
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const dispatch = useDispatch();
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
      dispatch(fetchOperationOrderById({operationOrderId}));
    }

    if (manufOrderId != null) dispatch(fetchManufOrder({manufOrderId}));

    if (consumedProdProduct != null) {
      dispatch(fetchConsumedProductWithId(consumedProdProduct?.productId));
    }
  }, [consumedProdProduct, dispatch, manufOrderId, operationOrderId]);

  useEffect(() => {
    getOrderAndConsumedProduct();
  }, [getOrderAndConsumedProduct]);

  const handleShowProduct = useCallback(() => {
    navigation.navigate('ProductStockDetailsScreen', {product});
  }, [navigation, product]);

  const handleNavigateBackToList = useCallback(() => {
    navigation.popTo('ConsumedProductListScreen', {
      manufOrder,
      operationOrderId,
    });
  }, [navigation, manufOrder, operationOrderId]);

  const handleCreateConsumedProduct = useCallback(() => {
    const sliceFct = operationOrderId
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
      updateProdProductOfManufOrder({
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
      removeSpaceOnTop={true}
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
      <ScrollView
        refresh={
          consumedProdProduct != null
            ? {
                loading: loadingOperation || loadingOrder,
                fetcher: getOrderAndConsumedProduct,
              }
            : null
        }>
        <ProductCardInfo
          name={product?.name}
          code={product?.code}
          picture={product?.picture}
          trackingNumber={
            product?.trackingNumberConfiguration == null ||
            trackingNumber == null
              ? null
              : trackingNumber.trackingNumberSeq
          }
          onPress={handleShowProduct}
        />
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
          isBigButton={true}
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
      </ScrollView>
    </Screen>
  );
};

export default ConsumedProductDetailsScreen;
