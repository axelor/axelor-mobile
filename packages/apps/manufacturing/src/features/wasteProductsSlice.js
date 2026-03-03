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
      action: 'Manufacturing_SliceAction_FetchWasteProducts',
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
      action: 'Manufacturing_SliceAction_CreateWasteProduct',
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
      action: 'Manufacturing_SliceAction_UpdateWasteProductQty',
      getState,
      responseOptions: {showToast: true},
    }).then(() =>
      handlerApiCall({
        fetchFunction: fetchManufacturingOrderWasteProducts,
        data,
        action: 'Manufacturing_SliceAction_FetchWasteProducts',
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
      action: 'Manufacturing_SliceAction_DeclareWasteProducts',
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
    generateInifiniteScrollCases(builder, fetchWasteProducts, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'wasteProductList',
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
