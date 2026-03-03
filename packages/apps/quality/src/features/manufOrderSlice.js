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
  searchBoMLines as _searchBoMLines,
  fetchManufOrder as _fetchManufOrder,
  searchManufOrder as _searchManufOrder,
} from '../api/manuf-order-api';

export const searchManufOrder = createAsyncThunk(
  'quality_manufOrder/searchManufOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchManufOrder,
      data,
      action: 'Quality_SliceAction_SearchManufOrder',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchBoMLines = createAsyncThunk(
  'quality_manufOrder/searchBoMLines',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchBoMLines,
      data,
      action: 'Quality_SliceAction_SearchBoMLines',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchManufOrder = createAsyncThunk(
  'quality_manufOrder/fetchManufOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchManufOrder,
      data,
      action: 'Quality_SliceAction_FetchManufOrder',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingManufOrders: false,
  moreLoadingManufOrder: false,
  isListEndManufOrder: false,
  manufOrderList: [],

  loadingBoMLines: false,
  moreLoadingBoMLine: false,
  isListEndBoMLine: false,
  bomLineList: [],

  loadingManufOrder: false,
  manufOrder: {},
};

const manufOrderSlice = createSlice({
  name: 'quality_manufOrder',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchManufOrder, {
      loading: 'loadingManufOrders',
      moreLoading: 'moreLoadingManufOrder',
      isListEnd: 'isListEndManufOrder',
      list: 'manufOrderList',
    });
    generateInifiniteScrollCases(builder, searchBoMLines, {
      loading: 'loadingBoMLines',
      moreLoading: 'moreLoadingBoMLine',
      isListEnd: 'isListEndBoMLine',
      list: 'bomLineList',
    });
    builder.addCase(fetchManufOrder.pending, state => {
      state.loadingManufOrder = true;
    });
    builder.addCase(fetchManufOrder.rejected, state => {
      state.loadingManufOrder = false;
    });
    builder.addCase(fetchManufOrder.fulfilled, (state, action) => {
      state.loadingManufOrder = false;
      state.manufOrder = action.payload;
    });
  },
});

export const manufOrderReducer = manufOrderSlice.reducer;
