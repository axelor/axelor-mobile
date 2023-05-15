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
import {StyleSheet, View} from 'react-native';
import {
  Button,
  HeaderContainer,
  Icon,
  PopUpTwoButton,
  Screen,
  ScrollList,
  Text,
  useThemeColor,
  useConfig,
} from '@axelor/aos-mobile-ui';
import {
  filterList,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ManufacturingOrderHeader, WasteProductCard} from '../../../components';
import {
  clearDeclareResponse,
  declareWasteProductsOfManufOrder,
  fetchWasteProducts,
} from '../../../features/wasteProductsSlice';
import {ManufacturingOrder} from '../../../types';

const productScanKey = 'product_manufacturing-order-waste-product-list';

const WasteProductListScreen = ({route, navigation}) => {
  const manufOrder = route.params.manufOrder;
  const {setActivityIndicator} = useConfig();
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loading, moreLoading, isListEnd, wasteProductList, declareResponse} =
    useSelector(state => state.wasteProducts);

  const [isVisible, setVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const [filteredList, setFilteredList] = useState(wasteProductList);
  const [canDeclare, setDeclare] = useState(
    manufOrder?.statusSelect === ManufacturingOrder.status.InProgress &&
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

  const fetchWasteProductsAPI = useCallback(
    page => {
      dispatch(
        fetchWasteProducts({
          manufOrderId: manufOrder?.id,
          page: page,
        }),
      );
    },
    [dispatch, manufOrder],
  );

  useEffect(() => {
    setFilteredList(
      filterList(wasteProductList, 'product', 'fullName', product ?? ''),
    );
  }, [product, wasteProductList]);

  const handleViewItem = item => {
    if (item) {
      navigation.navigate('WasteProductDetailsScreen', {
        manufOrder: manufOrder,
        wasteProduct: item,
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

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={
        canDeclare &&
        !loading && (
          <Button
            title={I18n.t('Base_Declare')}
            onPress={() => setVisible(true)}
          />
        )
      }>
      <PopUpTwoButton
        visible={isVisible}
        title={I18n.t('Manufacturing_WasteDeclaration')}
        data={I18n.t('Manufacturing_ConfirmWasteDeclaration')}
        PrimaryBtnTitle={I18n.t('Base_Confirm')}
        onPressPrimary={handleDeclareWasteProduct}
        SecondaryBtnTitle={I18n.t('Base_Cancel')}
        onPressSecondary={() => setVisible(false)}
      />
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <>
            <ManufacturingOrderHeader
              parentMO={manufOrder.parentMO}
              reference={manufOrder.manufOrderSeq}
              status={manufOrder.statusSelect}
              priority={manufOrder.prioritySelect}
            />
            <View style={styles.titleContainer}>
              <Text>{I18n.t('Manufacturing_WasteDeclaration')}</Text>
              {canDeclare && (
                <Icon
                  name="plus"
                  size={20}
                  color={Colors.primaryColor.background}
                  touchable={true}
                  onPress={handleAddProduct}
                />
              )}
            </View>
            <ScannerAutocompleteSearch
              objectList={wasteProductList}
              onChangeValue={item => handleViewItem(item)}
              fetchData={({searchValue}) => setProduct(searchValue)}
              displayValue={item => item?.product?.fullName}
              placeholder={I18n.t('Manufacturing_Product')}
              scanKeySearch={productScanKey}
              oneFilter={true}
            />
          </>
        }
      />
      <ScrollList
        loadingList={loading}
        data={filteredList}
        renderItem={({item}) => (
          <WasteProductCard
            productName={item?.product?.fullName}
            wasteQty={item?.qty}
            unitName={item?.unit?.name}
            onPress={() => handleViewItem(item)}
          />
        )}
        fetchData={fetchWasteProductsAPI}
        isListEnd={isListEnd}
        moreLoading={moreLoading}
        translator={I18n.t}
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
