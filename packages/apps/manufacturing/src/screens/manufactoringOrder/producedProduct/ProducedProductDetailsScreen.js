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

import React, {useCallback, useEffect, useState} from 'react';
import {
  QuantityCard,
  Screen,
  Text,
  ScrollView,
  HeaderContainer,
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
  ManufacturingOrderHeader,
  ProdProductFixedItems,
} from '../../../components';
import {
  addProdProductToManufOrder,
  fetchProducedProductWithId,
  updateProdProductOfManufOrder,
} from '../../../features/prodProductSlice';
import {fetchManufOrder} from '../../../features/manufacturingOrderSlice';

const ProducedProductDetailsScreen = ({route, navigation}) => {
  const {manufOrderId, producedProdProduct, trackingNumber} = route.params;
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();
  const dispatch = useDispatch();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.production.db.ProdProduct',
  });
  const {ManufOrder} = useTypes();

  const {manufOrder, loadingOrder} = useSelector(
    state => state.manufacturingOrder,
  );
  const {producedProduct} = useSelector(state => state.prodProducts);

  const product = producedProdProduct ? producedProduct : route.params.product;

  const [producedQty, setProducedQty] = useState(
    producedProdProduct ? producedProdProduct.realQty : 0,
  );

  useEffect(() => {
    getManufOrderAndProducedProduct();
  }, [getManufOrderAndProducedProduct]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {product});
  };

  const handleNavigateBackToList = useCallback(() => {
    navigation.popTo('ProducedProductListScreen', {manufOrder});
  }, [manufOrder, navigation]);

  const getManufOrderAndProducedProduct = useCallback(() => {
    dispatch(fetchManufOrder({manufOrderId: manufOrderId}));
    if (producedProdProduct != null) {
      dispatch(fetchProducedProductWithId(producedProdProduct?.productId));
    }
  }, [dispatch, manufOrderId, producedProdProduct]);

  const handleCreateProducedProduct = useCallback(() => {
    dispatch(
      addProdProductToManufOrder({
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
        productId: product?.id,
        trackingNumberId: trackingNumber?.id,
        qty: producedQty,
        productType: 'produced',
      }),
    );
    handleNavigateBackToList();
  }, [
    producedQty,
    dispatch,
    handleNavigateBackToList,
    manufOrder,
    product,
    trackingNumber,
  ]);

  const handleUpdateProducedProduct = useCallback(() => {
    dispatch(
      updateProdProductOfManufOrder({
        stockMoveLineVersion: producedProdProduct?.stockMoveLineVersion,
        stockMoveLineId: producedProdProduct?.stockMoveLineId,
        prodProductQty: producedQty,
        type: 'produced',
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
      }),
    );
    handleNavigateBackToList();
  }, [
    producedProdProduct,
    producedQty,
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
            manufOrder?.statusSelect === ManufOrder?.statusSelect.InProgress
          }
          prodProduct={producedProdProduct}
          onPressCreate={handleCreateProducedProduct}
          onPressUpdate={handleUpdateProducedProduct}
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
      <ScrollView
        refresh={
          producedProdProduct != null
            ? {
                loading: loadingOrder,
                fetcher: getManufOrderAndProducedProduct,
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
        <QuantityCard
          labelQty={I18n.t('Manufacturing_ProducedQty')}
          defaultValue={producedQty}
          onValueChange={setProducedQty}
          editable={
            !readonly &&
            manufOrder?.statusSelect === ManufOrder?.statusSelect.InProgress
          }
          isBigButton={true}
          translator={I18n.t}>
          <Text>
            {`${I18n.t('Manufacturing_PlannedQty')}: ${formatNumber(
              producedProdProduct?.plannedQty,
            )} ${
              producedProdProduct
                ? producedProdProduct.unit?.unitName
                : product.unit?.name
            }`}
          </Text>
        </QuantityCard>
      </ScrollView>
    </Screen>
  );
};

export default ProducedProductDetailsScreen;
