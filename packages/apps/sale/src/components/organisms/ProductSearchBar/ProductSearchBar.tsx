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
import React, {useMemo} from 'react';
import {
  DoubleScannerSearchBar,
  displayItemName,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchProduct} from '../../../features/productSlice';
import {useSellableByCompany} from '../../../hooks/use-product-by-company';
import {searchAlternativeBarcode} from '../../../features/alternativeBarcodeSlice';

const barCodeScanKey = 'product_sale_bar-code_product-search-bar';

interface ProductSearchBarProps {
  placeholderKey?: string;
  defaultValue?: string;
  onChange?: (value: any) => void;
  scanKey: string;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  isFocus?: boolean;
  changeScreenAfter?: boolean;
  isScrollViewContainer?: boolean;
  onFetchDataAction?: (searchValue: string) => void;
  clearKey?: number;
}

const ProductSearchBar = ({
  placeholderKey = 'Sale_Product',
  defaultValue = '',
  onChange = () => {},
  scanKey,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  changeScreenAfter = false,
  isScrollViewContainer = false,
  onFetchDataAction,
  clearKey,
}: ProductSearchBarProps) => {
  const I18n = useTranslator();
  const isSellableByCompany = useSellableByCompany();

  const {base: baseConfig, mobileSettings} = useSelector(
    state => state.appConfig,
  );
  const {user} = useSelector(state => state.user);
  const {loadingList, moreLoading, isListEnd, productList} = useSelector(
    state => state.sale_product,
  );
  const {alternativeBarcodeList} = useSelector(
    state => state.sale_alternativeBarcode,
  );

  const sliceFunctionData = useMemo(
    () => ({
      useCompanySellable: isSellableByCompany,
      companyId: user.activeCompany?.id,
      productTypeSelect: mobileSettings?.productTypesToDisplay.map(type => ({
        value: type,
      })),
      isConfiguratorProductShown: mobileSettings?.isConfiguratorProductShown,
      alternativeBarcodeList,
    }),
    [
      alternativeBarcodeList,
      isSellableByCompany,
      mobileSettings?.isConfiguratorProductShown,
      mobileSettings?.productTypesToDisplay,
      user.activeCompany?.id,
    ],
  );

  return (
    <DoubleScannerSearchBar
      value={defaultValue}
      placeholderSearchBar={I18n.t(placeholderKey)}
      onFetchDataAction={onFetchDataAction}
      sliceFunction={searchProduct}
      sliceFunctionData={sliceFunctionData}
      list={productList}
      loadingList={loadingList}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
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
      isScrollViewContainer={isScrollViewContainer}
      clearKey={clearKey}
    />
  );
};

export default ProductSearchBar;
