/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
  fetchProductById as _fetchProductById,
  fetchProductCompanyConfig as _fetchProductCompanyConfig,
  searchProduct as _searchProduct,
} from '../api/product-api';

export const searchProduct = createAsyncThunk(
  'sale_product/searchProduct',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchProduct,
      data,
      action: 'Sale_SliceAction_SearchProduct',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchProductById = createAsyncThunk(
  'sale_product/fetchProductById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchProductById,
      data,
      action: 'Sale_SliceAction_FetchProductById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const fetchProductCompanyConfig = createAsyncThunk(
  'sale_product/fetchProductCompanyConfig',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchProductCompanyConfig,
      data,
      action: 'Sale_SliceAction_FetchProductCompanyConfig',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  productList: [],

  loadingProduct: true,
  _product: {},

  productCompany: {},
  product: {},
};

const productSlice = createSlice({
  name: 'sale_product',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchProduct, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'productList',
    });
    builder.addCase(fetchProductById.pending, state => {
      state.loadingProduct = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loadingProduct = false;
      state.product = mergeConfigs(action.payload, state.productCompany);
      state._product = action.payload ?? {};
    });
    builder.addCase(fetchProductCompanyConfig.fulfilled, (state, action) => {
      state.productCompany = action.payload;
      state.product = mergeConfigs(state._product, action.payload);
    });
  },
});

function mergeConfigs(product, config) {
  if (product?.id === config?.product?.id) {
    return {
      ...product,
      ...config,
      id: product.id,
      version: product.version,
    };
  } else {
    return product ?? {};
  }
}

export const productReducer = productSlice.reducer;
