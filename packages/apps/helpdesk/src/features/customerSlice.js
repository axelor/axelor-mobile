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
  getCustomer,
  searchCustomer as _searchCustomer,
  searchCustomerContact as _searchCustomerContact,
} from '../api/customer-api';

export const searchCustomer = createAsyncThunk(
  'helpdesk_customer/searchCustomer',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCustomer,
      data,
      action: 'Helpdesk_SliceAction_FetchCustomer',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchCustomerContact = createAsyncThunk(
  'helpdesk_customer/searchCustomerContact',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCustomerContact,
      data,
      action: 'Helpdesk_SliceAction_FetchCustomerContact',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const getCustomerbyId = createAsyncThunk(
  'helpdesk_customer/getCustomerbyId',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getCustomer,
      data,
      action: 'Helpdesk_SliceAction_FetchCustomerById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  customerList: [],

  loadingCustomerContact: false,
  moreLoadingCustomerContact: false,
  isListEndCustomerContact: false,
  customerContactList: [],

  formCustomer: {},
};

const customerSlice = createSlice({
  name: 'helpdesk_customer',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchCustomer, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'customerList',
    });
    generateInifiniteScrollCases(builder, searchCustomerContact, {
      loading: 'loadingCustomerContact',
      moreLoading: 'moreLoadingCustomerContact',
      isListEnd: 'isListEndCustomerContact',
      list: 'customerContactList',
    });
    builder.addCase(getCustomerbyId.fulfilled, (state, action) => {
      state.formCustomer = action.payload;
    });
  },
});

export const customerReducer = customerSlice.reducer;
