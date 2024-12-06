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
import {searchPurchaseRequest as _searchPurchaseRequest} from '../api/purchase-request-api';

export const searchPurchaseRequest = createAsyncThunk(
  'purchase_purchaseRequest/searchPurchaseRequest',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchPurchaseRequest,
      data,
      action: 'Purchase_SliceAction_SearchPurchaseRequest',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingPurchaseRequests: false,
  moreLoadingPurchaseRequest: false,
  isListEndPurchaseRequest: false,
  purchaseRequestList: [],
};

const purchaseRequestSlice = createSlice({
  name: 'purchase_purchaseRequest',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchPurchaseRequest, {
      loading: 'loadingPurchaseRequests',
      moreLoading: 'moreLoadingPurchaseRequest',
      isListEnd: 'isListEndPurchaseRequest',
      list: 'purchaseRequestList',
    });
  },
});

export const purchaseRequestReducer = purchaseRequestSlice.reducer;
