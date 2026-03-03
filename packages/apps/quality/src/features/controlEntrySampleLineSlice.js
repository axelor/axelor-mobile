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
  fetchControlEntrySampleLine as _fetchControlEntrySampleLine,
  searchControlEntrySampleLineOfControlEntry as _searchControlEntrySampleLineOfControlEntry,
} from '../api/control-entry-sample-line-api';

export const searchControlEntrySampleLineOfControlEntry = createAsyncThunk(
  'controlEntrySampleLine/searchControlEntrySampleLineOfControlEntry',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchControlEntrySampleLineOfControlEntry,
      data,
      action: 'Quality_SliceAction_SearchControlEntrySampleLine',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchControlEntrySampleLine = createAsyncThunk(
  'controlEntrySampleLine/fetchControlEntrySampleLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchControlEntrySampleLine,
      data,
      action: 'Quality_SliceAction_FetchControlEntrySampleLine',
      getState,
      responseOptions: {isArrayResponse: false},
      errorOptions: {showErrorToast: false},
    });
  },
);

const initialState = {
  loadingSampleLines: true,
  sampleLineOfEntryList: [],

  loadingSampleLine: false,
  sampleLine: {},
};

const controlEntrySampleLineSlice = createSlice({
  name: 'controlEntrySampleLine',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchControlEntrySampleLine.pending, state => {
      state.loadingSampleLine = true;
    });
    builder.addCase(fetchControlEntrySampleLine.fulfilled, (state, action) => {
      state.loadingSampleLine = false;
      state.sampleLine = action.payload;
    });
    builder.addCase(
      searchControlEntrySampleLineOfControlEntry.pending,
      state => {
        state.loadingSampleLines = true;
      },
    );
    builder.addCase(
      searchControlEntrySampleLineOfControlEntry.fulfilled,
      (state, action) => {
        state.loadingSampleLines = false;
        state.sampleLineOfEntryList = action.payload;
      },
    );
  },
});

export const controlEntrySampleLineReducer =
  controlEntrySampleLineSlice.reducer;
