/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useMemo, useState} from 'react';
import {ChipSelect, Screen} from '@axelor/aos-mobile-ui';
import {
  SearchListView,
  displayItemName,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {searchProduct} from '../../features/productSlice';
import {ProductCard, ProductCategorySearchBar} from '../../components';

const ProductSaleListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const {SaleProduct} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const [productTypeSelect, setProductTypeSelect] = useState();
  const [productCategory, setProductCategory] = useState();

  const {productList, moreLoading, isListEnd, loadingList} = useSelector(
    (state: any) => state.sale_product,
  );

  const productTypeSelectList = useMemo(
    () => getSelectionItems(SaleProduct?.productTypeSelect, productTypeSelect),
    [SaleProduct?.productTypeSelect, getSelectionItems, productTypeSelect],
  );

  const sliceFunctionData = useMemo(
    () => ({
      productTypeSelect: productTypeSelect,
      productCategory: productCategory,
    }),
    [productCategory, productTypeSelect],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <SearchListView
        list={productList}
        loading={loadingList}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        sliceFunction={searchProduct}
        sliceFunctionData={sliceFunctionData}
        displaySearchValue={displayItemName}
        searchPlaceholder={I18n.t('Base_Search')}
        headerChildren={
          <ProductCategorySearchBar
            defaultValue={productCategory}
            onChange={setProductCategory}
          />
        }
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={setProductTypeSelect}
            selectionItems={productTypeSelectList}
          />
        }
        renderListItem={({item}) => (
          <ProductCard
            onPress={() => {
              navigation.navigate('ProductSaleDetailsScreen', {
                productId: item.id,
              });
            }}
            picture={item.picture}
            name={item.name}
            code={item.code}
            productFamily={item.productFamily?.name}
            productCategory={item.productCategory?.name}
            description={item.description}
            isConfigurator={item.configurator?.id != null}
            unit={item.saleCurrency?.symbol}
            salePrice={item.salePrice}
          />
        )}
      />
    </Screen>
  );
};

export default ProductSaleListScreen;