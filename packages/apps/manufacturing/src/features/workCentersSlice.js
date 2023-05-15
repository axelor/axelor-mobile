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
import {searchWorkCenterFilter} from '../api/work-center-api';

export const searchWorkCenters = createAsyncThunk(
  'workCenter/searchWorkCenter',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchWorkCenterFilter,
      data,
      action: 'Manufacturing_SliceAction_FilterWorkCenter',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  workCenterList: [],
  moreLoading: false,
  isListEnd: false,
};

const workCentersSlice = createSlice({
  name: 'workCenters',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchWorkCenters.pending, (state, action) => {
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(searchWorkCenters.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.workCenterList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.workCenterList = [...state.workCenterList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
  },
});

export const workCentersReducer = workCentersSlice.reducer;
