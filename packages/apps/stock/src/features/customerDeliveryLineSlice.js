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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {
  searchCustomerDeliveryLines,
  updateLine,
} from '../api/customer-delivery-line-api';

export const fetchCustomerDeliveryLines = createAsyncThunk(
  'CustomerDeliveryLines/fetchCustomerDeliveryLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchCustomerDeliveryLines,
      data,
      action: 'fetch customer delivery line',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const updateCustomerDeliveryLine = createAsyncThunk(
  'CustomerDeliveryLines/updateCustomerDeliveryLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateLine,
      data,
      action: 'update customer delivery line',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

const initialState = {
  loadingCDLines: false,
  moreLoading: false,
  isListEnd: false,
  customerDeliveryLineList: [],
  updateLineResponse: {},
};

const CustomerDeliveryLineSlice = createSlice({
  name: 'customerDeliveryLine',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchCustomerDeliveryLines.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingCDLines = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchCustomerDeliveryLines.fulfilled, (state, action) => {
      state.loadingCDLines = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.customerDeliveryLineList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.customerDeliveryLineList = [
            ...state.customerDeliveryLineList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(updateCustomerDeliveryLine.pending, state => {
      state.loadingCDLines = true;
    });
    builder.addCase(updateCustomerDeliveryLine.fulfilled, (state, action) => {
      state.loadingCDLines = false;
      state.updateLineResponse = action.payload;
    });
  },
});

export const customerDeliveryLineReducer = CustomerDeliveryLineSlice.reducer;
