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
import {searchCustomerOrderLine as _searchCustomerOrderLine} from '../api/sale-order-line-api';

export const searchCustomerOrderLine = createAsyncThunk(
  'quality_saleOrderLine/searchCustomerOrderLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCustomerOrderLine,
      data,
      action: 'Quality_SliceAction_SearchCustomerOrderLine',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingCustomerOrderLines: false,
  moreLoadingCustomerOrderLine: false,
  isListEndCustomerOrderLine: false,
  customerOrderLineList: [],
};

const saleOrderLineSlice = createSlice({
  name: 'quality_saleOrderLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchCustomerOrderLine, {
      loading: 'loadingCustomerOrderLines',
      moreLoading: 'moreLoadingCustomerOrderLine',
      isListEnd: 'isListEndCustomerOrderLine',
      list: 'customerOrderLineList',
    });
  },
});

export const saleOrderLineReducer = saleOrderLineSlice.reducer;
