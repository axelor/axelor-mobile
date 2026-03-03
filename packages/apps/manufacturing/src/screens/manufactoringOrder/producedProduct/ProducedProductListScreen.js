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
  ChipSelect,
  Icon,
  Screen,
  ScrollList,
  HeaderContainer,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  areObjectsEquals,
  ScannerAutocompleteSearch,
  useDispatch,
  usePermitted,
  useSelector,
  useTranslator,
  useTypes,
} from '@axelor/aos-mobile-core';
import {
  ManufacturingOrderHeader,
  ProducedProductCard,
} from '../../../components';
import {fetchProducedProducts} from '../../../features/prodProductSlice';

const productScanKey = 'product_manufacturing-order-produced-product-list';
const IS_INFINITE_SCROLL_ENABLED = false;

const ProducedProductListScreen = ({route, navigation}) => {
  const manufOrder = route.params.manufOrder;
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {canCreate} = usePermitted({
    modelName: 'com.axelor.apps.production.db.ProdProduct',
  });
  const {ManufOrder} = useTypes();

  const {loadingProducedProducts, producedProductList} = useSelector(
    state => state.prodProducts,
  );

  const [filteredList, setFilteredList] = useState(producedProductList);
  const [product, setProduct] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const fetchProducedProductsAPI = useCallback(() => {
    dispatch(
      fetchProducedProducts({
        manufOrderId: manufOrder?.id,
        manufOrderVersion: manufOrder?.version,
      }),
    );
  }, [dispatch, manufOrder]);

  const filterOnStatus = useCallback(
    list => {
      if (list == null || list?.length === 0) {
        return list;
      } else if (selectedStatus !== null && selectedStatus.length > 0) {
        return list.filter(item => {
          if (selectedStatus[0].key === 'plannedStatus') {
            return item?.plannedQty > item?.realQty;
          } else if (selectedStatus[0].key === 'realizedStatus') {
            return item?.plannedQty <= item?.realQty;
          } else {
            return item;
          }
        });
      } else {
        return list;
      }
    },
    [selectedStatus],
  );

  const filterOnProduct = useCallback((list, value) => {
    if (list == null || list?.length === 0) {
      return [];
    } else {
      if (value) {
        return list.filter(item => areObjectsEquals(item.productName, value));
      } else {
        return list;
      }
    }
  }, []);

  useEffect(() => {
    setFilteredList(
      filterOnStatus(filterOnProduct(producedProductList, product)),
    );
  }, [filterOnStatus, producedProductList, filterOnProduct, product]);

  const handleViewItem = item => {
    navigation.navigate('ProducedProductDetailsScreen', {
      manufOrderId: manufOrder.id,
      producedProdProduct: item,
    });
  };

  const handleAddProduct = () => {
    navigation.navigate('ProducedProductSelectProductScreen', {
      manufOrder: manufOrder,
    });
  };

  return (
    <Screen removeSpaceOnTop={true}>
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
              <Text>{I18n.t('Manufacturing_ProducedProduct')}</Text>
              <Icon
                name="plus-lg"
                size={20}
                color={Colors.primaryColor.background}
                touchable={true}
                visible={
                  canCreate &&
                  manufOrder?.statusSelect ===
                    ManufOrder?.statusSelect.InProgress
                }
                onPress={handleAddProduct}
              />
            </View>
            <ScannerAutocompleteSearch
              objectList={producedProductList}
              fetchData={({searchValue}) => setProduct(searchValue)}
              displayValue={item => item?.productName}
              placeholder={I18n.t('Manufacturing_Product')}
              scanKeySearch={productScanKey}
              oneFilter={true}
            />
          </>
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            selectionItems={[
              {
                title: I18n.t('Manufacturing_Status_Planned'),
                color: Colors.plannedColor,
                key: 'plannedStatus',
              },
              {
                title: I18n.t('Manufacturing_Status_Realized'),
                color: Colors.successColor,
                key: 'realizedStatus',
              },
            ]}
          />
        }
      />
      <ScrollList
        loadingList={loadingProducedProducts}
        data={filteredList}
        renderItem={({item}) => (
          <ProducedProductCard
            style={styles.item}
            productName={item?.productName}
            plannedQty={item?.plannedQty}
            producedQty={item?.realQty}
            unitName={item?.unit?.unitName}
            trackingNumberSeq={item?.trackingNumber?.trackingNumberSeq}
            onPress={() => handleViewItem(item)}
          />
        )}
        fetchData={fetchProducedProductsAPI}
        isListEnd={!IS_INFINITE_SCROLL_ENABLED}
        filter={IS_INFINITE_SCROLL_ENABLED}
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
  item: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
  action: {
    marginRight: 15,
  },
});

export default ProducedProductListScreen;
