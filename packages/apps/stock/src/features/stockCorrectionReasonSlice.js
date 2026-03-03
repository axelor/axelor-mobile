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
import {searchStockCorrectionReason} from '../api/stock-correction-reason-api';

export const fetchStockCorrectionReasons = createAsyncThunk(
  'stockCorrectionReason/fetchStockCorrectionReason',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchStockCorrectionReason,
      data,
      action: 'Stock_SliceAction_FetchStockCorrectionReasons',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingReasons: false,
  stockCorrectionReasonList: [],
};

const stockCorrectionReasonSlice = createSlice({
  name: 'stockCorrectionReason',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchStockCorrectionReasons.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchStockCorrectionReasons.fulfilled, (state, action) => {
      state.loading = false;
      state.stockCorrectionReasonList = action.payload;
    });
  },
});

export const stockCorrectionReasonReducer = stockCorrectionReasonSlice.reducer;
