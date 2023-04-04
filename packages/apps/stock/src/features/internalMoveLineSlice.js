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
  searchInternalMoveLines,
  updateInternalMoveLine as _updateInternalMoveLine,
  fetchInternalMoveLine as _fetchInternalMoveLine,
} from '../api/internal-move-line-api';
import {updateStockMoveLineTrackingNumber} from '../api/tracking-number-api';

export const fetchInternalMoveLines = createAsyncThunk(
  'internalMoveLine/fetchInternalMoveLines',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchInternalMoveLines,
      data,
      action: 'Stock_SliceAction_FetchInternalMoveLines',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

export const updateInternalMoveLine = createAsyncThunk(
  'internalMoveLine/updateInternalMoveLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateInternalMoveLine,
      data,
      action: 'Stock_SliceAction_UpdateInternalMoveLine',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const fetchInternalMoveLine = createAsyncThunk(
  'internalMoveLine/fetchInternalMoveLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchInternalMoveLine,
      data,
      action: 'Stock_SliceAction_FetchInternalMoveLine',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const addTrackingNumber = createAsyncThunk(
  'internalMoveLine/addTrackingNumber',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: updateStockMoveLineTrackingNumber,
      data,
      action: 'Stock_SliceAction_AddTrackingNumberToInternalMoveLine',
      getState,
      responseOptions: {showToast: true},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: _fetchInternalMoveLine,
        data: {internalMoveLineId: res?.id},
        action: 'Stock_SliceAction_FetchInternalMoveLine',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

const initialState = {
  loadingIMLines: false,
  moreLoading: false,
  isListEnd: false,
  internalMoveLineList: [],
  loadingInternalMoveLine: false,
  internalMoveLine: {},
  totalNumberLines: 0,
};

const internalMoveLineSlice = createSlice({
  name: 'internalMoveLine',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchInternalMoveLines.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingIMLines = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchInternalMoveLines.fulfilled, (state, action) => {
      state.loadingIMLines = false;
      state.moreLoading = false;
      state.totalNumberLines = action.payload?.total;
      if (action.meta.arg.page === 0) {
        state.internalMoveLineList = action.payload?.data;
        state.isListEnd = false;
      } else {
        if (action.payload?.data != null) {
          state.isListEnd = false;
          state.internalMoveLineList = [
            ...state.internalMoveLineList,
            ...action.payload?.data,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchInternalMoveLine.pending, state => {
      state.loadingInternalMoveLine = true;
    });
    builder.addCase(fetchInternalMoveLine.fulfilled, (state, action) => {
      state.loadingInternalMoveLine = false;
      state.internalMoveLine = action.payload;
    });
    builder.addCase(addTrackingNumber.pending, state => {
      state.loadingInternalMoveLine = true;
    });
    builder.addCase(addTrackingNumber.fulfilled, (state, action) => {
      state.loadingInternalMoveLine = false;
      state.internalMoveLine = action.payload;
    });
  },
});

export const internalMoveLineReducer = internalMoveLineSlice.reducer;
