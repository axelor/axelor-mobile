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
  searchSupplierArrivalLines,
  updateLine,
} from '../api/supplier-arrival-line-api';

export const fetchSupplierArrivalLines = createAsyncThunk(
  'SupplierLines/fetchSupplierLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchSupplierArrivalLines,
      data,
      action: 'fetch supplier arrival lines',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const updateSupplierArrivalLine = createAsyncThunk(
  'SupplierLines/updateSupplierArrivalLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateLine,
      data,
      action: 'update supplier arrival line',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

const initialState = {
  loadingSALines: false,
  moreLoading: false,
  isListEnd: false,
  supplierArrivalLineList: [],
  updateLineResponse: {},
};

const supplierArrivalLineSlice = createSlice({
  name: 'supplierArrivalLine',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchSupplierArrivalLines.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingSALines = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchSupplierArrivalLines.fulfilled, (state, action) => {
      state.loadingSALines = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.supplierArrivalLineList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.supplierArrivalLineList = [
            ...state.supplierArrivalLineList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(updateSupplierArrivalLine.pending, state => {
      state.loadingSupplierArrivalLine = true;
    });
    builder.addCase(updateSupplierArrivalLine.fulfilled, (state, action) => {
      state.loadingSupplierArrivalLine = false;
      state.updateLineResponse = action.payload;
    });
  },
});

export const supplierArrivalLineReducer = supplierArrivalLineSlice.reducer;
