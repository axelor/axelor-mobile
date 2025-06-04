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
  searchCustomer as _searchCustomer,
  searchSupplier as _searchSupplier,
} from '../api/partner-api';

export const searchSupplier = createAsyncThunk(
  'quality_partner/searchSupplier',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchSupplier,
      data,
      action: 'Quality_SliceAction_SearchSupplier',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchCustomer = createAsyncThunk(
  'quality_partner/searchCustomer',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCustomer,
      data,
      action: 'Quality_SliceAction_SearchCustomer',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingCustomer: false,
  moreLoadingCustomer: false,
  isListEndCustomer: false,
  customerList: [],

  loadingSuppliers: false,
  moreLoadingSupplier: false,
  isListEndSupplier: false,
  supplierList: [],

  supplierPartnerForm: null,
  customerPartnerForm: null,
};

const partnerSlice = createSlice({
  name: 'quality_partner',
  initialState,
  reducers: {
    supplierPartnerForm: (state, action) => {
      state.supplierPartnerForm = action.payload;
    },
    updateCustomerPartnerForm: (state, action) => {
      state.customerPartnerForm = action.payload;
    },
  },
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchSupplier, {
      loading: 'loadingSuppliers',
      moreLoading: 'moreLoadingSupplier',
      isListEnd: 'isListEndSupplier',
      list: 'supplierList',
    });
    generateInifiniteScrollCases(builder, searchCustomer, {
      loading: 'loadingCustomer',
      moreLoading: 'moreLoadingCustomer',
      isListEnd: 'isListEndCustomer',
      list: 'customerList',
    });
  },
});

export const {supplierPartnerForm, updateCustomerPartnerForm} =
  partnerSlice.actions;

export const partnerReducer = partnerSlice.reducer;
