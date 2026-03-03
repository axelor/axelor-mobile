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
import {searchProductsFilter} from '../api/product-api';
import {searchTrackingNumberFilter} from '../api/tracking-number-api';

export const searchProductTrackingNumber = createAsyncThunk(
  'productTrackingNumber/searchProductTrackingNumber',
  async function (data, {getState}) {
    const productResult = await handlerApiCall({
      fetchFunction: searchProductsFilter,
      data,
      action: 'Stock_SliceAction_FilterProducts',
      getState,
      responseOptions: {isArrayResponse: true},
    });

    const trackingNumberResult = await handlerApiCall({
      fetchFunction: searchTrackingNumberFilter,
      data,
      action: 'Stock_SliceAction_FilterProductTrakingNumbers',
      getState,
      responseOptions: {isArrayResponse: true},
    });

    let result = [];

    if (Array.isArray(productResult)) {
      result = [...result, ...productResult];
    }

    if (Array.isArray(trackingNumberResult)) {
      result = [...result, ...trackingNumberResult];
    }

    return new Promise(async resolve => {
      resolve(result);
    });
  },
);

const initialState = {
  productTrackingNumberList: [],
  loading: false,
  isListEnd: false,
  moreLoading: false,
};

const productTrackingNumberSlice = createSlice({
  name: 'productTrackingNumber',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchProductTrackingNumber, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'productTrackingNumberList',
    });
  },
});

export const productTrackingNumberReducer = productTrackingNumberSlice.reducer;
