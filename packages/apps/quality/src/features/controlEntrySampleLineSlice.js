/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {
  searchControlEntrySampleLine as _searchControlEntrySampleLine,
  searchControlEntrySampleLineByCharacteristic as _searchControlEntrySampleLineByCharacteristic,
} from '../api/control-entry-sample-line-api';

export const searchControlEntrySampleLine = createAsyncThunk(
  'controlEntry/searchControlEntrySampleLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchControlEntrySampleLine,
      data,
      action: 'Quality_SliceAction_SearchControlEntrySampleLine',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchControlEntrySampleLineByCharacteristic = createAsyncThunk(
  'controlEntry/searchControlEntrySampleLineByCharacteristic',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchControlEntrySampleLineByCharacteristic,
      data,
      action:
        'Quality_SliceAction_SearchControlEntrySampleLineByCharacteristic',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingControlEntrySamplelineList: true,
  moreLoading: false,
  isListEnd: false,
  controlEntrySampleLineList: [],

  loadingControlEntrySamplelineByCharacteristicList: true,
  controlEntrySampleLineByCharacteristic: [],
};

const controlEntrySampleLineSlice = createSlice({
  name: 'controlEntrySampleLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchControlEntrySampleLine, {
      loading: 'loadingControlEntrySamplelineList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'controlEntrySampleLineList',
    });
    builder.addCase(
      searchControlEntrySampleLineByCharacteristic.pending,
      (state, action) => {
        state.loadingControlEntrySamplelineByCharacteristicList = true;
      },
    );
    builder.addCase(
      searchControlEntrySampleLineByCharacteristic.fulfilled,
      (state, action) => {
        state.loadingControlEntrySamplelineByCharacteristicList = false;
        state.controlEntrySampleLineByCharacteristic = action.payload;
      },
    );
  },
});

export const controlEntrySampleLineReducer =
  controlEntrySampleLineSlice.reducer;
