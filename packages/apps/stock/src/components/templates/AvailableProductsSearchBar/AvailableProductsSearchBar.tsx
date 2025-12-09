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
  ScannerAutocompleteSearch,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {searchAvailableProducts} from '../../../features/stockLocationLineSlice';

const displayItem = (_item: any) =>
  _item?.trackingNumber != null
    ? `${_item?.product?.name} - ${_item?.trackingNumber?.trackingNumberSeq}`
    : _item?.product?.name;

type AvailableProductsSearchBarProps = {
  style?: any;
  placeholderKey?: string;
  defaultValue?: any;
  onChange?: (value: any) => void;
  stockLocationId: number;
  scanKey: string;
  showDetailsPopup?: boolean;
  navigate?: boolean;
  oneFilter?: boolean;
  isFocus?: boolean;
  changeScreenAfter?: boolean;
  isScrollViewContainer?: boolean;
};

const AvailableProductsSearchBar = ({
  style,
  placeholderKey = 'Stock_Product',
  defaultValue,
  onChange,
  stockLocationId,
  scanKey,
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
  isFocus = false,
  changeScreenAfter = false,
  isScrollViewContainer = false,
}: AvailableProductsSearchBarProps) => {
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
      dispatch(
        (searchAvailableProducts as any)({page, searchValue, stockLocationId}),
      );
    },
    [dispatch, stockLocationId],
  );

  return (
    <ScannerAutocompleteSearch
      style={style}
      value={defaultValue}
      fetchData={fetchAvailableProductsAPI}
      objectList={availableProducts}
      loadingList={loadingAvailableProducts}
      moreLoading={moreLoadingAvailableProducts}
      isListEnd={isListEndAvailableProducts}
      onChangeValue={onChange}
      displayValue={displayItem}
      scanKeySearch={scanKey}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      navigate={navigate}
      oneFilter={oneFilter}
      isFocus={isFocus}
      changeScreenAfter={changeScreenAfter}
      isScrollViewContainer={isScrollViewContainer}
    />
  );
};

export default AvailableProductsSearchBar;
