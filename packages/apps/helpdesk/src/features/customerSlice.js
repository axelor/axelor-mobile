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
import {searchCustomer as _searchCustomer} from '../api/customer-api';

export const searchCustomer = createAsyncThunk(
  'customer/fetchCustomer',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCustomer,
      data,
      action: 'Helpdesk_Fetch_Customer',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  customerList: [],
  moreLoading: false,
  isListEnd: false,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchCustomer, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'customerList',
    });
  },
});

export const customerReducer = customerSlice.reducer;
