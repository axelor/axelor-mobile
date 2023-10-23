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
    });
  },
);

const initialState = {
  loadingDistance: true,
  distance: {},
  fromCity: null,
  toCity: null,
  needUpdateDistance: false,
};

const distanceSlice = createSlice({
  name: 'distance',
  initialState,
  reducers: {
    updateFromCity: (state, action) => {
      state.fromCity = action.payload;
    },
    updateToCity: (state, action) => {
      state.toCity = action.payload;
    },
    updateDistance: (state, action) => {
      state.distance = action.payload;
    },
    resetDistance: state => {
      state.distance = {};
    },
    needUpdateDistance: (state, action) => {
      state.needUpdateDistance = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getDistance.pending, (state, action) => {
      state.loadingDistance = true;
    });
    builder.addCase(getDistance.fulfilled, (state, action) => {
      state.loadingDistance = false;
      state.distance = action.payload;
    });
  },
});
export const {updateFromCity} = distanceSlice.actions;
export const {updateToCity} = distanceSlice.actions;
export const {resetDistance} = distanceSlice.actions;
export const {updateDistance} = distanceSlice.actions;
export const {needUpdateDistance} = distanceSlice.actions;

export const distanceReducer = distanceSlice.reducer;
