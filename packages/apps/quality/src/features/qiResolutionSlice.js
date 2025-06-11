/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {fetchQiResolution as _fetchQiResolution} from '../api/qi-resolution-api';

export const fetchQiResolution = createAsyncThunk(
  'quality_qiResolution/fetchQiResolution',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchQiResolution,
      data,
      action: 'Quality_SliceAction_FetchQiResolution',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingQiResolution: false,
  qiResolution: {},
};

const qiResolutionSlice = createSlice({
  name: 'quality_qiResolution',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchQiResolution.pending, state => {
      state.loadingQiResolution = true;
    });
    builder.addCase(fetchQiResolution.rejected, state => {
      state.loadingQiResolution = false;
    });
    builder.addCase(fetchQiResolution.fulfilled, (state, action) => {
      state.loadingQiResolution = false;
      state.qiResolution = action.payload;
    });
  },
});

export const qiResolutionReducer = qiResolutionSlice.reducer;
