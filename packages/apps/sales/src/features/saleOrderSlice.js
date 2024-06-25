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
  fetchSaleOrder as _fetchSaleOrder,
  fetchSaleOrderById as _fetchSaleOrderById,
} from '../api/sale-order-api';

export const fetchSaleOrder = createAsyncThunk(
  'sales_saleOrder/fetchSaleOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchSaleOrder,
      data,
      action: 'Sales_SliceAction_FetchSaleOrder',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchSaleOrderById = createAsyncThunk(
  'sales_saleOrder/fetchSaleOrderById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchSaleOrderById,
      data,
      action: 'Sales_SliceAction_FetchSaleOrderById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loading: true,
  moreLoading: false,
  isListEnd: false,
  saleOrderList: [],

  loadingSaleOrder: true,
  saleOrder: {},
};

const saleOrderSlice = createSlice({
  name: 'sales_saleOrder',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchSaleOrder, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'saleOrderList',
    });
    builder.addCase(fetchSaleOrderById.pending, state => {
      state.loadingSaleOrder = true;
    });
    builder.addCase(fetchSaleOrderById.fulfilled, (state, action) => {
      state.loadingSaleOrder = false;
      state.saleOrder = action.payload;
    });
  },
});

export const saleOrderReducer = saleOrderSlice.reducer;
