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
  createProdProduct,
  fetchManufacturingOrderConsumedProducts,
  fetchManufacturingOrderProducedProducts,
  searchProdProductWithId,
  updateProdProduct,
} from '../api/prod-product-api';

const TYPE_CONSUMED = 'consumed';
const TYPE_PRODUCED = 'produced';

export const fetchConsumedProducts = createAsyncThunk(
  'prodProducts/fetchConsumedProducts',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchManufacturingOrderConsumedProducts,
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
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: createProdProduct,
      data,
      action: 'Manufacturing_SliceAction_CreateProdProduct',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

export const updateProdProductOfManufOrder = createAsyncThunk(
  'prodProducts/updateProdProductOfManufOrder',
  async function (data, {getState}) {
    const type = data?.type;
    return handlerApiCall({
      fetchFunction: updateProdProduct,
      data,
      action: 'Manufacturing_SliceAction_UpdateProdProductQty',
      getState,
      responseOptions: {showToast: true},
    }).then(() => {
      if (type === TYPE_CONSUMED) {
        return handlerApiCall({
          fetchFunction: fetchManufacturingOrderConsumedProducts,
          data,
          action: 'Manufacturing_SliceAction_FetchComsumedProducts',
          getState,
          responseOptions: {},
        });
      } else if (type === TYPE_PRODUCED) {
        return handlerApiCall({
          fetchFunction: fetchManufacturingOrderProducedProducts,
          data,
          action: 'Manufacturing_SliceAction_FetchProducedProducts',
          getState,
          responseOptions: {},
        });
      }
    });
  },
);

export const addTrackingNumberToConsumedProduct = createAsyncThunk(
  'consumedProduct/addTrackingNumberToConsumedProduct',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: updateStockMoveLineTrackingNumberApi,
      data,
      action:
        'Manufacturing_SliceAction_AddTrackingNumberToConsumedProductStockMoveLine',
      getState,
      responseOptions: {showToast: true, isArrayResponse: false},
    }).then(async res => {
      const {productList} = await handlerApiCall({
        fetchFunction: fetchManufacturingOrderConsumedProducts,
        data,
        action: 'Manufacturing_SliceAction_FetchComsumedProducts',
        getState,
        responseOptions: {},
      });

      return {consumedProducts: productList, stockMoveLine: res};
    });
  },
);

const initialState = {
  loadingConsumedProducts: false,
  consumedProductList: [],
  loadingConsumedProductStockMoveLine: false,
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
      updateProdProductOfManufOrder.fulfilled,
      (state, action) => {
        if (action.meta.arg.type === TYPE_CONSUMED) {
          state.consumedProductList = action.payload?.productList;
        } else if (action.meta.arg.type === TYPE_PRODUCED) {
          state.producedProductList = action.payload?.productList;
        }
      },
    );
    builder.addCase(addTrackingNumberToConsumedProduct.pending, state => {
      state.loadingConsumedProductStockMoveLine = true;
    });
    builder.addCase(
      addTrackingNumberToConsumedProduct.fulfilled,
      (state, action) => {
        state.loadingConsumedProductStockMoveLine = false;
        state.consumedProductList = action.payload?.consumedProducts;
        state.consumedProductStockMoveLine = action.payload?.stockMoveLine;
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
