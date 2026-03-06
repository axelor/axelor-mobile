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
  fetchInventory,
  modifyDescriptionInventory,
  searchInventoryFilter,
  updateInventoryStatus,
} from '../api/inventory-api';

export const searchInventories = createAsyncThunk(
  'inventories/searchInventories',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchInventoryFilter,
      data,
      action: 'Stock_SliceAction_FilterInventory',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const modifyDescription = createAsyncThunk(
  'inventories/modifyDescription',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: modifyDescriptionInventory,
      data,
      action: 'Stock_SliceAction_ModifyInventoryDescritption',
      getState,
      responseOptions: {showToast: true, isArrayResponse: false},
    }).then(() =>
      dispatch(fetchInventoryById({inventoryId: data.inventoryId})),
    );
  },
);

export const updateInventory = createAsyncThunk(
  'inventories/updateInventory',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: updateInventoryStatus,
      data,
      action: 'Stock_SliceAction_UpdateInventoryStatus',
      getState,
      responseOptions: {showToast: true, isArrayResponse: false},
    }).then(() =>
      dispatch(fetchInventoryById({inventoryId: data.inventoryId})),
    );
  },
);

export const fetchInventoryById = createAsyncThunk(
  'inventories/fetchInventoryById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchInventory,
      data,
      action: 'Stock_SliceAction_FetchInventoryById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loading: false,
  inventory: null,

  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  inventoryList: [],
};

const inventorySlice = createSlice({
  name: 'inventories',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchInventories, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'inventoryList',
    });
    builder.addCase(fetchInventoryById.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchInventoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.inventory = action.payload;
    });
    builder.addCase(fetchInventoryById.rejected, state => {
      state.loading = false;
      state.inventory = null;
    });
  },
});

export const inventoryReducer = inventorySlice.reducer;
