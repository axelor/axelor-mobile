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
  createPurchaseRequestLine as _createPurchaseRequestLine,
  fetchPurchaseRequestLine as _fetchPurchaseRequestLine,
  searchPurchaseRequestLine as _searchPurchaseRequestLine,
  updatePurchaseRequestLine as _updatePurchaseRequestLine,
} from '../api/purchase-request-line-api';

export const searchPurchaseRequestLine = createAsyncThunk(
  'purchase_purchaseRequestLine/searchPurchaseRequestLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchPurchaseRequestLine,
      data,
      action: 'Purchase_SliceAction_SearchPurchaseRequestLine',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

export const fetchPurchaseRequestLine = createAsyncThunk(
  'purchase_purchaseRequestLine/fetchPurchaseRequestLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchPurchaseRequestLine,
      data,
      action: 'Purchase_SliceAction_FetchPurchaseRequestLine',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const createPurchaseRequestLine = createAsyncThunk(
  'purchase_purchaseRequestLine/createPurchaseRequestLine',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _createPurchaseRequestLine,
      data,
      action: 'Purchase_SliceAction_CreatePurchaseRequestLine',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(
        searchPurchaseRequestLine({purchaseRequestId: data.purchaseRequestId}),
      );
    });
  },
);

export const updatePurchaseRequestLine = createAsyncThunk(
  'purchase_purchaseRequestLine/updatePurchaseRequestLine',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updatePurchaseRequestLine,
      data,
      action: 'Purchase_SliceAction_UpdatePurchaseRequestLine',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(
        searchPurchaseRequestLine({purchaseRequestId: data.purchaseRequestId}),
      );
    });
  },
);

const initialState = {
  loadingPurchaseRequestLine: false,
  purchaseRequestLine: {},

  loadingPurchaseRequestLines: false,
  moreLoadingPurchaseRequestLine: false,
  isListEndPurchaseRequestLine: false,
  purchaseRequestLineList: [],
  totalPurchaseRequestLine: 0,
};

const purchaseRequestLineSlice = createSlice({
  name: 'purchase_purchaseRequestLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(
      builder,
      searchPurchaseRequestLine,
      {
        loading: 'loadingPurchaseRequestLines',
        moreLoading: 'moreLoadingPurchaseRequestLine',
        isListEnd: 'isListEndPurchaseRequestLine',
        list: 'purchaseRequestLineList',
        total: 'totalPurchaseRequestLine',
      },
      {
        manageTotal: true,
      },
    );
    builder.addCase(fetchPurchaseRequestLine.pending, state => {
      state.loadingPurchaseRequestLine = true;
    });
    builder.addCase(fetchPurchaseRequestLine.rejected, state => {
      state.loadingPurchaseRequestLine = false;
    });
    builder.addCase(fetchPurchaseRequestLine.fulfilled, (state, action) => {
      state.loadingPurchaseRequestLine = false;
      state.purchaseRequestLine = action.payload;
    });
  },
});

export const purchaseRequestLineReducer = purchaseRequestLineSlice.reducer;
