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
} from '@axelor/aos-mobile-core';
import {searchPurchaseRequestLine as _searchPurchaseRequestLine} from '../api/purchase-request-line-api';

export const searchPurchaseRequestLine = createAsyncThunk(
  'purchase_purchaseRequestLine/searchPurchaseRequestLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchPurchaseRequestLine,
      data,
      action: 'Purchase_SliceAction_SearchPurchaseRequestLine',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

const initialState = {
  loadingPurchaseRequestLines: false,
  moreLoadingPurchaseRequestLine: false,
  isListEndPurchaseRequestLine: false,
  purchaseRequestLineList: [],
  totalPurchaseRequestLine: 0,
};

const purchaseRequestLineSlice = createSlice({
  name: 'purchase_purchaseRequestLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(
      builder,
      searchPurchaseRequestLine,
      {
        loading: 'loadingPurchaseRequestLines',
        moreLoading: 'moreLoadingPurchaseRequestLine',
        isListEnd: 'isListEndPurchaseRequestLine',
        list: 'purchaseRequestLineList',
        total: 'totalPurchaseRequestLine',
      },
      {
        manageTotal: true,
      },
    );
  },
});

export const purchaseRequestLineReducer = purchaseRequestLineSlice.reducer;
