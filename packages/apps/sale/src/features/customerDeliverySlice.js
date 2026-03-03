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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {fetchCustomerDelivery as _fetchCustomerDelivery} from '../api/customer-delivery-api';

export const fetchCustomerDelivery = createAsyncThunk(
  'sale_customerDelivery/fetchCustomerDelivery',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchCustomerDelivery,
      data,
      action: 'Sale_SliceAction_FetchCustomerDelivery',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingCustomerDelivery: true,
  customerDelivery: {},
};

const customerDeliverySlice = createSlice({
  name: 'sale_customerDelivery',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchCustomerDelivery.pending, state => {
      state.loadingCustomerDelivery = true;
    });
    builder.addCase(fetchCustomerDelivery.rejected, state => {
      state.loadingCustomerDelivery = false;
    });
    builder.addCase(fetchCustomerDelivery.fulfilled, (state, action) => {
      state.loadingCustomerDelivery = false;
      state.customerDelivery = action.payload;
    });
  },
});

export const customerDeliveryReducer = customerDeliverySlice.reducer;
