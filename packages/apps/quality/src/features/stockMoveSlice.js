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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {
  fetchStockMove as _fetchStockMove,
  fetchStockMoveLine as _fetchStockMoveLine,
} from '../api/stock-move-api';

export const fetchStockMove = createAsyncThunk(
  'quality_stockMove/fetchStockMove',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchStockMove,
      data,
      action: 'Quality_SliceAction_FetchStockMove',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const fetchStockMoveLine = createAsyncThunk(
  'quality_stockMove/fetchStockMoveLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchStockMoveLine,
      data,
      action: 'Quality_SliceAction_FetchStockMoveLine',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingStockMove: false,
  stockMove: {},

  loadingStockMoveLine: false,
  stockMoveLine: {},
};

const stockMoveSlice = createSlice({
  name: 'quality_stockMove',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchStockMove.pending, state => {
      state.loadingStockMove = true;
    });
    builder.addCase(fetchStockMove.rejected, state => {
      state.loadingStockMove = false;
    });
    builder.addCase(fetchStockMove.fulfilled, (state, action) => {
      state.loadingStockMove = false;
      state.stockMove = action.payload;
    });
    builder.addCase(fetchStockMoveLine.pending, state => {
      state.loadingStockMoveLine = true;
    });
    builder.addCase(fetchStockMoveLine.rejected, state => {
      state.loadingStockMoveLine = false;
    });
    builder.addCase(fetchStockMoveLine.fulfilled, (state, action) => {
      state.loadingStockMoveLine = false;
      state.stockMoveLine = action.payload;
    });
  },
});

export const stockMoveReducer = stockMoveSlice.reducer;
