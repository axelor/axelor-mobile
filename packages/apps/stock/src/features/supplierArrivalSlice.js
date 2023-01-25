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
  searchSupplierArrivalFilter,
} from '../api/supplier-arrival-api';

export const searchSupplierArrivals = createAsyncThunk(
  'arrivals/searchSupplierArrivals',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchSupplierArrivalFilter,
      data,
      action: 'filter supplier arrival',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const addNewLine = createAsyncThunk(
  'arrivals/addNewLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: addLineStockMove,
      data,
      action: 'add new line to supplier arrival',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const realizeSupplierArrival = createAsyncThunk(
  'arrivals/realizeSupplierArrival',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: realizeSockMove,
      data,
      action: 'realize supplier arrival',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  supplierArrivalsList: [],
  newLineResponse: {},
  realizeResponse: {},
};

const supplierArrivalSlice = createSlice({
  name: 'supplierArrivals',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchSupplierArrivals.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(searchSupplierArrivals.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.supplierArrivalsList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.supplierArrivalsList = [
            ...state.supplierArrivalsList,
            ...action.payload,
          ];
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
    builder.addCase(realizeSupplierArrival.pending, state => {
      state.loading = true;
    });
    builder.addCase(realizeSupplierArrival.fulfilled, (state, action) => {
      state.loading = false;
      state.realizeResponse = action.payload;
    });
  },
});

export const supplierArrivalReducer = supplierArrivalSlice.reducer;
