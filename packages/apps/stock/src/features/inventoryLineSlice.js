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
  updateResponse: null,
  createResponse: null,
  loadingInventoryLine: false,
  inventoryLine: {},
};

const inventoryLineSlice = createSlice({
  name: 'inventoryLines',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchInventoryLines.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingInventoryLines = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchInventoryLines.fulfilled, (state, action) => {
      state.loadingInventoryLines = false;
      state.moreLoading = false;
      state.totalNumberLines = action.payload?.total;
      if (action.meta.arg.page === 0) {
        state.inventoryLineList = action.payload?.data;
        state.isListEnd = false;
      } else {
        if (action.payload?.data != null) {
          state.isListEnd = false;
          state.inventoryLineList = [
            ...state.inventoryLineList,
            ...action.payload?.data,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(updateInventoryLine.pending, state => {
      state.loadingInventoryLines = true;
    });
    builder.addCase(updateInventoryLine.fulfilled, (state, action) => {
      state.loadingInventoryLines = false;
      state.updateResponse = action.payload;
    });
    builder.addCase(createNewInventoryLine.pending, state => {
      state.loadingInventoryLines = true;
    });
    builder.addCase(createNewInventoryLine.fulfilled, (state, action) => {
      state.loadingInventoryLines = false;
      state.createResponse = action.payload;
    });
    builder.addCase(addTrackingNumber.pending, state => {
      state.loadingInventoryLine = true;
    });
    builder.addCase(addTrackingNumber.fulfilled, (state, action) => {
      state.loadingInventoryLine = false;
      state.inventoryLine = action.payload;
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
