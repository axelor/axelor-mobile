/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {
  filterSecondStockLocations,
  searchStockLocations,
} from '../../../features/stockLocationSlice';

const StockLocationSearchBar = ({
  placeholderKey = 'Stock_StockLocation',
  defaultValue = null,
  onChange = () => {},
  scanKey,
  showDetailsPopup = true,
  secondFilter = false,
  isFocus = false,
  isScrollViewContainer = false,
  defaultStockLocation = null,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    loadingStockLocation: loading,
    moreLoadingStockLocation: moreLoading,
    isListEndStockLocation: isListEnd,
    stockLocationList,
    loadingStockLocationMultiFilter: loadingMultiFilter,
    moreLoadingStockLocationMultiFilter: moreLoadingMultiFilter,
    isListEndStockLocationMultiFilter: isListEndMultiFilter,
    stockLocationListMultiFilter,
  } = useSelector(state => state.stockLocation);
  const {user} = useSelector(state => state.user);

  const fetchStockLocationsAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        searchStockLocations({
          page,
          searchValue,
          companyId: user.activeCompany?.id,
          defaultStockLocation:
            defaultStockLocation ?? user.workshopStockLocation,
        }),
      );
    },
    [defaultStockLocation, dispatch, user],
  );

  const fetchStockLocationsMultiFilterAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        filterSecondStockLocations({
          page,
          searchValue,
          companyId: user.activeCompany?.id,
          defaultStockLocation:
            defaultStockLocation ?? user.workshopStockLocation,
        }),
      );
    },
    [defaultStockLocation, dispatch, user],
  );

  return (
    <ScannerAutocompleteSearch
      objectList={
        secondFilter ? stockLocationListMultiFilter : stockLocationList
      }
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={
        secondFilter
          ? fetchStockLocationsMultiFilterAPI
          : fetchStockLocationsAPI
      }
      displayValue={displayItemName}
      scanKeySearch={scanKey}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={secondFilter ? loadingMultiFilter : loading}
      moreLoading={secondFilter ? moreLoadingMultiFilter : moreLoading}
      isListEnd={secondFilter ? isListEndMultiFilter : isListEnd}
      isFocus={isFocus}
      isScrollViewContainer={isScrollViewContainer}
    />
  );
};

export default StockLocationSearchBar;
