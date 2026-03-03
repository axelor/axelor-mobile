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
import {searchPaymentCondition as _searchPaymentCondition} from '../api/payment-condition-api';

export const searchPaymentCondition = createAsyncThunk(
  'sale_paymentCondition/searchPaymentCondition',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchPaymentCondition,
      data,
      action: 'Sale_SliceAction_SearchPaymentCondition',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: true,
  moreLoading: false,
  isListEnd: false,
  paymentConditionList: [],
};

const paymentConditionSlice = createSlice({
  name: 'sale_paymentCondition',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchPaymentCondition, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'paymentConditionList',
    });
  },
});

export const paymentConditionReducer = paymentConditionSlice.reducer;
