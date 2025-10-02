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

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {
  createTrackingNumber,
  searchTrackingNumberFilter,
  updateStockMoveLineTrackingNumber as _updateStockMoveLineTrackingNumber,
  updateTrackingNumber as _updateTrackingNumber,
} from '../api/tracking-number-api';
import {fetchSupplierArrivalLine} from './supplierArrivalLineSlice';

export const filterTrackingNumber = createAsyncThunk(
  'trackingNumber/filterTrackingNumber',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchTrackingNumberFilter,
      data,
      action: 'Stock_SliceAction_FilterProductTrakingNumbers',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const createTrackingNumberSeq = createAsyncThunk(
  'trackingNumber/createTrackingNumberSeq',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: createTrackingNumber,
      data,
      action: 'Stock_SliceAction_CreateTrakingNumber',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const updateSupplierTrackingNumber = createAsyncThunk(
  'trackingNumber/updateSupplierTrackingNumber',
  async function (data, {getState, dispatch}) {
    const {stockMoveLineId, stockMoveLineVersion} = data;

    return handlerApiCall({
      fetchFunction: createTrackingNumber,
      data,
      action: 'Stock_SliceAction_CreateTrakingNumber',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(trackingNumber => {
      dispatch(
        updateStockMoveLineTrackingNumber({
          stockMoveLineId,
          stockMoveLineVersion,
          trackingNumber,
        }),
      );
      return trackingNumber;
    });
  },
);

export const updateStockMoveLineTrackingNumber = createAsyncThunk(
  'trackingNumber/updateStockMoveLineTrackingNumber',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateStockMoveLineTrackingNumber,
      data,
      action: 'Stock_SliceAction_UpdateSupplierArrivalLineWithTrackingNumber',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      dispatch(
        fetchSupplierArrivalLine({
          supplierArrivalLineId: data.stockMoveLineId,
        }),
      );
    });
  },
);

export const updateTrackingNumber = createAsyncThunk(
  'trackingNumber/updateTrackingNumber',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateTrackingNumber,
      data,
      action: 'Stock_SliceAction_UpdateTrackingNumber',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

const initialState = {
  loading: false,

  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  trackingNumberList: [],
};

const trackingNumberSlice = createSlice({
  name: 'trackingNumber',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, filterTrackingNumber, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'trackingNumberList',
    });
    builder.addCase(createTrackingNumberSeq.pending, state => {
      state.loading = true;
    });
    builder.addCase(createTrackingNumberSeq.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(createTrackingNumberSeq.rejected, state => {
      state.loading = false;
    });
    builder.addCase(updateSupplierTrackingNumber.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateSupplierTrackingNumber.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(updateSupplierTrackingNumber.rejected, state => {
      state.loading = false;
    });
  },
});

export const trackingNumberReducer = trackingNumberSlice.reducer;
