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
import {
  fetchPlannedStockMoves as _fetchPlannedStockMoves,
  searchStockMove as _searchStockMove,
} from '../api/stock-move-api';

export const searchStockMove = createAsyncThunk(
  'stock_stockMove/searchStockMove',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchStockMove,
      data,
      action: 'Stock_SliceAction_SearchStockMove',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchPlannedStockMoves = createAsyncThunk(
  'stock_stockMove/fetchPlannedStockMoves',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchPlannedStockMoves,
      data,
      action: 'Stock_SliceAction_FetchPlannedStockMoves',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingStockMoves: false,
  moreLoadingStockMove: false,
  isListEndStockMove: false,
  stockMoveList: [],

  loadingPlanning: false,
  moreLoadingPlanning: false,
  isListEndPlanning: false,
  planningList: [],
};

const stockMoveSlice = createSlice({
  name: 'stock_stockMove',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchStockMove, {
      loading: 'loadingStockMoves',
      moreLoading: 'moreLoadingStockMove',
      isListEnd: 'isListEndStockMove',
      list: 'stockMoveList',
    });
    generateInifiniteScrollCases(builder, fetchPlannedStockMoves, {
      loading: 'loadingPlanning',
      moreLoading: 'moreLoadingPlanning',
      isListEnd: 'isListEndPlanning',
      list: 'planningList',
    });
  },
});

export const stockMoveReducer = stockMoveSlice.reducer;
