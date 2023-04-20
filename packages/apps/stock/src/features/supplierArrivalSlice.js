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
      action: 'Stock_SliceAction_FilterSupplierArrival',
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
      action: 'Stock_SliceAction_CreateLineSupplierArrival',
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
      action: 'Stock_SliceAction_RealizeSupplierArrival',
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
  },
});

export const supplierArrivalReducer = supplierArrivalSlice.reducer;
