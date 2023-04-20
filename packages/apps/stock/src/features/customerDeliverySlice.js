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
import {
  fetchCustomerDelivery as _fetchCustomerDelivery,
  addLineStockMove,
  realizeSockMove,
  searchDeliveryFilter,
} from '../api/customer-delivery-api';

export const searchDeliveries = createAsyncThunk(
  'deliveries/searchDeliveries',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchDeliveryFilter,
      data,
      action: 'Stock_SliceAction_FilterCustomerDeliveries',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchCustomerDelivery = createAsyncThunk(
  'deliveries/fetchCustomerDelivery',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchCustomerDelivery,
      data,
      action: 'Stock_SliceAction_FetchCustomerDeliveryById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const addNewLine = createAsyncThunk(
  'deliveries/addNewLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: addLineStockMove,
      data,
      action: 'Stock_SliceAction_CreateLineCustomerDelivery',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const realizeCustomerDelivery = createAsyncThunk(
  'deliveries/realizeCustomerDelivery',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: realizeSockMove,
      data,
      action: 'Stock_SliceAction_RealizeCustomerDelivery',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  deliveryList: [],
  customerDelivery: null,
};

const customerDeliverySlice = createSlice({
  name: 'deliveries',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchDeliveries.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(searchDeliveries.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.deliveryList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.deliveryList = [...state.deliveryList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchCustomerDelivery.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCustomerDelivery.fulfilled, (state, action) => {
      state.loading = false;
      state.customerDelivery = action.payload;
    });
  },
});

export const customerDeliveryReducer = customerDeliverySlice.reducer;
