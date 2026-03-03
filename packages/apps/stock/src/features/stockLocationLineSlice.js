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
import {
  searchAvailableProducts as _searchAvailableProducts,
  searchStockLocationLine,
} from '../api/stock-location-line-api';

export const fetchStockLocationLine = createAsyncThunk(
  'stockLocationLine/fetchStockLocationLines',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchStockLocationLine,
      data,
      action: 'Stock_SliceAction_FetchStockLocationLines',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchAvailableProducts = createAsyncThunk(
  'stockLocationLine/searchAvailableProducts',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchAvailableProducts,
      data,
      action: 'Stock_SliceAction_SearchAvailableProducts',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  stockLocationLine: [],

  loadingAvailableProducts: false,
  moreLoadingAvailableProducts: false,
  isListEndAvailableProducts: false,
  availableProducts: [],
};

const stockLocationLineSlice = createSlice({
  name: 'stockLocationLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchStockLocationLine, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'stockLocationLine',
    });
    generateInifiniteScrollCases(builder, searchAvailableProducts, {
      loading: 'loadingAvailableProducts',
      moreLoading: 'moreLoadingAvailableProducts',
      isListEnd: 'isListEndAvailableProducts',
      list: 'availableProducts',
    });
  },
});

export const stockLocationLineReducer = stockLocationLineSlice.reducer;
