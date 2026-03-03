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
  fetchOperationOrder as _fetchOperationOrder,
  searchOperationLine as _searchOperationLine,
} from '../api/operation-order-api';

export const searchOperationLine = createAsyncThunk(
  'quality_operationOrder/searchOperationLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchOperationLine,
      data,
      action: 'Quality_SliceAction_SearchOperationLine',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchOperationOrder = createAsyncThunk(
  'quality_operationOrder/fetchOperationOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchOperationOrder,
      data,
      action: 'Quality_SliceAction_FetchOperationOrder',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingOperationOrders: false,
  moreLoadingOperationOrder: false,
  isListEndOperationOrder: false,
  operationOrderList: [],

  loadingOperationOrder: false,
  operationOrder: {},
};

const operationOrderSlice = createSlice({
  name: 'quality_operationOrder',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchOperationLine, {
      loading: 'loadingOperationOrders',
      moreLoading: 'moreLoadingOperationOrder',
      isListEnd: 'isListEndOperationOrder',
      list: 'operationOrderList',
    });
    builder.addCase(fetchOperationOrder.pending, state => {
      state.loadingOperationOrder = true;
    });
    builder.addCase(fetchOperationOrder.rejected, state => {
      state.loadingOperationOrder = false;
    });
    builder.addCase(fetchOperationOrder.fulfilled, (state, action) => {
      state.loadingOperationOrder = false;
      state.operationOrder = action.payload;
    });
  },
});

export const operationOrderReducer = operationOrderSlice.reducer;
