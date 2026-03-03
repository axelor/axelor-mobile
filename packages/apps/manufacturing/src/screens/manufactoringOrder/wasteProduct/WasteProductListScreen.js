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
  Alert,
  Button,
  Icon,
  Screen,
  Text,
  useThemeColor,
  useConfig,
} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {ManufacturingOrderHeader, WasteProductCard} from '../../../components';
import {
  clearDeclareResponse,
  declareWasteProductsOfManufOrder,
  fetchWasteProducts,
} from '../../../features/wasteProductsSlice';

const productScanKey = 'product_manufacturing-order-waste-product-list';

const WasteProductListScreen = ({route, navigation}) => {
  const manufOrder = route.params.manufOrder;
  const {setActivityIndicator} = useConfig();
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.production.db.ProdProduct',
  });
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.production.db.ManufOrder',
  });
  const {ManufOrder} = useTypes();

  const {loading, moreLoading, isListEnd, wasteProductList, declareResponse} =
    useSelector(state => state.wasteProducts);

  const [isVisible, setVisible] = useState(false);
  const [canDeclare, setDeclare] = useState(
    manufOrder?.statusSelect === ManufOrder?.statusSelect.InProgress &&
      manufOrder?.wasteStockMove == null,
  );

  useEffect(() => {
    if (declareResponse) {
      setActivityIndicator(false);
      if (declareResponse.stockMoveCreated) {
        setDeclare(false);
        manufOrder.wasteStockMove = declareResponse.wasteStockMove;
      }
      dispatch(clearDeclareResponse());
    }
  }, [declareResponse, dispatch, manufOrder, setActivityIndicator]);

  const handleViewItem = item => {
    if (item) {
      navigation.navigate('WasteProductDetailsScreen', {
        manufOrderId: manufOrder?.id,
        wasteProductId: item?.id,
      });
    }
  };

  const handleAddProduct = () => {
    navigation.navigate('WasteProductSelectProductScreen', {
      manufOrder: manufOrder,
    });
  };

  const handleDeclareWasteProduct = useCallback(() => {
    setVisible(false);
    setActivityIndicator(true);
    dispatch(
      declareWasteProductsOfManufOrder({
        manufOrderVersion: manufOrder.version,
        manufOrderId: manufOrder.id,
      }),
    );
  }, [dispatch, manufOrder, setActivityIndicator]);

  const sliceFunctionData = useMemo(
    () => ({
      manufOrderId: manufOrder?.id,
    }),
    [manufOrder?.id],
  );

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        !readonly &&
        canDeclare &&
        !loading && (
          <Button
            title={I18n.t('Base_Declare')}
            onPress={() => setVisible(true)}
          />
        )
      }>
      <Alert
        visible={isVisible}
        title={I18n.t('Manufacturing_WasteDeclaration')}
        cancelButtonConfig={{onPress: () => setVisible(false)}}
        confirmButtonConfig={{
          title: I18n.t('Base_Confirm'),
          onPress: handleDeclareWasteProduct,
        }}
        translator={I18n.t}>
        <Text>{I18n.t('Manufacturing_ConfirmWasteDeclaration')}</Text>
      </Alert>
      <SearchListView
        list={wasteProductList}
        loading={loading}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={fetchWasteProducts}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={handleViewItem}
        displaySearchValue={item => item?.product?.fullName}
        searchPlaceholder={I18n.t('Manufacturing_Product')}
        scanKeySearch={productScanKey}
        expandableFilter={false}
        topFixedItems={
          <>
            <ManufacturingOrderHeader
              parentMO={manufOrder.parentMO}
              reference={manufOrder.manufOrderSeq}
              status={manufOrder.statusSelect}
              priority={manufOrder.prioritySelect}
            />
            <View style={styles.titleContainer}>
              <Text>{I18n.t('Manufacturing_WasteDeclaration')}</Text>
              <Icon
                name="plus-lg"
                size={20}
                color={Colors.primaryColor.background}
                touchable={true}
                visible={canCreate && canDeclare}
                onPress={handleAddProduct}
              />
            </View>
          </>
        }
        renderListItem={({item}) => (
          <WasteProductCard
            productName={item?.product?.fullName}
            wasteQty={item?.qty}
            unitName={item?.unit?.name}
            onPress={() => handleViewItem(item)}
          />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    marginBottom: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
  },
});

export default WasteProductListScreen;
