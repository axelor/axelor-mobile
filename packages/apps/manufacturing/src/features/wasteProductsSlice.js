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
  createManufacturingOrderWasteProduct,
  declareManufacturingOrderWasteProduct,
  fetchManufacturingOrderWasteProducts,
  updateManufacturingOrderWasteProduct,
} from '../api/waste-product-api';

export const fetchWasteProducts = createAsyncThunk(
  'wasteProducts/fetchWasteProducts',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchManufacturingOrderWasteProducts,
      data,
      action: 'fetch manufacturing order waste products',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const addWasteProductToManufOrder = createAsyncThunk(
  'wasteProducts/addWasteProductToManufOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: createManufacturingOrderWasteProduct,
      data,
      action: 'create new waste product on manufacturing order',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const updateWasteProductOfManufOrder = createAsyncThunk(
  'wasteProducts/updateWasteProductOfManufOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateManufacturingOrderWasteProduct,
      data,
      action: 'update waste product qty of manufacturing order',
      getState,
      responseOptions: {showToast: true},
    }).then(() =>
      handlerApiCall({
        fetchFunction: fetchManufacturingOrderWasteProducts,
        data,
        action: 'fetch manufacturing order waste products',
        getState,
        responseOptions: {isArrayResponse: true},
      }),
    );
  },
);

export const declareWasteProductsOfManufOrder = createAsyncThunk(
  'wasteProducts/declareWasteProductsOfManufOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: declareManufacturingOrderWasteProduct,
      data,
      action: 'declare waste products of manufacturing order',
      getState,
      responseOptions: {showToast: true, isArrayResponse: false},
    });
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  wasteProductList: [],
  declareResponse: null,
};

const wasteProductsSlice = createSlice({
  name: 'wasteProducts',
  initialState,
  reducers: {
    clearDeclareResponse: state => {
      state.declareResponse = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchWasteProducts.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchWasteProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.wasteProductList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.wasteProductList = [
            ...state.wasteProductList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(
      updateWasteProductOfManufOrder.fulfilled,
      (state, action) => {
        state.wasteProductList = action.payload;
      },
    );
    builder.addCase(
      declareWasteProductsOfManufOrder.fulfilled,
      (state, action) => {
        state.declareResponse = action.payload;
      },
    );
  },
});

export const {clearDeclareResponse} = wasteProductsSlice.actions;

export const wasteProductsReducer = wasteProductsSlice.reducer;
