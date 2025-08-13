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
  updateAgendaItems,
} from '@axelor/aos-mobile-core';
import {
  fetchCustomerDeliveryLine as _fetchCustomerDeliveryLine,
  searchCustomerDeliveryLines,
  splitCustomerDeliveryLine as _splitCustomerDeliveryLine,
  updateLine,
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

export const updateCustomerDeliveryLineDescription = createAsyncThunk(
  'customerDeliveryLine/updateCustomerDeliveryLineDescription',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateLine,
      data,
      action: 'Stock_SliceAction_UpdateCustomerDeliveryDescrition',
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

export const updateCustomerDeliveryLine = createAsyncThunk(
  'customerDeliveryLine/updateCustomerDeliveryLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateLine,
      data,
      action: 'Stock_SliceAction_UpdateCustomerDeliveryLine',
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
    }).then(() => {
      return handlerApiCall({
        fetchFunction: _fetchCustomerDeliveryLine,
        data: {customerDeliveryLineId: data.stockMoveLineId},
        action: 'Stock_SliceAction_FetchCustomerDeliveryLine',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const splitCustomerDeliveryLine = createAsyncThunk(
  'stock_customerDeliveryLine/splitCustomerDeliveryLine',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _splitCustomerDeliveryLine,
      data,
      action: 'Stock_SliceAction_SplitCustomerDeliveryLine',
      getState,
      responseOptions: {showToast: true},
    }).then(() => {
      dispatch(
        fetchCustomerDeliveryLines({
          customerDeliveryId: data.customerDeliveryId,
        }),
      );
    });
  },
);

const initialState = {
  loadingCDLinesList: false,
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
        loading: 'loadingCDLinesList',
        moreLoading: 'moreLoading',
        isListEnd: 'isListEnd',
        list: 'customerDeliveryLineList',
        total: 'totalNumberLines',
      },
      {
        manageTotal: true,
      },
    );
    builder.addCase(updateCustomerDeliveryLine.pending, state => {
      state.loadingCustomerDeliveryLine = true;
    });
    builder.addCase(updateCustomerDeliveryLine.fulfilled, (state, action) => {
      state.loadingCustomerDeliveryLine = false;
      state.customerDeliveryLine = action.payload;
      state.customerDeliveryLineList = updateAgendaItems(
        state.customerDeliveryLineList,
        [action.payload],
      );
    });
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
