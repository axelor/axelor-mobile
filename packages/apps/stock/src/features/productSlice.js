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
import {
  searchProductsFilter,
  searchProductWithId,
  updateLocker,
} from '../api/product-api';

export const searchProducts = createAsyncThunk(
  'product/searchProduct',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchProductsFilter,
      data,
      action: 'Stock_SliceAction_FilterProducts',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchProductWithId = createAsyncThunk(
  'product/fetchProductWithId',
  async function (productId, {getState}) {
    return handlerApiCall({
      fetchFunction: searchProductWithId,
      data: productId,
      action: 'Stock_SliceAction_FetchProductFromId',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateProductLocker = createAsyncThunk(
  'product/updateLocker',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateLocker,
      data,
      action: 'Stock_SliceAction_UpdateProductLocker',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

const initialState = {
  loadingProduct: false,
  moreLoadingProduct: false,
  isListEndProduct: false,
  productList: [],

  loadingProductFromId: false,
  productFromId: {},

  loadingProductLocker: false,
  updateResponde: {},
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchProducts, {
      loading: 'loadingProduct',
      moreLoading: 'moreLoadingProduct',
      isListEnd: 'isListEndProduct',
      list: 'productList',
    });
    builder.addCase(fetchProductWithId.pending, state => {
      state.loadingProductFromId = true;
    });
    builder.addCase(fetchProductWithId.fulfilled, (state, action) => {
      state.loadingProductFromId = false;
      state.productFromId = action.payload;
    });
    builder.addCase(updateProductLocker.pending, state => {
      state.loadingProductLocker = true;
    });
    builder.addCase(updateProductLocker.fulfilled, (state, action) => {
      state.loadingProductLocker = false;
      state.updateResponde = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;
