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
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchAvailableProducts} from '../../../features/stockLocationLineSlice';

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
  const dispatch = useDispatch();

  const {
    availableProducts,
    loadingAvailableProducts,
    moreLoadingAvailableProducts,
    isListEndAvailableProducts,
  } = useSelector(state => state.stockLocationLine);

  const fetchAvailableProductsAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchAvailableProducts({page, searchValue, stockLocationId}));
    },
    [dispatch, stockLocationId],
  );

  return (
    <ScannerAutocompleteSearch
      objectList={availableProducts}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchAvailableProductsAPI}
      displayValue={_item =>
        _item?.trackingNumber != null
          ? `${_item?.product?.name} - ${_item?.trackingNumber?.trackingNumberSeq}`
          : _item?.product?.name
      }
      scanKeySearch={scanKey}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loadingAvailableProducts}
      moreLoading={moreLoadingAvailableProducts}
      isListEnd={isListEndAvailableProducts}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      changeScreenAfter={changeScreenAfter}
      isScrollViewContainer={isScrollViewContainer}
    />
  );
};

export default AvailableProductsSearchBar;
