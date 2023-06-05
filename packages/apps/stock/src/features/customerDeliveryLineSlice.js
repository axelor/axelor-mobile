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
import {
  searchCustomerDeliveryLines,
  updateLine,
  fetchCustomerDeliveryLine as _fetchCustomerDeliveryLine,
} from '../api/customer-delivery-line-api';
import {updateStockMoveLineTrackingNumber} from '../api/tracking-number-api';

export const fetchCustomerDeliveryLines = createAsyncThunk(
  'customerDeliveryLine/fetchCustomerDeliveryLines',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchCustomerDeliveryLines,
      data,
      action: 'Stock_SliceAction_FetchCustomerDeliveryLines',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

export const updateCustomerDeliveryLine = createAsyncThunk(
  'customerDeliveryLine/updateCustomerDeliveryLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateLine,
      data,
      action: 'Stock_SliceAction_UpdateCustomerDeliveryLine',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const fetchCustomerDeliveryLine = createAsyncThunk(
  'customerDeliveryLine/fetchCustomerDeliveryLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchCustomerDeliveryLine,
      data,
      action: 'Stock_SliceAction_FetchCustomerDeliveryLine',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const addTrackingNumber = createAsyncThunk(
  'customerDeliveryLine/addTrackingNumber',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: updateStockMoveLineTrackingNumber,
      data,
      action: 'Stock_SliceAction_AddTrackingNumberToCustomerDeliveryLine',
      getState,
      responseOptions: {showToast: true},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: _fetchCustomerDeliveryLine,
        data: {customerDeliveryLineId: res?.id},
        action: 'Stock_SliceAction_FetchCustomerDeliveryLine',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

const initialState = {
  loadingCDLines: false,
  moreLoading: false,
  isListEnd: false,
  customerDeliveryLineList: [],
  totalNumberLines: 0,
  loadingCustomerDeliveryLine: false,
  customerDeliveryLine: {},
};

const CustomerDeliveryLineSlice = createSlice({
  name: 'customerDeliveryLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(
      builder,
      fetchCustomerDeliveryLines,
      {
        loading: 'loadingCDLines',
        moreLoading: 'moreLoading',
        isListEnd: 'isListEnd',
        list: 'customerDeliveryLineList',
        total: 'totalNumberLines',
      },
      {
        manageTotal: true,
      },
    );
    builder.addCase(fetchCustomerDeliveryLine.pending, state => {
      state.loadingCustomerDeliveryLine = true;
    });
    builder.addCase(fetchCustomerDeliveryLine.fulfilled, (state, action) => {
      state.loadingCustomerDeliveryLine = false;
      state.customerDeliveryLine = action.payload;
    });
    builder.addCase(addTrackingNumber.pending, state => {
      state.loadingCustomerDeliveryLine = true;
    });
    builder.addCase(addTrackingNumber.fulfilled, (state, action) => {
      state.loadingCustomerDeliveryLine = false;
      state.customerDeliveryLine = action.payload;
    });
  },
});

export const customerDeliveryLineReducer = CustomerDeliveryLineSlice.reducer;
