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

import React, {useState, useCallback} from 'react';
import {Screen, ScrollList, HeaderContainer} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {ProductCard, ProductSearchBar} from '../../components';
import {searchProducts} from '../../features/productSlice';

const productScanKey = 'product_product-list';

const ProductListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingProduct, moreLoadingProduct, isListEndProduct, productList} =
    useSelector(state => state.product);

  const [filter, setFilter] = useState(null);
  const [navigate, setNavigate] = useState(false);

  const fetchProductsAPI = useCallback(
    (page = 0) => {
      dispatch(searchProducts({page: page}));
    },
    [dispatch],
  );

  const handleDataSearch = useCallback(searchValue => {
    setFilter(searchValue);
  }, []);

  const showProductDetails = useCallback(
    product => {
      if (product != null) {
        setNavigate(current => !current);
        navigation.navigate('ProductStockDetailsScreen', {product: product});
      }
    },
    [navigation],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <ProductSearchBar
            scanKey={productScanKey}
            onChange={showProductDetails}
            onFetchDataAction={handleDataSearch}
            showDetailsPopup={false}
            navigate={navigate}
            oneFilter={true}
            isFocus={true}
          />
        }
      />
      <ScrollList
        loadingList={loadingProduct}
        data={productList}
        renderItem={({item}) => (
          <ProductCard
            key={item.id}
            productId={item.id}
            productVersion={item.version}
            name={item.name}
            code={item.code}
            picture={item.picture}
            onPress={() => showProductDetails(item)}
          />
        )}
        fetchData={fetchProductsAPI}
        moreLoading={moreLoadingProduct}
        isListEnd={isListEndProduct}
        filter={filter != null && filter !== ''}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default ProductListScreen;
