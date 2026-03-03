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
  handlerApiCall,
  generateInifiniteScrollCases,
} from '@axelor/aos-mobile-core';
import {
  searchManufOrder as _searchManufOrder,
  searchOperationOrder as _searchOperationOrder,
} from '../api/manuf-order-api';

export const searchManufOrder = createAsyncThunk(
  'hr_manufOrder/searchManufOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchManufOrder,
      data,
      action: 'Hr_SliceAction_FetchManufOrder',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchOperationOrder = createAsyncThunk(
  'hr_manufOrder/searchOperationOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchOperationOrder,
      data,
      action: 'Hr_SliceAction_FetchOperationOrder',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  manufOrder: {},

  loadingManufOrder: true,
  moreLoading: false,
  isListEnd: false,
  manufOrderList: [],

  loadingOperationOrder: true,
  moreLoadingOperationOrder: false,
  isListEndOperationOrder: false,
  operationOrderList: [],
};

const manufOrderSlice = createSlice({
  name: 'hr_manufOrder',
  initialState,
  reducers: {
    updateManufOrder: (state, action) => {
      state.manufOrder = action.payload;
    },
  },
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchManufOrder, {
      loading: 'loadingManufOrder',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'manufOrderList',
    });
    generateInifiniteScrollCases(builder, searchOperationOrder, {
      loading: 'loadingOperationOrder',
      moreLoading: 'moreLoadingOperationOrder',
      isListEnd: 'isListEndOperationOrder',
      list: 'operationOrderList',
    });
  },
});

export const {updateManufOrder} = manufOrderSlice.actions;

export const manufOrderReducer = manufOrderSlice.reducer;
