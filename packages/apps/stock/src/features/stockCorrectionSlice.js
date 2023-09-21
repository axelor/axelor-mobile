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
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
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
      action: 'Stock_SliceAction_SearchStockCorrections',
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
      action: 'Stock_SliceAction_FetchStockCorrection',
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
      action: 'Stock_SliceAction_CreateStockCorrection',
      getState,
      responseOptions: {showToast: true},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: searchStockCorrection,
        data,
        action: 'Stock_SliceAction_SearchStockCorrections',
        getState,
        responseOptions: {isArrayResponse: true},
      });
    });
  },
);

export const updateCorrection = createAsyncThunk(
  'stockCorrection/updateStockCorrection',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateStockCorrection,
      data,
      action: 'Stock_SliceAction_UpdateStockCorrection',
      getState,
      responseOptions: {showToast: true, isArrayResponse: false},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: searchStockCorrection,
        data,
        action: 'Stock_SliceAction_SearchStockCorrections',
        getState,
        responseOptions: {isArrayResponse: true},
      });
    });
  },
);

const initialState = {
  loading: false,
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
    generateInifiniteScrollCases(builder, searchStockCorrections, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'stockCorrectionList',
    });
    builder.addCase(fetchStockCorrection.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchStockCorrection.fulfilled, (state, action) => {
      state.loading = false;
      state.stockCorrection = action.payload;
    });
    builder.addCase(createCorrection.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCorrection.fulfilled, (state, action) => {
      state.loading = false;
      state.stockCorrectionList = action.payload;
    });
    builder.addCase(updateCorrection.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCorrection.fulfilled, (state, action) => {
      state.loading = false;
      state.stockCorrectionList = action.payload;
    });
  },
});

export const {clearStockCorrection} = stockCorrectionSlice.actions;

export const stockCorrectionReducer = stockCorrectionSlice.reducer;
