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

import React, {useCallback, useMemo, useState} from 'react';
import {ChipSelect, Screen} from '@axelor/aos-mobile-ui';
import {
  DoubleScannerSearchBar,
  SearchListView,
  displayItemName,
  useSelector,
  useTranslator,
  useTypeHelpers,
  useTypes,
} from '@axelor/aos-mobile-core';
import {searchProduct} from '../../features/productSlice';
import {searchAlternativeBarcode} from '../../features/alternativeBarcodeSlice';
import {ProductCard, ProductCategorySearchBar} from '../../components';

const productScanKey = 'product_sale_product-list';
const barCodeScanKey = `${productScanKey}_alternative-barcode`;

const ProductSaleListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const {SaleProduct} = useTypes();
  const {getSelectionItems} = useTypeHelpers();

  const [productTypeSelect, setProductTypeSelect] = useState();
  const [productCategory, setProductCategory] = useState();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {mobileSettings} = useSelector((state: any) => state.appConfig);
  const {productList, moreLoading, isListEnd, loadingList} = useSelector(
    (state: any) => state.sale_product,
  );
  const {alternativeBarcodeList} = useSelector(
    state => state.sale_alternativeBarcode,
  );

  const filterProductTypeSelectForApi = useCallback(
    selectedTypes => {
      if (!Array.isArray(selectedTypes) || selectedTypes.length === 0) {
        return mobileSettings?.productTypesToDisplay.map(type => ({
          value: type,
        }));
      }

      return selectedTypes;
    },
    [mobileSettings],
  );

  const sliceFunctionData = useMemo(
    () => ({
      productTypeSelect: filterProductTypeSelectForApi(productTypeSelect),
      productCategory: productCategory,
      isConfiguratorProductShown: mobileSettings?.isConfiguratorProductShown,
      alternativeBarcodeList,
    }),
    [
      filterProductTypeSelectForApi,
      productTypeSelect,
      productCategory,
      mobileSettings?.isConfiguratorProductShown,
      alternativeBarcodeList,
    ],
  );

  const productTypeSelectList = useMemo(() => {
    const selectionItems = getSelectionItems(
      SaleProduct?.productTypeSelect,
      productTypeSelect,
    );

    return selectionItems.filter(({value}) =>
      mobileSettings?.productTypesToDisplay.includes(value),
    );
  }, [
    SaleProduct?.productTypeSelect,
    getSelectionItems,
    productTypeSelect,
    mobileSettings?.productTypesToDisplay,
  ]);

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
        customSearchBarComponent={
          <DoubleScannerSearchBar
            list={productList}
            loadingList={loadingList}
            moreLoading={moreLoading}
            isListEnd={isListEnd}
            sliceFunction={searchProduct}
            sliceFunctionData={sliceFunctionData}
            placeholderSearchBar={I18n.t('Sale_Product')}
            displayValue={displayItemName}
            sliceBarCodeFunction={searchAlternativeBarcode}
            displayBarCodeInput={baseConfig?.enableMultiBarcodeOnProducts}
            scanKeySearch={productScanKey}
            scanKeyBarCode={barCodeScanKey}
            showDetailsPopup={false}
            oneFilter
          />
        }
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
