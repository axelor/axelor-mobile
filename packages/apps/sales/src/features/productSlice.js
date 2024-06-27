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
  fetchProductCompanyConfigById as _fetchProductCompanyConfigById,
  searchProduct as _searchProduct,
} from '../api/product-api';

export const searchProduct = createAsyncThunk(
  'sales_product/searchProduct',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchProduct,
      data,
      action: 'Sales_SliceAction_SearchProduct',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchProductById = createAsyncThunk(
  'sales_product/fetchProductById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchProductById,
      data,
      action: 'Sales_SliceAction_FetchProductById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const fetchProductCompanyConfigById = createAsyncThunk(
  'sales_product/fetchProductCompanyConfigById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchProductCompanyConfigById,
      data,
      action: 'Sales_SliceAction_FetchProductCompanyConfigById',
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
  product: {},

  productCompany: {},
};

const productSlice = createSlice({
  name: 'sales_product',
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
      state.product = action.payload;
    });
    builder.addCase(
      fetchProductCompanyConfigById.fulfilled,
      (state, action) => {
        state.productCompany = action.payload;
      },
    );
  },
});

export const productReducer = productSlice.reducer;
