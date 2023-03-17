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

import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Screen, ScrollList, HeaderContainer} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {ProductCard} from '../../components';
import {searchProducts} from '../../features/productSlice';
import {fetchProductsAvailability} from '../../features/productIndicatorsSlice';

const productScanKey = 'product_product-list';

const ProductListScreen = ({navigation}) => {
  const {loadingProduct, moreLoading, isListEnd, productList} = useSelector(
    state => state.product,
  );
  const {activeCompany} = useSelector(state => state.user.user);
  const {listAvailabilty} = useSelector(state => state.productIndicators);
  const [filter, setFilter] = useState(null);
  const [navigate, setNavigate] = useState(false);
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const fetchProductsAPI = useCallback(
    ({page = 0, searchValue}) => {
      if (searchValue != null && searchValue !== '') {
        setFilter(searchValue);
        dispatch(searchProducts({searchValue: searchValue, page: 0}));
      } else {
        dispatch(searchProducts({page: page}));
      }
    },
    [dispatch],
  );

  const filterProductsAPI = useCallback(
    value => fetchProductsAPI({searchValue: value}),
    [fetchProductsAPI],
  );
  const scrollProductsAPI = useCallback(
    page => fetchProductsAPI({page}),
    [fetchProductsAPI],
  );

  const showProductDetails = useCallback(
    product => {
      if (product != null) {
        setNavigate(current => !current);
        navigation.navigate('ProductStockDetailsScreen', {product: product});
      }
    },
    [navigation],
  );

  useEffect(() => {
    if (productList != null) {
      dispatch(
        fetchProductsAvailability({
          productList: productList,
          companyId: activeCompany?.id,
          stockLocationId: null,
        }),
      );
    }
  }, [activeCompany, dispatch, productList]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ScannerAutocompleteSearch
            objectList={productList}
            onChangeValue={item => showProductDetails(item)}
            fetchData={filterProductsAPI}
            displayValue={displayItemName}
            scanKeySearch={productScanKey}
            placeholder={I18n.t('Stock_Product')}
            isFocus={true}
            oneFilter={true}
            navigate={navigate}
          />
        }
      />
      <ScrollList
        loadingList={loadingProduct}
        data={productList}
        renderItem={({item, index}) => (
          <ProductCard
            key={item.id}
            style={styles.item}
            name={item.name}
            code={item.code}
            picture={item.picture == null ? null : item.picture}
            availableStock={
              listAvailabilty ? listAvailabilty[index]?.availableStock : null
            }
            onPress={() => showProductDetails(item)}
          />
        )}
        fetchData={scrollProductsAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        filter={filter != null && filter !== ''}
        translator={I18n.t}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
});

export default ProductListScreen;
