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
      action: 'filter customer deliveries',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const addNewLine = createAsyncThunk(
  'deliveries/addNewLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: addLineStockMove,
      data,
      action: 'add new line to customer delivery',
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
      action: 'realize customer delivery',
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
  newLineResponse: {},
  realizeResponse: {},
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
    builder.addCase(addNewLine.pending, state => {
      state.loading = true;
    });
    builder.addCase(addNewLine.fulfilled, (state, action) => {
      state.loading = false;
      state.newLineResponse = action.payload;
    });
    builder.addCase(realizeCustomerDelivery.pending, state => {
      state.loading = true;
    });
    builder.addCase(realizeCustomerDelivery.fulfilled, (state, action) => {
      state.loading = false;
      state.realizeResponse = action.payload;
    });
  },
});

export const customerDeliveryReducer = customerDeliverySlice.reducer;
