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
  createPackaging as _createPackaging,
  deletePackaging as _deletePackaging,
  fetchPackaging as _fetchPackaging,
  searchPackaging as _searchPackaging,
  updatePackaging as _updatePackaging,
} from '../api/packaging-api';
import {searchPackagingLines} from './packagingLineSlice';
import {fetchPackagingProducts as _fetchPackagingProducts} from '../api/packaging-product-api';

export const searchPackaging = createAsyncThunk(
  'stock_packaging/searchPackaging',
  async function (data: any, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _searchPackaging,
      data,
      action: 'Stock_SliceAction_SearchPackaging',
      getState,
      responseOptions: {isArrayResponse: true},
    }).then(res => {
      dispatch(
        (searchPackagingLines as any)({
          packagingId: data?.parentPackagingId,
          searchValue: data?.searchValue,
        }),
      );

      return res;
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

export const fetchPackagingProducts = createAsyncThunk(
  'stock_packaging/fetchPackagingProducts',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchPackagingProducts,
      data,
      action: 'Stock_SliceAction_FetchPackagingProducts',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const createPackaging = createAsyncThunk(
  'stock_packaging/createPackaging',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _createPackaging,
      data,
      action: 'Stock_SliceAction_CreatePackaging',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(res => {
      const _recordId = res.packagingId;

      if (!_recordId) return res;

      return handlerApiCall({
        fetchFunction: _fetchPackaging,
        data: {id: _recordId},
        action: 'Stock_SliceAction_FetchPackaging',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const updatePackaging = createAsyncThunk(
  'stock_packaging/updatePackaging',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _updatePackaging,
      data,
      action: 'Stock_SliceAction_UpdatePackaging',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const deletePackaging = createAsyncThunk(
  'stock_packaging/deletePackaging',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _deletePackaging,
      data,
      action: 'Stock_SliceAction_DeletePackaging',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
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

  loadingPackagingProducts: false,
  moreLoadingPackagingProducts: false,
  isListEndPackagingProducts: false,
  packagingProductList: [],
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
    generateInifiniteScrollCases(builder, fetchPackagingProducts, {
      loading: 'loadingPackagingProducts',
      moreLoading: 'moreLoadingPackagingProducts',
      isListEnd: 'isListEndPackagingProducts',
      list: 'packagingProductList',
    });
  },
});

export const packagingReducer = packagingSlice.reducer;
