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
import {searchManufOrder as _searchManufOrder} from '../api/manuf-order-api';

export const searchManufOrder = createAsyncThunk(
  'quality_manufOrder/searchManufOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchManufOrder,
      data,
      action: 'Quality_SliceAction_SearchManufOrder',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingManufOrders: false,
  moreLoadingManufOrder: false,
  isListEndManufOrder: false,
  manufOrderList: [],

  manufOrderForm: null,
};

const manufOrderSlice = createSlice({
  name: 'quality_manufOrder',
  initialState,
  reducers: {
    updateManufOrder: (state, action) => {
      state.manufOrderForm = action.payload;
    },
  },
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchManufOrder, {
      loading: 'loadingManufOrders',
      moreLoading: 'moreLoadingManufOrder',
      isListEnd: 'isListEndManufOrder',
      list: 'manufOrderList',
    });
  },
});

export const {updateManufOrder} = manufOrderSlice.actions;

export const manufOrderReducer = manufOrderSlice.reducer;
