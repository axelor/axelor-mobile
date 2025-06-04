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
import {searchOperationLine as _searchOperationLine} from '../api/operation-order-api';

export const searchOperationLine = createAsyncThunk(
  'quality_operationOrder/searchOperationLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchOperationLine,
      data,
      action: 'Quality_SliceAction_SearchOperationLine',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingOperationOrders: false,
  moreLoadingOperationOrder: false,
  isListEndOperationOrder: false,
  operationOrderList: [],
};

const operationOrderSlice = createSlice({
  name: 'quality_operationOrder',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchOperationLine, {
      loading: 'loadingOperationOrders',
      moreLoading: 'moreLoadingOperationOrder',
      isListEnd: 'isListEndOperationOrder',
      list: 'operationOrderList',
    });
  },
});

export const operationOrderReducer = operationOrderSlice.reducer;
