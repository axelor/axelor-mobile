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

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
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
  loadingStockLoaction: false,
  moreLoadingStockLoaction: false,
  isListEndStockLoaction: false,
  stockLocationList: [],
  stockLocationListMultiFilter: [],
  loadingStockLoactionMultiFilter: false,
  moreLoadingStockLoactionMultiFilter: false,
  isListEndStockLoactionMultiFilter: false,
};

const stockLocationSlice = createSlice({
  name: 'stockLocation',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchStockLocations.pending, (state, action) => {
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.loadingStockLoaction = true;
      } else {
        state.moreLoadingStockLoaction = true;
      }
    });
    builder.addCase(searchStockLocations.fulfilled, (state, action) => {
      state.loadingStockLoaction = false;
      state.moreLoadingStockLoaction = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.stockLocationList = action.payload;
        state.isListEndStockLoaction = false;
      } else {
        if (action.payload != null) {
          state.isListEndStockLoaction = false;
          state.stockLocationList = [
            ...state.stockLocationList,
            ...action.payload,
          ];
        } else {
          state.isListEndStockLoaction = true;
        }
      }
    });
    builder.addCase(filterSecondStockLocations.pending, (state, action) => {
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.loadingStockLoactionMultiFilter = true;
      } else {
        state.moreLoadingStockLoactionMultiFilter = true;
      }
    });
    builder.addCase(filterSecondStockLocations.fulfilled, (state, action) => {
      state.loadingStockLoactionMultiFilter = false;
      state.moreLoadingStockLoactionMultiFilter = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.stockLocationListMultiFilter = action.payload;
        state.isListEndStockLoactionMultiFilter = false;
      } else {
        if (action.payload != null) {
          state.isListEndStockLoactionMultiFilter = false;
          state.stockLocationListMultiFilter = [
            ...state.stockLocationListMultiFilter,
            ...action.payload,
          ];
        } else {
          state.isListEndStockLoactionMultiFilter = true;
        }
      }
    });
  },
});

export const stockLocationReducer = stockLocationSlice.reducer;
