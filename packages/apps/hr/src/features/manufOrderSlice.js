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
import {
  handlerApiCall,
  generateInifiniteScrollCases,
} from '@axelor/aos-mobile-core';
import {searchManufOrder as _searchManufOrder} from '../api/manuf-order-api';

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

const initialState = {
  loadingManufOrder: true,
  moreLoading: false,
  isListEnd: false,
  manufOrderList: [],
  operationOrderList: [],
};

const manufOrderSlice = createSlice({
  name: 'hr_manufOrder',
  initialState,
  reducers: {
    updateOperationOrderList: (state, action) => {
      state.operationOrderList = action.payload;
    },
  },
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchManufOrder, {
      loading: 'loadingManufOrder',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'manufOrderList',
    });
  },
});

export const {updateOperationOrderList} = manufOrderSlice.actions;

export const manufOrderReducer = manufOrderSlice.reducer;
