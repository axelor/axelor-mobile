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
  Picker,
  QuantityCard,
  Screen,
  KeyboardAvoidingScrollView,
  HeaderContainer,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {fetchUnit, ProductCardInfo} from '@axelor/aos-mobile-stock';
import {
  ManufacturingOrderHeader,
  ProdProductFixedItems,
} from '../../../components';
import {
  addWasteProductToManufOrder,
  updateWasteProductOfManufOrder,
} from '../../../features/wasteProductsSlice';
import {fetchProdProductWithId} from '../../../features/prodProductSlice';
import {fetchManufOrder} from '../../../features/manufacturingOrderSlice';

const WasteProductDetailsScreen = ({navigation, route}: any) => {
  const {manufOrderId, wasteProductId} = route?.params ?? {};
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch: any = useDispatch();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.production.db.ProdProduct',
  });
  const {ManufOrder} = useTypes();

  const {unitList} = useSelector(state => state.unit);
  const {prodProduct} = useSelector(state => state.prodProducts);
  const {manufOrder, loadingOrder} = useSelector(
    state => state.manufacturingOrder,
  );

  const [unit, setUnit] = useState<any>();
  const [wasteQty, setWasteQty] = useState(0);

  const product = useMemo(
    () =>
      wasteProductId != null ? prodProduct?.product : route.params.product,
    [prodProduct?.product, route.params.product, wasteProductId],
  );

  const handleNavigateBackToList = useCallback(() => {
    navigation.popTo('WasteProductListScreen', {manufOrder});
  }, [manufOrder, navigation]);

  const getManufOrderAndWasteProduct = useCallback(() => {
    dispatch((fetchUnit as any)());
    dispatch((fetchManufOrder as any)({manufOrderId}));
    if (wasteProductId != null) {
      dispatch((fetchProdProductWithId as any)({productId: wasteProductId}));
    }
  }, [dispatch, manufOrderId, wasteProductId]);

  useEffect(() => {
    getManufOrderAndWasteProduct();
  }, [getManufOrderAndWasteProduct]);

  useEffect(() => {
    setWasteQty(prodProduct?.qty);
    setUnit(prodProduct?.unit);
  }, [prodProduct]);

  const handleCreateWasteProduct = useCallback(() => {
    dispatch(
      (addWasteProductToManufOrder as any)({
        manufOrderVersion: manufOrder.version,
        manufOrderId: manufOrder.id,
        productId: product.id,
        qty: wasteQty,
      }),
    );
    handleNavigateBackToList();
  }, [dispatch, handleNavigateBackToList, manufOrder, product, wasteQty]);

  const handleUpdateWasteProduct = useCallback(() => {
    dispatch(
      (updateWasteProductOfManufOrder as any)({
        manufOrderId: manufOrder?.id,
        page: 0,
        prodProductVersion: prodProduct.version,
        prodProductId: prodProduct.id,
        qty: wasteQty,
      }),
    );
    handleNavigateBackToList();
  }, [dispatch, handleNavigateBackToList, manufOrder, prodProduct, wasteQty]);

  return (
    <Screen
      removeSpaceOnTop
      fixedItems={
        <ProdProductFixedItems
          show={
            manufOrder?.statusSelect === ManufOrder?.statusSelect.InProgress &&
            manufOrder?.wasteStockMove == null
          }
          prodProduct={wasteProductId != null ? prodProduct : null}
          onPressCreate={handleCreateWasteProduct}
          onPressUpdate={handleUpdateWasteProduct}
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
          wasteProductId != null
            ? {
                loading: loadingOrder,
                fetcher: getManufOrderAndWasteProduct,
              }
            : undefined
        }>
        <ProductCardInfo product={product} />
        <View
          style={[styles.wrapper, {backgroundColor: Colors.backgroundColor}]}>
          <QuantityCard
            labelQty={I18n.t('Manufacturing_WasteQty')}
            defaultValue={wasteQty}
            editable={
              !readonly &&
              manufOrder?.statusSelect ===
                ManufOrder?.statusSelect.InProgress &&
              manufOrder?.wasteStockMove == null
            }
            onValueChange={setWasteQty}
            isBigButton
            isFormWrapper
            translator={I18n.t}
          />
          <Picker
            title={I18n.t('Stock_Unit')}
            onValueChange={setUnit}
            defaultValue={unit?.id}
            listItems={unitList}
            labelField="name"
            valueField="id"
            readonly={
              readonly ||
              manufOrder.statusSelect >= ManufOrder?.statusSelect.Finished
            }
            required
            isScrollViewContainer
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

export default WasteProductDetailsScreen;
