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
  fetchStockCorrection as _fetchStockCorrection,
  searchStockCorrection,
  createStockCorrection,
  updateStockCorrection,
} from '../api/stock-correction-api';

export const searchStockCorrections = createAsyncThunk(
  'stockCorrection/searchStockCorrections',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchStockCorrection,
      data,
      action: 'Stock_Search_StockCorrection',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchStockCorrection = createAsyncThunk(
  'stockCorrection/fetchStockCorrection',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchStockCorrection,
      data,
      action: 'Stock_Fetch_StockCorrection',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const createCorrection = createAsyncThunk(
  'stockCorrection/createStockCorrection',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: createStockCorrection,
      data,
      action: 'Stock_Create_StockCorrection',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const updateCorrection = createAsyncThunk(
  'stockCorrection/updateStockCorrection',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateStockCorrection,
      data,
      action: 'Stock_Update_StockCorrection',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

const initialState = {
  loadingStockCorrection: true,
  moreLoading: false,
  isListEnd: false,
  stockCorrectionList: [],
  stockCorrection: null,
};

const stockCorrectionSlice = createSlice({
  name: 'stockCorrection',
  initialState,
  reducers: {
    clearStockCorrection: state => {
      state.stockCorrection = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(searchStockCorrections.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingStockCorrection = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(searchStockCorrections.fulfilled, (state, action) => {
      state.loadingStockCorrection = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.stockCorrectionList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.stockCorrectionList = [
            ...state.stockCorrectionList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchStockCorrection.pending, (state, action) => {
      state.loadingStockCorrection = true;
    });
    builder.addCase(fetchStockCorrection.fulfilled, (state, action) => {
      state.loadingStockCorrection = false;
      state.stockCorrection = action.payload;
    });
  },
});

export const {clearStockCorrection} = stockCorrectionSlice.actions;

export const stockCorrectionReducer = stockCorrectionSlice.reducer;
