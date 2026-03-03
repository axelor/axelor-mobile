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
  DoubleScannerSearchBar,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchAvailableProducts} from '../../../features/stockLocationLineSlice';
import {searchAlternativeBarcode} from '../../../features/alternativeBarcodeSlice';

const barCodeScanKey = 'product_available-bar-code';

const AvailableProductsSearchBar = ({
  placeholderKey = 'Stock_Product',
  defaultValue = null,
  onChange = () => {},
  stockLocationId,
  scanKey,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  changeScreenAfter = false,
  isScrollViewContainer = false,
}) => {
  const I18n = useTranslator();

  const {base: baseConfig} = useSelector(state => state.appConfig);
  const {
    availableProducts,
    loadingAvailableProducts,
    moreLoadingAvailableProducts,
    isListEndAvailableProducts,
  } = useSelector(state => state.stockLocationLine);
  const {alternativeBarcodeList} = useSelector(
    state => state.stock_alternativeBarcode,
  );

  const sliceFunctionData = useMemo(
    () => ({
      stockLocationId,
      alternativeBarcodeList,
    }),
    [alternativeBarcodeList, stockLocationId],
  );

  return (
    <DoubleScannerSearchBar
      value={defaultValue}
      sliceFunction={searchAvailableProducts}
      sliceFunctionData={sliceFunctionData}
      list={availableProducts}
      loadingList={loadingAvailableProducts}
      moreLoading={moreLoadingAvailableProducts}
      isListEnd={isListEndAvailableProducts}
      onChangeValue={onChange}
      displayValue={_item =>
        _item?.trackingNumber != null
          ? `${_item?.product?.name} - ${_item?.trackingNumber?.trackingNumberSeq}`
          : _item?.product?.name
      }
      scanKeySearch={scanKey}
      placeholderSearchBar={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      changeScreenAfter={changeScreenAfter}
      scanKeyBarCode={barCodeScanKey}
      sliceBarCodeFunction={searchAlternativeBarcode}
      isScrollViewContainer={isScrollViewContainer}
      displayBarCodeInput={baseConfig?.enableMultiBarcodeOnProducts}
    />
  );
};

export default AvailableProductsSearchBar;
