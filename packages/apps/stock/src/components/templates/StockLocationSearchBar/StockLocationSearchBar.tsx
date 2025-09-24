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

import React, {useCallback, useEffect} from 'react';
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

interface StockLocationSearchBarProps {
  style?: any;
  placeholderKey?: string;
  defaultValue?: any;
  onChange?: (value: any) => void;
  scanKey?: string;
  showDetailsPopup?: boolean;
  secondFilter?: boolean;
  isFocus?: boolean;
  isScrollViewContainer?: boolean;
  showTitle?: boolean;
  titleKey?: string;
  defaultStockLocation?: any;
  readOnly?: boolean;
}

const StockLocationSearchBar = ({
  style,
  placeholderKey = 'Stock_StockLocation',
  defaultValue = null,
  onChange = () => {},
  scanKey,
  showDetailsPopup = true,
  secondFilter = false,
  isFocus = false,
  isScrollViewContainer = false,
  showTitle = false,
  titleKey = 'Stock_StockLocation',
  defaultStockLocation = null,
  readOnly = false,
}: StockLocationSearchBarProps) => {
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
    ({page = 0, searchValue}: {page?: number; searchValue?: string | null}) => {
      dispatch(
        (searchStockLocations as any)({
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
    ({page = 0, searchValue}: {page?: number; searchValue?: string | null}) => {
      dispatch(
        (filterSecondStockLocations as any)({
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

  useEffect(() => {
    const defaultArgs = {page: 0, searchValue: null};

    secondFilter
      ? fetchStockLocationsMultiFilterAPI(defaultArgs)
      : fetchStockLocationsAPI(defaultArgs);
  }, [fetchStockLocationsAPI, fetchStockLocationsMultiFilterAPI, secondFilter]);

  return (
    <ScannerAutocompleteSearch
      title={showTitle && I18n.t(titleKey)}
      objectList={
        secondFilter ? stockLocationListMultiFilter : stockLocationList
      }
      value={defaultValue}
      readonly={readOnly}
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
      style={style}
    />
  );
};

export default StockLocationSearchBar;
