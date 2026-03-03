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
  DoubleScannerSearchBar,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchProductTrackingNumber} from '../../../features/productTrackingNumberSlice';
import {searchAlternativeBarcode} from '../../../features/alternativeBarcodeSlice';
import {displayItemTrackingNumber} from '../../../utils/displayers';

const displayItem = _item => {
  return displayItemTrackingNumber(_item) || displayItemName(_item);
};

const barCodeScanKey = 'product_tracking-number-bar-code';

const ProductTrackingNumberSearchBar = ({
  placeholderKey = 'Stock_ProductTrackingNumber',
  defaultValue,
  onChange,
  scanKey,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  isScrollViewContainer = false,
}) => {
  const I18n = useTranslator();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {productTrackingNumberList, loading, moreLoading, isListEnd} =
    useSelector(state => state.productTrackingNumber);
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
      sliceFunction={searchProductTrackingNumber}
      sliceFunctionData={sliceFunctionData}
      list={productTrackingNumberList}
      loadingList={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      onChangeValue={onChange}
      displayValue={displayItem}
      scanKeySearch={scanKey}
      placeholderSearchBar={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      scanKeyBarCode={barCodeScanKey}
      sliceBarCodeFunction={searchAlternativeBarcode}
      isScrollViewContainer={isScrollViewContainer}
      displayBarCodeInput={baseConfig?.enableMultiBarcodeOnProducts}
    />
  );
};

export default ProductTrackingNumberSearchBar;
