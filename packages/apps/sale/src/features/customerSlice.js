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
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {
  fetchCustomerById as _fetchCustomerById,
  searchCustomer as _searchCustomer,
  searchCustomerCategory as _searchCustomerCategory,
} from '../api/customer-api';
import {createPartnerApi} from '@axelor/aos-mobile-crm';

export const searchCustomer = createAsyncThunk(
  'sale_customer/searchCustomer',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCustomer,
      data,
      action: 'Sale_SliceAction_SearchCustomer',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchCustomerCategory = createAsyncThunk(
  'sale_customer/searchCustomerCategory',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCustomerCategory,
      data,
      action: 'Sale_SliceAction_SearchCustomerCategory',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchCustomerById = createAsyncThunk(
  'sale_customer/fetchCustomerById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchCustomerById,
      data,
      action: 'Sale_SliceAction_FetchCustomerById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const createCustomer = createAsyncThunk(
  'sale_customer/createCustomer',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: createPartnerApi,
      data,
      action: 'Sale_SliceAction_CreateCustomer',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      dispatch(
        searchCustomer({companyId: getState()?.user?.user?.activeCompany?.id}),
      );

      return res;
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

  loadingCustomer: true,
  customer: {},
};

const customerSlice = createSlice({
  name: 'sale_customer',
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
    builder.addCase(fetchCustomerById.pending, state => {
      state.loadingCustomer = true;
    });
    builder.addCase(fetchCustomerById.rejected, state => {
      state.loadingCustomer = false;
    });
    builder.addCase(fetchCustomerById.fulfilled, (state, action) => {
      state.loadingCustomer = false;
      state.customer = action.payload;
    });
  },
});

export const customerReducer = customerSlice.reducer;
