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
import {searchCustomerOrder as _searchCustomerOrder} from '../api/sale-order-api';

export const searchCustomerOrder = createAsyncThunk(
  'quality_saleOrder/searchCustomerOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCustomerOrder,
      data,
      action: 'Quality_SliceAction_SearchCustomerOrder',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingCustomerOrders: false,
  moreLoadingCustomerOrder: false,
  isListEndCustomerOrder: false,
  customerOrderList: [],
};

const saleOrderSlice = createSlice({
  name: 'quality_saleOrder',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchCustomerOrder, {
      loading: 'loadingCustomerOrders',
      moreLoading: 'moreLoadingCustomerOrder',
      isListEnd: 'isListEndCustomerOrder',
      list: 'customerOrderList',
    });
  },
});

export const saleOrderReducer = saleOrderSlice.reducer;
