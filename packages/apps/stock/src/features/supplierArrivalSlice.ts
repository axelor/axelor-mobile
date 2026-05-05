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
  fetchSupplierArrival as _fetchSupplierArrival,
  addLineStockMove,
  realizeSockMove,
  searchSupplierArrivalFilter,
  updateSupplierShipmentDetails,
} from '../api/supplier-arrival-api';

export const searchSupplierArrivals = createAsyncThunk(
  'supplierArrivals/searchSupplierArrivals',
  async function (data: any = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchSupplierArrivalFilter,
      data,
      action: 'Stock_SliceAction_FilterSupplierArrival',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchSupplierArrival = createAsyncThunk(
  'supplierArrivals/fetchSupplierArrival',
  async function (data: any = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchSupplierArrival,
      data,
      action: 'Stock_SliceAction_FetchSupplierArrival',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const addNewLine = createAsyncThunk(
  'supplierArrivals/addNewLine',
  async function (data: any = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: addLineStockMove,
      data,
      action: 'Stock_SliceAction_CreateLineSupplierArrival',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const realizeSupplierArrival = createAsyncThunk(
  'supplierArrivals/realizeSupplierArrival',
  async function (data: any = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: realizeSockMove,
      data,
      action: 'Stock_SliceAction_RealizeSupplierArrival',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const updateSupplierArrivalShipmentDetails = createAsyncThunk(
  'supplierArrivals/updateSupplierArrivalShipmentDetails',
  async function (data: any = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: updateSupplierShipmentDetails,
      data,
      action: 'Stock_SliceAction_UpdateSupplierArrivalShipmentDetails',
      getState,
      responseOptions: {showToast: true},
    }).then(() => {
      dispatch(fetchSupplierArrival({supplierArrivalId: data.id}));
    });
  },
);

export const updateAndRealizeSupplierArrival = createAsyncThunk(
  'supplierArrivals/updateAndRealizeSupplierArrival',
  async function (data: any = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: updateSupplierShipmentDetails,
      data,
      action: 'Stock_SliceAction_UpdateSupplierArrivalShipmentDetails',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res =>
      dispatch(
        realizeSupplierArrival({
          stockMoveId: data.id,
          version: res?.version ?? data.version,
        }),
      ),
    );
  },
);

const initialState = {
  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  supplierArrivalsList: [],

  loading: false,
  supplierArrival: null,
};

const supplierArrivalSlice = createSlice({
  name: 'supplierArrivals',
  initialState,
  reducers: {},
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchSupplierArrivals, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'supplierArrivalsList',
    });
    builder.addCase(fetchSupplierArrival.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchSupplierArrival.fulfilled, (state, action) => {
      state.loading = false;
      state.supplierArrival = action.payload;
    });
    builder.addCase(fetchSupplierArrival.rejected, state => {
      state.loading = false;
      state.supplierArrival = null;
    });
  },
});

export const supplierArrivalReducer = supplierArrivalSlice.reducer;
