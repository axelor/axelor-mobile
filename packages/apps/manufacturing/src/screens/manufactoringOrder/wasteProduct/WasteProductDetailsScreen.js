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
import {StyleSheet} from 'react-native';
import {
  Picker,
  Screen,
  ScrollView,
  HeaderContainer,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {
  fetchProductWithId,
  fetchUnit,
  ProductCardInfo,
  QuantityCard,
} from '@axelor/aos-mobile-stock';
import {
  ManufacturingOrderHeader,
  ProdProductFixedItems,
} from '../../../components/organisms';
import {ManufacturingOrder} from '../../../types';
import {
  addWasteProductToManufOrder,
  updateWasteProductOfManufOrder,
} from '../../../features/wasteProductsSlice';

const WasteProductDetailsScreen = ({route, navigation}) => {
  const I18n = useTranslator();
  const manufOrder = route.params.manufOrder;
  const wasteProduct = route.params.wasteProduct;
  const {loadingProductFromId, productFromId} = useSelector(
    state => state.product,
  );
  const product = wasteProduct ? productFromId : route.params.product;
  const {unitList} = useSelector(state => state.unit);
  const [unit, setUnit] = useState(wasteProduct ? wasteProduct?.unit : null);
  const [wasteQty, setWasteQty] = useState(wasteProduct ? wasteProduct.qty : 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUnit());
    if (wasteProduct != null) {
      dispatch(fetchProductWithId(wasteProduct?.product?.id));
    }
  }, [wasteProduct, dispatch]);

  const handleShowProduct = () => {
    navigation.navigate('ProductStockDetailsScreen', {
      product: product,
    });
  };

  const handleNavigateBackToList = useCallback(() => {
    navigation.navigate('WasteProductListScreen', {
      manufOrder: manufOrder,
    });
  }, [manufOrder, navigation]);

  const handleCreateWasteProduct = useCallback(() => {
    dispatch(
      addWasteProductToManufOrder({
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
      updateWasteProductOfManufOrder({
        manufOrderId: manufOrder?.id,
        page: 0,
        prodProductVersion: wasteProduct.version,
        prodProductId: wasteProduct.id,
        qty: wasteQty,
      }),
    );
    handleNavigateBackToList();
  }, [dispatch, handleNavigateBackToList, manufOrder, wasteProduct, wasteQty]);

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        <ProdProductFixedItems
          show={
            manufOrder?.statusSelect === ManufacturingOrder.status.InProgress &&
            manufOrder?.wasteStockMove == null
          }
          prodProduct={wasteProduct}
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
      <ScrollView>
        {(product || !loadingProductFromId) && (
          <ProductCardInfo
            name={product.name}
            code={product.code}
            picture={product.picture}
            onPress={handleShowProduct}
          />
        )}
        <QuantityCard
          labelQty={I18n.t('Manufacturing_WasteQty')}
          defaultValue={wasteQty}
          editable={
            manufOrder?.statusSelect === ManufacturingOrder.status.InProgress &&
            manufOrder?.wasteStockMove == null
          }
          onValueChange={setWasteQty}
        />
        <Picker
          style={styles.picker}
          title={I18n.t('Stock_Unit')}
          onValueChange={setUnit}
          defaultValue={unit?.id}
          listItems={unitList}
          labelField="name"
          valueField="id"
          disabled={
            manufOrder.statusSelect >= ManufacturingOrder.status.Finished
          }
          disabledValue={unit?.name}
          required={true}
          isScrollViewContainer={true}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  picker: {
    marginBottom: '2%',
  },
});

export default WasteProductDetailsScreen;
