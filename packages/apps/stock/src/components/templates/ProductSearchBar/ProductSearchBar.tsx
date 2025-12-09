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

import React, {useCallback} from 'react';
import {
  displayItemName,
  useSelector,
  useTranslator,
  ScannerAutocompleteSearch,
  useDispatch,
} from '@axelor/aos-mobile-core';
import {searchProducts} from '../../../features/productSlice';

type ProductSearchBarProps = {
  style?: any;
  placeholderKey?: string;
  defaultValue?: any;
  onChange?: (value: any) => void;
  scanKey: string;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  isFocus?: boolean;
  changeScreenAfter?: boolean;
  onFetchDataAction?: (value: any) => void;
};

const ProductSearchBar = ({
  style,
  placeholderKey = 'Stock_Product',
  defaultValue,
  onChange,
  scanKey,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  changeScreenAfter = false,
  onFetchDataAction,
}: ProductSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {productList, loadingProduct, moreLoadingProduct, isListEndProduct} =
    useSelector(state => state.product);

  const fetchProductsAPI = useCallback(
    ({page = 0, searchValue}) => {
      onFetchDataAction && onFetchDataAction(searchValue);
      dispatch((searchProducts as any)({page, searchValue}));
    },
    [dispatch, onFetchDataAction],
  );

  return (
    <ScannerAutocompleteSearch
      style={style}
      value={defaultValue}
      placeholder={I18n.t(placeholderKey)}
      fetchData={fetchProductsAPI}
      objectList={productList}
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
    />
  );
};

export default ProductSearchBar;
