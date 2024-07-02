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
  searchCustomer as _searchCustomer,
  searchCustomerCategory as _searchCustomerCategory,
} from '../api/customer-api';

export const searchCustomer = createAsyncThunk(
  'sales_customer/searchCustomer',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCustomer,
      data,
      action: 'Sales_SliceAction_SearchCustomer',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchCustomerCategory = createAsyncThunk(
  'sales_customer/searchCustomerCategory',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCustomerCategory,
      data,
      action: 'Sales_SliceAction_SearchCustomerCategory',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: true,
  moreLoading: false,
  isListEnd: false,
  customerList: [],

  loadingCategoryList: true,
  moreLoadingCategoryList: false,
  isCategoryListEnd: false,
  customerCategoryList: [],
};

const customerSlice = createSlice({
  name: 'sales_customer',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchCustomer, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'customerList',
    });
    generateInifiniteScrollCases(builder, searchCustomerCategory, {
      loading: 'loadingCategoryList',
      moreLoading: 'moreLoadingCategoryList',
      isListEnd: 'isCategoryListEnd',
      list: 'customerCategoryList',
    });
  },
});

export const customerReducer = customerSlice.reducer;
