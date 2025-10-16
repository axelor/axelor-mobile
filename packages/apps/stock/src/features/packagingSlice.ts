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
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {searchPackaging as _searchPackaging} from '../api/packaging-api';

export const searchPackaging = createAsyncThunk(
  'stock_packaging/searchPackaging',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchPackaging,
      data,
      action: 'Stock_SliceAction_SearchPackaging',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchParentPackaging = createAsyncThunk(
  'stock_packaging/searchParentPackaging',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchPackaging,
      data,
      action: 'Stock_SliceAction_SearchParentPackaging',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingPackaging: false,
  moreLoadingPackaging: false,
  isListEndPackaging: false,
  packagingList: [],

  loadingParentPackaging: false,
  moreLoadingParentPackaging: false,
  isListEndParentPackaging: false,
  parentPackagingList: [],
};

const packagingSlice = createSlice({
  name: 'stock_packaging',
  initialState,
  reducers: {},
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchPackaging, {
      loading: 'loadingPackaging',
      moreLoading: 'moreLoadingPackaging',
      isListEnd: 'isListEndPackaging',
      list: 'packagingList',
    });
    generateInifiniteScrollCases(builder, searchParentPackaging, {
      loading: 'loadingParentPackaging',
      moreLoading: 'moreLoadingParentPackaging',
      isListEnd: 'isListEndParentPackaging',
      list: 'parentPackagingList',
    });
  },
});

export const packagingReducer = packagingSlice.reducer;
