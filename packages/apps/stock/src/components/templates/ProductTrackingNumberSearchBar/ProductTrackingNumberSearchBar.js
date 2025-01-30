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

import React, {useCallback} from 'react';
import {
  displayItemName,
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchProductTrackingNumber} from '../../../features/productTrackingNumberSlice';
import {displayItemTrackingNumber} from '../../../utils/displayers';

const displayItem = _item => {
  return displayItemTrackingNumber(_item) || displayItemName(_item);
};

const ProductTrackingNumberSearchBar = ({
  placeholderKey = 'Stock_ProductTrackingNumber',
  defaultValue,
  onChange,
  scanKey,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {productTrackingNumberList, loading, moreLoading, isListEnd} =
    useSelector(state => state.productTrackingNumber);

  const fetchProductTrackingNumberAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchProductTrackingNumber({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <ScannerAutocompleteSearch
      objectList={productTrackingNumberList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchProductTrackingNumberAPI}
      displayValue={displayItem}
      scanKeySearch={scanKey}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
    />
  );
};

export default ProductTrackingNumberSearchBar;
