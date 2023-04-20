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
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: modifyDescriptionInventory,
      data,
      action: 'Stock_SliceAction_ModifyInventoryDescritption',
      getState,
      responseOptions: {showToast: true, isArrayResponse: false},
    }).then(object =>
      handlerApiCall({
        fetchFunction: fetchInventory,
        data: {inventoryId: object.id},
        action: 'Stock_SliceAction_FetchInventoryById',
        getState,
        responseOptions: {isArrayResponse: false},
      }),
    );
  },
);

export const updateInventory = createAsyncThunk(
  'inventories/updateInventory',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateInventoryStatus,
      data,
      action: 'Stock_SliceAction_UpdateInventoryStatus',
      getState,
      responseOptions: {showToast: true, isArrayResponse: false},
    }).then(object =>
      handlerApiCall({
        fetchFunction: fetchInventory,
        data: {inventoryId: object.inventoryId},
        action: 'Stock_SliceAction_FetchInventoryById',
        getState,
        responseOptions: {isArrayResponse: false},
      }),
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
  moreLoading: false,
  isListEnd: false,
  inventoryList: [],
};

const inventorySlice = createSlice({
  name: 'inventories',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchInventoryById.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchInventoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.inventory = action.payload;
    });
    builder.addCase(searchInventories.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(searchInventories.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.inventoryList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.inventoryList = [...state.inventoryList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(modifyDescription.pending, state => {
      state.loading = true;
    });
    builder.addCase(modifyDescription.fulfilled, (state, action) => {
      state.loading = false;
      state.inventory = action.payload;
    });
    builder.addCase(updateInventory.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateInventory.fulfilled, (state, action) => {
      state.loading = false;
      state.inventory = action.payload;
    });
  },
});

export const inventoryReducer = inventorySlice.reducer;
