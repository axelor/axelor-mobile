/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useState} from 'react';
import {HeaderContainer, Screen, ScrollView, Text} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  fetchProductWithId,
  QuantityCard,
  ProductCardInfo,
} from '@axelor/aos-mobile-stock';
import {
  ManufacturingOrderHeader,
  ProdProductFixedItems,
} from '../../../components/organisms';
import {
  addProdProductToManufOrder,
  updateProdProductOfManufOrder,
} from '../../../features/prodProductSlice';
import {ManufacturingOrder} from '../../../types';

const ConsumedProductDetailsScreen = ({route, navigation}) => {
  const manufOrder = route.params.manufOrder;
  const consumedProduct = route.params.consumedProduct;
  const trackingNumber = route.params.trackingNumber;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );
  const product = consumedProduct ? productFromId : route.params.product;
  const [consumedQty, setConsumedQty] = useState(
    consumedProduct ? consumedProduct.realQty : 0,
  );

  useEffect(() => {
    if (consumedProduct != null) {
      dispatch(fetchProductWithId(consumedProduct.productId));
    }
  }, [consumedProduct, dispatch]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  const handleNavigateBackToList = useCallback(() => {
    navigation.navigate('ConsumedProductListScreen', {
      manufOrder: manufOrder,
    });
  }, [manufOrder, navigation]);

  const handleCreateConsumedProduct = useCallback(() => {
    dispatch(
      addProdProductToManufOrder({
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
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
    product,
    trackingNumber,
  ]);

  const handleUpdateConsumedProduct = useCallback(() => {
    dispatch(
      updateProdProductOfManufOrder({
        stockMoveLineVersion: consumedProduct?.stockMoveLineVersion,
        stockMoveLineId: consumedProduct?.stockMoveLineId,
        prodProductQty: consumedQty,
        type: 'consumed',
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
      }),
    );
    handleNavigateBackToList();
  }, [
    consumedProduct,
    consumedQty,
    dispatch,
    handleNavigateBackToList,
    manufOrder,
  ]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <ProdProductFixedItems
          show={
            manufOrder?.statusSelect === ManufacturingOrder.status.InProgress
          }
          prodProduct={consumedProduct}
          onPressCreate={handleCreateConsumedProduct}
          onPressUpdate={handleUpdateConsumedProduct}
        />
      }>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ManufacturingOrderHeader
            parentMO={manufOrder.parentMO}
            reference={manufOrder.manufOrderSeq}
            status={manufOrder.statusSelect}
            priority={manufOrder.prioritySelect}
          />
        }
      />
      <ScrollView>
        {(product || !loadingProductFromId) && (
          <ProductCardInfo
            name={product.name}
            code={product.code}
            picture={product.picture}
            trackingNumber={
              product.trackingNumberConfiguration == null ||
              trackingNumber == null
                ? null
                : trackingNumber.trackingNumberSeq
            }
            onPress={handleShowProduct}
          />
        )}
        <QuantityCard
          labelQty={I18n.t('Manufacturing_ConsumedQty')}
          defaultValue={consumedQty}
          onValueChange={setConsumedQty}
          editable={
            manufOrder?.statusSelect === ManufacturingOrder.status.InProgress
          }>
          <Text>
            {`${I18n.t('Manufacturing_PlannedQty')}: ${parseFloat(
              consumedProduct ? consumedProduct.plannedQty : 0,
            ).toFixed(2)} ${
              consumedProduct
                ? consumedProduct.unit?.unitName
                : product.unit?.name
            }`}
          </Text>
        </QuantityCard>
      </ScrollView>
    </Screen>
  );
};

export default ConsumedProductDetailsScreen;
