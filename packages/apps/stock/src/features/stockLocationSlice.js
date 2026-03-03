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

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {searchStockLocationsFilter} from '../api/stock-location-api';

export const searchStockLocations = createAsyncThunk(
  'stockLocation/searchStockLocations',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchStockLocationsFilter,
      data,
      action: 'Stock_SliceAction_FilterStockLocations',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const filterSecondStockLocations = createAsyncThunk(
  'stockLocation/filterSecondStockLocations',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchStockLocationsFilter,
      data,
      action: 'Stock_SliceAction_FilterStockLocations',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingStockLocation: false,
  moreLoadingStockLocation: false,
  isListEndStockLocation: false,
  stockLocationList: [],

  loadingStockLocationMultiFilter: false,
  moreLoadingStockLocationMultiFilter: false,
  isListEndStockLocationMultiFilter: false,
  stockLocationListMultiFilter: [],
};

const stockLocationSlice = createSlice({
  name: 'stockLocation',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchStockLocations, {
      loading: 'loadingStockLocation',
      moreLoading: 'moreLoadingStockLocation',
      isListEnd: 'isListEndStockLocation',
      list: 'stockLocationList',
    });
    generateInifiniteScrollCases(builder, filterSecondStockLocations, {
      loading: 'loadingStockLocationMultiFilter',
      moreLoading: 'moreLoadingStockLocationMultiFilter',
      isListEnd: 'isListEndStockLocationMultiFilter',
      list: 'stockLocationListMultiFilter',
    });
  },
});

export const stockLocationReducer = stockLocationSlice.reducer;
