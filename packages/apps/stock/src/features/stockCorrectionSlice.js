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
  fetchStockCorrection as _fetchStockCorrection,
  searchStockCorrection,
  createStockCorrection,
  updateStockCorrection,
  updateStockCorrectionTrackingNumber,
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
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: createStockCorrection,
      data,
      action: 'Stock_SliceAction_CreateStockCorrection',
      getState,
      responseOptions: {showToast: true},
    }).then(() => {
      dispatch(searchStockCorrections({}));
    });
  },
);

export const updateCorrection = createAsyncThunk(
  'stockCorrection/updateStockCorrection',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: updateStockCorrection,
      data,
      action: 'Stock_SliceAction_UpdateStockCorrection',
      getState,
      responseOptions: {showToast: true, isArrayResponse: false},
    }).then(() => {
      dispatch(searchStockCorrections({}));
    });
  },
);

export const addTrackingNumberStockCorrection = createAsyncThunk(
  'stockCorrection/addTrackingNumberStockCorrection',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: updateStockCorrectionTrackingNumber,
      data,
      action: 'Stock_SliceAction_AddTrackingNumberToStockCorrection',
      getState,
      responseOptions: {showToast: true},
    }).then(() => {
      dispatch(fetchStockCorrection({id: data.stockCorrectionId}));
    });
  },
);

const initialState = {
  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  stockCorrectionList: [],

  loading: false,
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
      loading: 'loadingList',
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
  },
});

export const {clearStockCorrection} = stockCorrectionSlice.actions;

export const stockCorrectionReducer = stockCorrectionSlice.reducer;
