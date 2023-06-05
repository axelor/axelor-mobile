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
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {searchClientsFilter, searchSuppliersFilter} from '../api/partner-api';

export const filterClients = createAsyncThunk(
  'stock_partner/filterClients',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchClientsFilter,
      data,
      action: 'Stock_SliceAction_FilterClients',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const filterSuppliers = createAsyncThunk(
  'stock_partner/filterSuppliers',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchSuppliersFilter,
      data,
      action: 'Stock_SliceAction_FilterSuppliers',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingPartners: false,
  moreLoading: false,
  isListEnd: false,
  clientList: [],
  supplierList: [],
};

const partnerSlice = createSlice({
  name: 'stock_partner',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, filterClients, {
      loading: 'loadingPartners',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'clientList',
    });
    generateInifiniteScrollCases(builder, filterSuppliers, {
      loading: 'loadingPartners',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'supplierList',
    });
  },
});

export const partnerReducer = partnerSlice.reducer;
