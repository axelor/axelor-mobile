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
} from '../api/internal-move-line-api';

export const fetchInternalMoveLines = createAsyncThunk(
  'internalMoveLine/fetchInternalMoveLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchInternalMoveLines,
      data,
      action: 'Stock_SliceAction_FetchInternalMoveLines',
      getState,
      responseOptions: {isArrayResponse: true},
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

const initialState = {
  loadingIMLines: false,
  moreLoading: false,
  isListEnd: false,
  internalMoveLineList: [],
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
      if (action.meta.arg.page === 0) {
        state.internalMoveLineList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.internalMoveLineList = [
            ...state.internalMoveLineList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
  },
});

export const internalMoveLineReducer = internalMoveLineSlice.reducer;
