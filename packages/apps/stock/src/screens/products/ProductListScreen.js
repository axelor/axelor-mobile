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

import React, {useState, useCallback, useMemo} from 'react';
import {Screen} from '@axelor/aos-mobile-ui';
import {
  displayItemName,
  SearchListView,
  useSelector,
  useTranslator,
  SearchListAlternativeBarCode,
} from '@axelor/aos-mobile-core';
import {ProductCard} from '../../components';
import {searchProducts} from '../../features/productSlice';
import {searchAlternativeBarcode} from '../../features/alternativeBarcodeSlice';

const productScanKey = 'product_product-list';

const ProductListScreen = ({navigation}) => {
  const I18n = useTranslator();

  const {loadingProduct, moreLoadingProduct, isListEndProduct, productList} =
    useSelector(state => state.product);
  const {alternativeBarcodeList} = useSelector(
    state => state.stock_alternativeBarcode,
  );

  const [navigate, setNavigate] = useState(false);

  const showProductDetails = useCallback(
    product => {
      if (product != null) {
        setNavigate(current => !current);
        navigation.navigate('ProductStockDetailsScreen', {product: product});
      }
    },
    [navigation],
  );

  const sliceFunctionData = useMemo(
    () => ({
      alternativeBarcodeList,
    }),
    [alternativeBarcodeList],
  );

  console.log('alternativeBarcodeList', alternativeBarcodeList);

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListAlternativeBarCode
        sliceFunction={searchProducts}
        sliceFunctionData={sliceFunctionData}
        list={productList}
        loading={loadingProduct}
        moreLoading={moreLoadingProduct}
        isListEnd={isListEndProduct}
        placeholderSearchBar={I18n.t('Stock_Product')}
        displayValue={displayItemName}
        sliceBarCodeFunction={searchAlternativeBarcode}
        oneFilter={true}
      />
      <SearchListView
        list={productList}
        loading={loadingProduct}
        moreLoading={moreLoadingProduct}
        isListEnd={isListEndProduct}
        sliceFunction={searchProducts}
        sliceFunctionData={sliceFunctionData}
        onChangeSearchValue={showProductDetails}
        displaySearchValue={displayItemName}
        searchPlaceholder={I18n.t('Stock_Product')}
        searchNavigate={navigate}
        scanKeySearch={productScanKey}
        expandableFilter={false}
        renderListItem={({item}) => (
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
      />
    </Screen>
  );
};

export default ProductListScreen;
