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
  displayItemFullname,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {fetchPackagingProducts} from '../../../features/packagingSlice';

const DEFAULT_SCAN_KEY = 'packaging-product_search-bar';

interface PackagingProductSearchBarProps {
  style?: any;
  title?: string;
  scanKeySearch?: string;
  defaultValue?: any;
  onChange?: (value: any) => void;
  showDetailsPopup?: boolean;
  isScrollViewContainer?: boolean;
  showTitle?: boolean;
  readonly?: boolean;
  required?: boolean;
}

const PackagingProductSearchBarAux = ({
  style,
  title = 'Stock_PackagingUsed',
  scanKeySearch = DEFAULT_SCAN_KEY,
  defaultValue,
  onChange,
  showDetailsPopup = true,
  isScrollViewContainer = false,
  showTitle = true,
  readonly = false,
  required = false,
}: PackagingProductSearchBarProps) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    packagingProductList,
    loadingPackagingProducts,
    moreLoadingPackagingProducts,
    isListEndPackagingProducts,
  } = useSelector(state => state.stock_packaging);

  const fetchProducts = useCallback(
    ({page = 0, searchValue}) => {
      dispatch((fetchPackagingProducts as any)({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <ScannerAutocompleteSearch
      style={style}
      title={showTitle && I18n.t(title)}
      placeholder={I18n.t(title)}
      scanKeySearch={scanKeySearch}
      loadingList={loadingPackagingProducts}
      moreLoading={moreLoadingPackagingProducts}
      isListEnd={isListEndPackagingProducts}
      objectList={packagingProductList}
      value={defaultValue}
      required={required}
      readonly={readonly}
      onChangeValue={onChange}
      fetchData={fetchProducts}
      displayValue={displayItemFullname}
      showDetailsPopup={showDetailsPopup}
      isScrollViewContainer={isScrollViewContainer}
    />
  );
};

const PackagingProductSearchBar = (props: PackagingProductSearchBarProps) => {
  return <PackagingProductSearchBarAux {...props} />;
};

export default PackagingProductSearchBar;
