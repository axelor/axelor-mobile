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
import {searchStockMoveLine as _searchStockMoveLine} from '../api/stock-move-line-api';

export const fetchStockMoveLines = createAsyncThunk(
  'stock_stockMoveLine/fetchStockMoveLines',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchStockMoveLine,
      data,
      action: 'Stock_SliceAction_FetchStockMoveLines',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  stockMoveLineList: [],
};

const stockMoveLineSlice = createSlice({
  name: 'stock_stockMoveLine',
  initialState,
  reducers: {},
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchStockMoveLines, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'stockMoveLineList',
    });
  },
});

export const stockMoveLineReducer = stockMoveLineSlice.reducer;
