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
  addConsumedProductToOperationOrder,
  fetchConsumedProductWithId,
  updateConsumedProductOfOperationOrder,
  updateProdProductOfManufOrder,
} from '../../../features/prodProductSlice';
import {fetchManufOrder} from '../../../features/manufacturingOrderSlice';
import {fetchOperationOrderById} from '../../../features/operationOrderSlice';
import {
  CONSUMED_PRODUCT_CONTEXT,
  getConsumedProductScreenNames,
} from '../../../utils/consumedProductConsts';

const ConsumedProductDetailsScreen = ({route, navigation}) => {
  const context =
    route?.params?.context ?? CONSUMED_PRODUCT_CONTEXT.MANUF_ORDER;
  const isOperationOrderContext =
    context === CONSUMED_PRODUCT_CONTEXT.OPERATION_ORDER;
  const manufOrderId = route?.params?.manufOrderId;
  const operationOrderId =
    route?.params?.operationOrderId ?? route?.params?.operationOrder?.id;
  const consumedProdProduct = route?.params?.consumedProdProduct;
  const manufOrderFromRoute = route?.params?.manufOrder;
  const operationOrderFromRoute = route?.params?.operationOrder;
  const routeProduct = route?.params?.product;
  const routeTrackingNumber = route?.params?.trackingNumber;
  const screenNames = getConsumedProductScreenNames(context);
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
  const {operationOrder: operationOrderState, loadingOrder: loadingOperation} =
    useSelector(state => state.operationOrder);

  const currentManufOrder =
    manufOrder?.id != null ? manufOrder : manufOrderFromRoute;
  const currentOperationOrder = isOperationOrderContext
    ? operationOrderState?.id != null
      ? operationOrderState
      : operationOrderFromRoute
    : null;

  const product = consumedProdProduct ? consumedProduct : routeProduct;

  const [consumedQty, setConsumedQty] = useState(
    consumedProdProduct ? consumedProdProduct.realQty : 0,
  );

  const trackingNumber = useMemo(() => {
    if (
      consumedProdProduct?.stockMoveLineId === consumedProductStockMoveLine?.id
    ) {
      return consumedProductStockMoveLine.trackingNumber;
    }
    if (routeTrackingNumber || consumedProdProduct?.trackingNumber) {
      return routeTrackingNumber ?? consumedProdProduct?.trackingNumber;
    }

    return null;
  }, [routeTrackingNumber, consumedProdProduct, consumedProductStockMoveLine]);

  const isTrackingNumberSelectVisible = useMemo(
    () =>
      product?.trackingNumberConfiguration != null && trackingNumber == null,
    [product, trackingNumber],
  );

  const getOrderAndConsumedProduct = useCallback(() => {
    if (isOperationOrderContext) {
      if (operationOrderId != null) {
        dispatch(fetchOperationOrderById({operationOrderId}));
      }
    } else if (manufOrderId != null) {
      dispatch(fetchManufOrder({manufOrderId: manufOrderId}));
    }

    if (consumedProdProduct != null) {
      dispatch(fetchConsumedProductWithId(consumedProdProduct?.productId));
    }
  }, [
    consumedProdProduct,
    dispatch,
    isOperationOrderContext,
    manufOrderId,
    operationOrderId,
  ]);

  useEffect(() => {
    getOrderAndConsumedProduct();
  }, [getOrderAndConsumedProduct]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  const handleNavigateBackToList = useCallback(() => {
    const params = {
      context,
      manufOrder: currentManufOrder,
    };

    if (isOperationOrderContext) {
      params.operationOrder = currentOperationOrder;
    }

    navigation.popTo(screenNames.list, params);
  }, [
    context,
    currentManufOrder,
    currentOperationOrder,
    isOperationOrderContext,
    navigation,
    screenNames.list,
  ]);

  const handleCreateConsumedProduct = useCallback(() => {
    if (isOperationOrderContext) {
      if (currentOperationOrder?.id == null) {
        return;
      }

      dispatch(
        addConsumedProductToOperationOrder({
          operationOrderId: currentOperationOrder?.id,
          operationOrderVersion: currentOperationOrder?.version,
          productId: product?.id,
          trackingNumberId: trackingNumber?.id,
          qty: consumedQty,
        }),
      );
    } else {
      if (currentManufOrder?.id == null) {
        return;
      }

      dispatch(
        addProdProductToManufOrder({
          manufOrderId: currentManufOrder?.id,
          manufOrderVersion: currentManufOrder?.version,
          productId: product?.id,
          trackingNumberId: trackingNumber?.id,
          qty: consumedQty,
          productType: 'consumed',
        }),
      );
    }

    handleNavigateBackToList();
  }, [
    consumedQty,
    currentManufOrder,
    currentOperationOrder,
    dispatch,
    handleNavigateBackToList,
    isOperationOrderContext,
    product,
    trackingNumber,
  ]);

  const stockMoveLineVersion =
    consumedProdProduct?.stockMoveLineId === consumedProductStockMoveLine?.id
      ? consumedProductStockMoveLine?.version
      : consumedProdProduct?.stockMoveLineVersion;

  const handleUpdateConsumedProduct = useCallback(() => {
    if (isOperationOrderContext) {
      if (currentOperationOrder?.id == null) {
        return;
      }

      dispatch(
        updateConsumedProductOfOperationOrder({
          operationOrderId: currentOperationOrder?.id,
          operationOrderVersion: currentOperationOrder?.version,
          productId: consumedProdProduct?.productId ?? product?.id,
          trackingNumberId: trackingNumber?.id,
          qty: consumedQty,
          stockMoveLineId: consumedProdProduct?.stockMoveLineId,
        }),
      );
    } else {
      if (currentManufOrder?.id == null) {
        return;
      }

      dispatch(
        updateProdProductOfManufOrder({
          stockMoveLineVersion,
          stockMoveLineId: consumedProdProduct?.stockMoveLineId,
          prodProductQty: consumedQty,
          type: 'consumed',
          manufOrderId: currentManufOrder?.id,
          manufOrderVersion: currentManufOrder?.version,
        }),
      );
    }

    handleNavigateBackToList();
  }, [
    consumedProdProduct,
    consumedQty,
    currentManufOrder,
    currentOperationOrder,
    dispatch,
    handleNavigateBackToList,
    isOperationOrderContext,
    product,
    stockMoveLineVersion,
    trackingNumber,
  ]);

  const isEditableStatus = isOperationOrderContext
    ? currentOperationOrder?.statusSelect ===
      OperationOrder?.statusSelect.InProgress
    : currentManufOrder?.statusSelect === ManufOrder?.statusSelect.InProgress;

  const currentLoading = isOperationOrderContext
    ? loadingOperation
    : loadingOrder;

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
          <>
            {!isOperationOrderContext && currentManufOrder != null && (
              <ManufacturingOrderHeader
                parentMO={currentManufOrder?.parentMO}
                reference={currentManufOrder?.manufOrderSeq}
                status={currentManufOrder?.statusSelect}
                priority={currentManufOrder?.prioritySelect}
              />
            )}
            {isOperationOrderContext && currentOperationOrder != null && (
              <OperationOrderHeader
                manufOrderRef={currentManufOrder?.manufOrderSeq}
                name={currentOperationOrder?.operationName}
                status={currentOperationOrder?.statusSelect}
                priority={currentOperationOrder?.priority}
              />
            )}
          </>
        }
      />
      <ScrollView
        refresh={
          consumedProdProduct != null
            ? {
                loading: currentLoading,
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
          stockMoveLineVersion={stockMoveLineVersion}
          manufOrderId={currentManufOrder?.id}
          manufOrderVersion={currentManufOrder?.version}
          operationOrderId={currentOperationOrder?.id}
          operationOrderVersion={currentOperationOrder?.version}
          context={context}
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
