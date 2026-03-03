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
  createPurchaseRequest as _createPurchaseRequest,
  getPurchaseRequest as _getPurchaseRequest,
  searchPurchaseRequest as _searchPurchaseRequest,
  updatePurchaseRequest as _updatePurchaseRequest,
  updatePurchaseRequestStatus as _updatePurchaseRequestStatus,
} from '../api/purchase-request-api';

export const searchPurchaseRequest = createAsyncThunk(
  'purchase_purchaseRequest/searchPurchaseRequest',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchPurchaseRequest,
      data,
      action: 'Purchase_SliceAction_SearchPurchaseRequest',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const getPurchaseRequest = createAsyncThunk(
  'purchase_purchaseRequest/getPurchaseRequest',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _getPurchaseRequest,
      data,
      action: 'Purchase_SliceAction_GetPurchaseRequest',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updatePurchaseRequestStatus = createAsyncThunk(
  'purchase_purchaseRequest/updatePurchaseRequestStatus',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updatePurchaseRequestStatus,
      data,
      action: 'Purchase_SliceAction_UpdatePurchaseRequestStatus',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      dispatch(getPurchaseRequest({id: data.purchaseRequest.id}));
    });
  },
);

export const createPurchaseRequest = createAsyncThunk(
  'purchase_purchaseRequest/createPurchaseRequest',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _createPurchaseRequest,
      data,
      action: 'Purchase_SliceAction_CreatePurchaseRequest',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const updatePurchaseRequest = createAsyncThunk(
  'purchase_purchaseRequest/updatePurchaseRequest',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updatePurchaseRequest,
      data,
      action: 'Purchase_SliceAction_UpdatePurchaseRequest',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      dispatch(getPurchaseRequest({id: data.purchaseRequest.id}));
    });
  },
);

const initialState = {
  loadingPurchaseRequest: false,
  purchaseRequest: {},

  loadingPurchaseRequests: false,
  moreLoadingPurchaseRequest: false,
  isListEndPurchaseRequest: false,
  purchaseRequestList: [],
};

const purchaseRequestSlice = createSlice({
  name: 'purchase_purchaseRequest',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchPurchaseRequest, {
      loading: 'loadingPurchaseRequests',
      moreLoading: 'moreLoadingPurchaseRequest',
      isListEnd: 'isListEndPurchaseRequest',
      list: 'purchaseRequestList',
    });
    builder.addCase(getPurchaseRequest.pending, state => {
      state.loadingPurchaseRequest = true;
    });
    builder.addCase(getPurchaseRequest.rejected, state => {
      state.loadingPurchaseRequest = false;
    });
    builder.addCase(getPurchaseRequest.fulfilled, (state, action) => {
      state.loadingPurchaseRequest = false;
      state.purchaseRequest = action.payload;
    });
  },
});

export const purchaseRequestReducer = purchaseRequestSlice.reducer;
