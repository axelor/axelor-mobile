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
import {StyleSheet, View} from 'react-native';
import {
  QuantityCard,
  Screen,
  Text,
  KeyboardAvoidingScrollView,
  HeaderContainer,
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
  ManufacturingOrderHeader,
  ProdProductFixedItems,
} from '../../../components';
import {
  addProdProductToManufOrder,
  fetchProducedProductWithId,
  updateProdProductOfManufOrder,
} from '../../../features/prodProductSlice';
import {fetchManufOrder} from '../../../features/manufacturingOrderSlice';

const ProducedProductDetailsScreen = ({navigation, route}: any) => {
  const {manufOrderId, producedProdProduct, trackingNumber} = route.params;
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const formatNumber = useDigitFormat();
  const dispatch: any = useDispatch();
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

  const handleNavigateBackToList = useCallback(() => {
    navigation.popTo('ProducedProductListScreen', {manufOrder});
  }, [manufOrder, navigation]);

  const getManufOrderAndProducedProduct = useCallback(() => {
    dispatch((fetchManufOrder as any)({manufOrderId}));
    if (producedProdProduct != null) {
      dispatch(
        (fetchProducedProductWithId as any)(producedProdProduct?.productId),
      );
    }
  }, [dispatch, manufOrderId, producedProdProduct]);

  useEffect(() => {
    getManufOrderAndProducedProduct();
  }, [getManufOrderAndProducedProduct]);

  const handleCreateProducedProduct = useCallback(() => {
    dispatch(
      (addProdProductToManufOrder as any)({
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
      (updateProdProductOfManufOrder as any)({
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
      <KeyboardAvoidingScrollView
        keyboardOffset={{ios: 70, android: 100}}
        refresh={
          producedProdProduct != null
            ? {
                loading: loadingOrder,
                fetcher: getManufOrderAndProducedProduct,
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
          <QuantityCard
            labelQty={I18n.t('Manufacturing_ProducedQty')}
            defaultValue={producedQty}
            onValueChange={setProducedQty}
            editable={
              !readonly &&
              manufOrder?.statusSelect === ManufOrder?.statusSelect.InProgress
            }
            isBigButton
            isFormWrapper
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

export default ProducedProductDetailsScreen;
