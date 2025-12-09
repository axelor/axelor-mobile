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

import React, {useCallback, useMemo} from 'react';
import {
  displayItemName,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchProduct} from '../../../features/productSlice';
import {useSellableByCompany} from '../../../hooks/use-product-by-company';

interface ProductSearchBarProps {
  style?: any;
  title?: string;
  showTitle?: boolean;
  defaultValue?: string;
  onChange?: (value: any) => void;
  readonly?: boolean;
  required?: boolean;
  scanKey: string;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  isFocus?: boolean;
  changeScreenAfter?: boolean;
  selectLastItem?: boolean;
  isScrollViewContainer?: boolean;
  onFetchDataAction?: (searchValue: string) => void;
}

const ProductSearchBar = ({
  style,
  title = 'Sale_Product',
  showTitle = true,
  defaultValue,
  onChange,
  readonly = false,
  required = false,
  scanKey,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = true,
  changeScreenAfter = false,
  selectLastItem = true,
  isScrollViewContainer = false,
  onFetchDataAction,
}: ProductSearchBarProps) => {
  const I18n = useTranslator();
  const isSellableByCompany = useSellableByCompany();
  const dispatch = useDispatch();

  const {mobileSettings} = useSelector(state => state.appConfig);
  const {user} = useSelector(state => state.user);
  const {loadingList, moreLoading, isListEnd, productList} = useSelector(
    state => state.sale_product,
  );

  const sliceFunctionData = useMemo(
    () => ({
      useCompanySellable: isSellableByCompany,
      companyId: user.activeCompany?.id,
      productTypeSelect: mobileSettings?.productTypesToDisplay.map(type => ({
        value: type,
      })),
      isConfiguratorProductShown: mobileSettings?.isConfiguratorProductShown,
    }),
    [
      isSellableByCompany,
      mobileSettings?.isConfiguratorProductShown,
      mobileSettings?.productTypesToDisplay,
      user.activeCompany?.id,
    ],
  );

  const fetchProductsAPI = useCallback(
    ({page = 0, searchValue}) => {
      onFetchDataAction && onFetchDataAction(searchValue);
      dispatch(
        (searchProduct as any)({...sliceFunctionData, page, searchValue}),
      );
    },
    [dispatch, onFetchDataAction, sliceFunctionData],
  );

  return (
    <ScannerAutocompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      displayValue={displayItemName}
      placeholder={I18n.t(title)}
      fetchData={fetchProductsAPI}
      objectList={productList}
      loadingList={loadingList}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      scanKeySearch={scanKey}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      selectLastItem={selectLastItem}
      changeScreenAfter={changeScreenAfter}
      isScrollViewContainer={isScrollViewContainer}
    />
  );
};

export default ProductSearchBar;
