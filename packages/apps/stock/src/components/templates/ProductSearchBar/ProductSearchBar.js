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

import React, {useCallback, useMemo} from 'react';
import {
  displayItemName,
  useSelector,
  useTranslator,
  DoubleScannerSearchBar,
} from '@axelor/aos-mobile-core';
import {searchProducts} from '../../../features/productSlice';

const barCodeScanKey = 'product_bar-code';

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

  const {productList, loadingProduct, moreLoadingProduct, isListEndProduct} =
    useSelector(state => state.product);
  const {alternativeBarcodeList} = useSelector(
    state => state.stock_alternativeBarcode,
  );

  const fetchProductsAPI = useCallback(
    ({page = 0, searchValue}) => {
      onFetchDataAction && onFetchDataAction(searchValue);
      onChange({page, searchValue});
    },
    [onChange, onFetchDataAction],
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
      sliceFunction={searchProducts}
      sliceFunctionData={sliceFunctionData}
      list={productList}
      loadingList={loadingProduct}
      moreLoading={moreLoadingProduct}
      isListEnd={isListEndProduct}
      onChangeValue={fetchProductsAPI}
      displayValue={displayItemName}
      scanKeySearch={scanKey}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      changeScreenAfter={changeScreenAfter}
      scanKeyBarCode={barCodeScanKey}
    />
  );
};

export default ProductSearchBar;
