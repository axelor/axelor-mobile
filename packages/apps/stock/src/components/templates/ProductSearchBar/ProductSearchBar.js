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

import React, {useMemo} from 'react';
import {
  displayItemName,
  useSelector,
  useTranslator,
  DoubleScannerSearchBar,
} from '@axelor/aos-mobile-core';
import {searchProducts} from '../../../features/productSlice';
import {searchAlternativeBarcode} from '../../../features/alternativeBarcodeSlice';

const barCodeScanKey = 'product_bar-code_product-search-bar';

const ProductSearchBar = ({
  placeholderKey = 'Stock_Product',
  defaultValue = '',
  onChange = () => {},
  scanKey,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  changeScreenAfter = false,
  onFetchDataAction,
}) => {
  const I18n = useTranslator();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {productList, loadingProduct, moreLoadingProduct, isListEndProduct} =
    useSelector(state => state.product);
  const {alternativeBarcodeList} = useSelector(
    state => state.stock_alternativeBarcode,
  );

  const sliceFunctionData = useMemo(
    () => ({
      alternativeBarcodeList,
    }),
    [alternativeBarcodeList],
  );

  return (
    <DoubleScannerSearchBar
      value={defaultValue}
      placeholderSearchBar={I18n.t(placeholderKey)}
      onFetchDataAction={onFetchDataAction}
      sliceFunction={searchProducts}
      sliceFunctionData={sliceFunctionData}
      list={productList}
      loadingList={loadingProduct}
      moreLoading={moreLoadingProduct}
      isListEnd={isListEndProduct}
      onChangeValue={onChange}
      displayValue={displayItemName}
      scanKeySearch={scanKey}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      changeScreenAfter={changeScreenAfter}
      sliceBarCodeFunction={searchAlternativeBarcode}
      scanKeyBarCode={barCodeScanKey}
      displayBarCodeInput={baseConfig?.enableMultiBarcodeOnProducts}
    />
  );
};

export default ProductSearchBar;
