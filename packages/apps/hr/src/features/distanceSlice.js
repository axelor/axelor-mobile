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
import {handlerApiCall, isEmpty} from '@axelor/aos-mobile-core';
import {getDistance as _getDistance} from '../api/distance-api';

export const getDistance = createAsyncThunk(
  'distance/getDistance',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _getDistance,
      data,
      action: 'Hr_SliceAction_GetDistance',
      getState,
      responseOptions: {isArrayResponse: false},
      errorOptions: {errorTracing: false, showErrorToast: true},
    });
  },
);

const initialState = {
  loadingDistance: true,
  distance: null,
  showCityError: false,
};

const distanceSlice = createSlice({
  name: 'distance',
  initialState,
  reducers: {
    resetDistance: state => {
      state.distance = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getDistance.pending, state => {
      state.loadingDistance = true;
    });
    builder.addCase(getDistance.rejected, state => {
      state.loadingDistance = false;
    });
    builder.addCase(getDistance.fulfilled, (state, action) => {
      state.loadingDistance = false;
      if (action.payload?.error) {
        state.showCityError = true;
      } else if (!isEmpty(action.payload?.distance)) {
        state.distance = action.payload?.distance;
        state.showCityError = false;
      } else {
        state.distance = null;
        state.showCityError = false;
      }
    });
  },
});
export const {resetDistance} = distanceSlice.actions;

export const distanceReducer = distanceSlice.reducer;
