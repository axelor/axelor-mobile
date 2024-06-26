/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {fetchSaleOrderLine as _fetchSaleOrderLine} from '../api/sale-order-line-api';

export const fetchSaleOrderLine = createAsyncThunk(
  'sales_saleOrderLine/fetchSaleOrderLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchSaleOrderLine,
      data,
      action: 'Sales_SliceAction_FetchSaleOrderLine',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

const initialState = {
  loading: true,
  moreLoading: false,
  isListEnd: false,
  saleOrderLineList: [],
  totalSaleOrderLine: 0,
};

const saleOrderLineSlice = createSlice({
  name: 'sales_saleOrderLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(
      builder,
      fetchSaleOrderLine,
      {
        loading: 'loading',
        moreLoading: 'moreLoading',
        isListEnd: 'isListEnd',
        list: 'saleOrderLineList',
        total: 'totalSaleOrderLine',
      },
      {
        manageTotal: true,
      },
    );
  },
});

export const saleOrderLineReducer = saleOrderLineSlice.reducer;
