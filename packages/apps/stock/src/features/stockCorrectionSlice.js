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
  searchStockCorrection,
  createStockCorrection,
  updateStockCorrection,
} from '../api/stock-correction-api';

export const fetchStockCorrections = createAsyncThunk(
  'stockCorrection/fetchStockCorrection',
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

export const createCorrection = createAsyncThunk(
  'stockCorrection/createStockCorrection',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: createStockCorrection,
      data,
      action: 'Stock_SliceAction_CreateStockCorrection',
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
      action: 'Stock_SliceAction_UpdateStockCorrection',
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
};

const stockCorrectionSlice = createSlice({
  name: 'stockCorrection',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchStockCorrections.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingStockCorrection = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchStockCorrections.fulfilled, (state, action) => {
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
  },
});

export const stockCorrectionReducer = stockCorrectionSlice.reducer;
