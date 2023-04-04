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
import {searchProductsFilter} from '../api/product-api';
import {searchTrackingNumberFilter} from '../api/tracking-number-api';

export const searchProductTrackingNumber = createAsyncThunk(
  'productTrackingNumber/searchProductTrackingNumber',
  async function (data, {getState}) {
    const productResult = await handlerApiCall({
      fetchFunction: searchProductsFilter,
      data,
      action: 'search products',
      getState,
      responseOptions: {isArrayResponse: true},
    });

    const trackingNumberResult = await handlerApiCall({
      fetchFunction: searchTrackingNumberFilter,
      data,
      action: 'search tracking numbers',
      getState,
      responseOptions: {isArrayResponse: true},
    });

    return new Promise(async resolve => {
      resolve([...productResult, ...trackingNumberResult]);
    });
  },
);

const initialState = {
  productTrackingNumberList: [],
};

const productTrackingNumberSlice = createSlice({
  name: 'productTrackingNumber',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchProductTrackingNumber.fulfilled, (state, action) => {
      state.productTrackingNumberList = action.payload;
    });
  },
});

export const productTrackingNumberReducer = productTrackingNumberSlice.reducer;
