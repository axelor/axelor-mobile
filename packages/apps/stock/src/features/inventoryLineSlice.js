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
  createInventoryLine,
  searchInventoryLines,
  updateInventoryLineDetails,
  addTrackingNumber as _addTrackingNumber,
  fetchInventoryLine as _fetchInventoryLine,
} from '../api/inventory-line-api';

export const fetchInventoryLines = createAsyncThunk(
  'inventoryLines/fetchInventoryLines',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchInventoryLines,
      data,
      action: 'Stock_SliceAction_FetchInventoryLines',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

export const updateInventoryLine = createAsyncThunk(
  'inventoryLines/updateInventoryLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateInventoryLineDetails,
      data,
      action: 'Stock_SliceAction_UpdateInventoryLine',
      getState,
      responseOptions: {showToast: true},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: searchInventoryLines,
        data: {inventoryId: data?.inventoryId},
        action: 'Stock_SliceAction_FetchInventoryLines',
        getState,
        responseOptions: {isArrayResponse: true},
      });
    });
  },
);

export const createNewInventoryLine = createAsyncThunk(
  'inventoryLines/createNewInventoryLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: createInventoryLine,
      data,
      action: 'Stock_SliceAction_CreateInventoryLine',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const addTrackingNumber = createAsyncThunk(
  'inventoryLines/addTrackingNumber',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _addTrackingNumber,
      data,
      action: 'Stock_SliceAction_AddTrackingNumberToInventoryLine',
      getState,
      responseOptions: {showToast: true},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: _fetchInventoryLine,
        data: {inventoryLineId: res?.id},
        action: 'Stock_SliceAction_FetchInventoryLine',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const fetchInventoryLine = createAsyncThunk(
  'inventoryLines/fetchInventoryLine',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchInventoryLine,
      data,
      action: 'Stock_SliceAction_FetchInventoryLine',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingInventoryLines: false,
  moreLoading: false,
  isListEnd: false,
  inventoryLineList: [],
  totalNumberLines: 0,

  loadingInventoryLine: false,
  inventoryLine: {},
};

const inventoryLineSlice = createSlice({
  name: 'inventoryLines',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(
      builder,
      fetchInventoryLines,
      {
        loading: 'loadingInventoryLines',
        moreLoading: 'moreLoading',
        isListEnd: 'isListEnd',
        list: 'inventoryLineList',
        total: 'totalNumberLines',
      },
      {
        manageTotal: true,
      },
    );
    builder.addCase(addTrackingNumber.pending, state => {
      state.loadingInventoryLine = true;
    });
    builder.addCase(addTrackingNumber.fulfilled, (state, action) => {
      state.loadingInventoryLine = false;
      state.inventoryLine = action.payload;
    });
    builder.addCase(updateInventoryLine.pending, state => {
      state.loadingInventoryLine = true;
    });
    builder.addCase(updateInventoryLine.fulfilled, (state, action) => {
      state.loadingInventoryLine = false;
      state.inventoryLineList = action.payload;
    });
    builder.addCase(addTrackingNumber.rejected, (state, action) => {
      state.loadingInventoryLine = false;
    });
    builder.addCase(fetchInventoryLine.pending, state => {
      state.loadingInventoryLine = true;
    });
    builder.addCase(fetchInventoryLine.fulfilled, (state, action) => {
      state.loadingInventoryLine = false;
      state.inventoryLine = action.payload;
    });
  },
});

export const inventoryLineReducer = inventoryLineSlice.reducer;
