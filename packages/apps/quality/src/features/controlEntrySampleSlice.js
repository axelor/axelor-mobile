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
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {searchControlEntrySample as _searchControlEntrySample} from '../api/control-entry-sample-api';

export const searchControlEntrySample = createAsyncThunk(
  'controlEntrySample/searchControlEntrySample',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchControlEntrySample,
      data,
      action: 'Quality_SliceAction_SearchControlEntrySample',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingControlEntrySampleList: true,
  moreLoading: false,
  isListEnd: false,
  controlEntrySampleList: [],
};

const controlEntrySampleSlice = createSlice({
  name: 'controlEntrySample',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchControlEntrySample, {
      loading: 'loadingControlEntrySampleList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'controlEntrySampleList',
    });
  },
});

export const controlEntrySampleReducer = controlEntrySampleSlice.reducer;
