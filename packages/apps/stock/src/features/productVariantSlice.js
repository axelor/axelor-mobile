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
import {fetchVariantAttributes, fetchVariants} from '../api/product-api';

export const fetchProductVariants = createAsyncThunk(
  'product/fetchProductVariant',
  async function (productVariantId, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchVariants,
      data: productVariantId,
      action: 'fetch product variants',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

var getProductAttributes = async (data, {getState}) => {
  return handlerApiCall({
    fetchFunction: fetchVariantAttributes,
    data,
    action: 'fetch product variants attributes',
    getState,
    responseOptions: {isArrayResponse: true},
  });
};

async function fetchData(data, {getState}) {
  return await getProductAttributes(data, {getState});
}

export const fetchProductsAttributes = createAsyncThunk(
  'product/fetchProductsAttributes',
  async function (data, {getState}) {
    let promises = [];
    data.productList.forEach(product => {
      promises.push(
        fetchData(
          {productVariantId: product.id, version: product.version},
          {getState},
        ),
      );
    });
    return Promise.all(promises);
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  productListVariables: [],
  listProductsAttributes: [],
};

const productSlice = createSlice({
  name: 'productVariant',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProductVariants.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchProductVariants.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0) {
        state.productListVariables = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.productListVariables = [
            ...state.productListVariables,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchProductsAttributes.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAttributes.fulfilled, (state, action) => {
      state.loading = false;
      state.listProductsAttributes = action.payload;
    });
  },
});

export const productVariantReducer = productSlice.reducer;
