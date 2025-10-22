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
import {
  createPackagingLine as _createPackagingLine,
  deletePackagingLine as _deletePackagingLine,
  searchPackagingLines as _searchPackagingLines,
  updatePackagingLine as _updatePackagingLine,
} from '../api/packaging-line-api';

export const searchPackagingLines = createAsyncThunk(
  'stock_packagingLine/searchPackagingLines',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchPackagingLines,
      data,
      action: 'Stock_SliceAction_SearchPackagingLines',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const createPackagingLine = createAsyncThunk(
  'stock_packagingLine/createPackagingLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _createPackagingLine,
      data,
      action: 'Stock_SliceAction_CreatePackagingLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const updatePackagingLine = createAsyncThunk(
  'stock_packagingLine/updatePackagingLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _updatePackagingLine,
      data,
      action: 'Stock_SliceAction_UpdatePackagingLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const deletePackagingLine = createAsyncThunk(
  'stock_packagingLine/deletePackagingLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _deletePackagingLine,
      data,
      action: 'Stock_SliceAction_DeletePackagingLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

const initialState = {
  loadingPackagingLine: false,
  moreLoadingPackagingLine: false,
  isListEndPackagingLine: false,
  packagingLineList: [],
};

const packagingLineSlice = createSlice({
  name: 'stock_packagingLine',
  initialState,
  reducers: {},
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchPackagingLines, {
      loading: 'loadingPackagingLine',
      moreLoading: 'moreLoadingPackagingLine',
      isListEnd: 'isListEndPackagingLine',
      list: 'packagingLineList',
    });
  },
});

export const packagingLineReducer = packagingLineSlice.reducer;
