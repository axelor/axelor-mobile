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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {
  searchProductWithIdApi,
  updateStockMoveLineTrackingNumberApi,
} from '@axelor/aos-mobile-stock';
import {
  createOperationOrderConsumedProduct,
  createProdProduct,
  fetchManufacturingOrderConsumedProducts,
  fetchManufacturingOrderProducedProducts,
  fetchOperationOrderConsumedProducts,
  searchProdProductWithId,
  updateProdProduct,
} from '../api/prod-product-api';

const TYPE_CONSUMED = 'consumed';
const TYPE_PRODUCED = 'produced';

export const fetchConsumedProducts = createAsyncThunk(
  'prodProducts/fetchConsumedProducts',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: data.operationOrderId
        ? fetchOperationOrderConsumedProducts
        : fetchManufacturingOrderConsumedProducts,
      data,
      action: 'Manufacturing_SliceAction_FetchComsumedProducts',
      getState,
      responseOptions: {},
    });
  },
);

export const fetchConsumedProductWithId = createAsyncThunk(
  'product/fetchConsumedProductWithId',
  async function (productId, {getState}) {
    return handlerApiCall({
      fetchFunction: searchProductWithIdApi,
      data: productId,
      action: 'Manufacturing_SliceAction_FetchConsumedProductWithId',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const fetchProducedProducts = createAsyncThunk(
  'prodProducts/fetchProducedProducts',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchManufacturingOrderProducedProducts,
      data,
      action: 'Manufacturing_SliceAction_FetchProducedProducts',
      getState,
      responseOptions: {},
    });
  },
);

export const fetchProducedProductWithId = createAsyncThunk(
  'product/fetchCProducedProductWithId',
  async function (productId, {getState}) {
    return handlerApiCall({
      fetchFunction: searchProductWithIdApi,
      data: productId,
      action: 'Manufacturing_SliceAction_FetchProducedProductWithId',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const fetchProdProductWithId = createAsyncThunk(
  'product/fetchProdProductWithId',
  async function (productId, {getState}) {
    return handlerApiCall({
      fetchFunction: searchProdProductWithId,
      data: productId,
      action: 'Manufacturing_SliceAction_FetchProdProductWithId',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const addProdProductToManufOrder = createAsyncThunk(
  'prodProducts/addProdProductToManufOrder',
  async function (data, {getState, dispatch}) {
    const type = data?.productType;
    return handlerApiCall({
      fetchFunction: createProdProduct,
      data,
      action: 'Manufacturing_SliceAction_CreateProdProduct',
      getState,
      responseOptions: {showToast: true},
    }).then(() => {
      if (type === TYPE_CONSUMED) {
        dispatch(fetchConsumedProducts(data));
      } else if (type === TYPE_PRODUCED) {
        dispatch(fetchProducedProducts(data));
      }
    });
  },
);

export const addProdProductToOperationOrder = createAsyncThunk(
  'prodProducts/addProdProductToOperationOrder',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: createOperationOrderConsumedProduct,
      data,
      action: 'Manufacturing_SliceAction_CreateProdProduct',
      getState,
      responseOptions: {showToast: true},
    }).then(() => {
      dispatch(fetchConsumedProducts(data));
    });
  },
);

export const updateProdProductOfManufOrder = createAsyncThunk(
  'prodProducts/updateProdProductOfManufOrder',
  async function (data, {getState, dispatch}) {
    const type = data?.type;
    return handlerApiCall({
      fetchFunction: updateProdProduct,
      data,
      action: 'Manufacturing_SliceAction_UpdateProdProductQty',
      getState,
      responseOptions: {showToast: true},
    }).then(() => {
      if (type === TYPE_CONSUMED) {
        dispatch(fetchConsumedProducts(data));
      } else if (type === TYPE_PRODUCED) {
        dispatch(fetchProducedProducts(data));
      }
    });
  },
);

export const addTrackingNumberToConsumedProduct = createAsyncThunk(
  'consumedProduct/addTrackingNumberToConsumedProduct',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: updateStockMoveLineTrackingNumberApi,
      data,
      action:
        'Manufacturing_SliceAction_AddTrackingNumberToConsumedProductStockMoveLine',
      getState,
      responseOptions: {showToast: true, isArrayResponse: false},
    }).then(async res => {
      dispatch(fetchConsumedProducts(data));

      return res;
    });
  },
);

const initialState = {
  loadingConsumedProducts: false,
  consumedProductList: [],

  consumedProductStockMoveLine: {},

  loadingProducedProducts: false,
  producedProductList: [],

  loadingConsumedProduct: false,
  consumedProduct: {},

  loadingProducedProduct: false,
  producedProduct: {},

  loadingProdProduct: false,
  prodProduct: {},
};

const prodProductsSlice = createSlice({
  name: 'prodProducts',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchConsumedProducts.pending, state => {
      state.loadingConsumedProducts = true;
    });
    builder.addCase(fetchConsumedProducts.fulfilled, (state, action) => {
      state.loadingConsumedProducts = false;
      state.consumedProductList = action.payload?.productList;
    });
    builder.addCase(fetchProducedProducts.pending, state => {
      state.loadingProducedProducts = true;
    });
    builder.addCase(fetchProducedProducts.fulfilled, (state, action) => {
      state.loadingProducedProducts = false;
      state.producedProductList = action.payload?.productList;
    });
    builder.addCase(
      addTrackingNumberToConsumedProduct.fulfilled,
      (state, action) => {
        state.consumedProductStockMoveLine = action.payload;
      },
    );
    builder.addCase(fetchConsumedProductWithId.pending, state => {
      state.loadingConsumedProduct = true;
    });
    builder.addCase(fetchConsumedProductWithId.fulfilled, (state, action) => {
      state.loadingConsumedProduct = false;
      state.consumedProduct = action.payload;
    });
    builder.addCase(fetchProducedProductWithId.pending, state => {
      state.loadingProducedProduct = true;
    });
    builder.addCase(fetchProducedProductWithId.fulfilled, (state, action) => {
      state.loadingProducedProduct = false;
      state.producedProduct = action.payload;
    });
    builder.addCase(fetchProdProductWithId.pending, state => {
      state.loadingProdProduct = true;
    });
    builder.addCase(fetchProdProductWithId.fulfilled, (state, action) => {
      state.loadingProdProduct = false;
      state.prodProduct = action.payload;
    });
  },
});

export const prodProductsReducer = prodProductsSlice.reducer;
