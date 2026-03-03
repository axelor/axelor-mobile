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
import {searchProduct as _searchProduct} from '../api/product-api';

export const searchProduct = createAsyncThunk(
  'purchase_product/searchProduct',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchProduct,
      data,
      action: 'Purchase_SliceAction_SearchProduct',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingProducts: false,
  moreLoadingProduct: false,
  isListEndProduct: false,
  productList: [],
};

const productSlice = createSlice({
  name: 'purchase_product',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchProduct, {
      loading: 'loadingProducts',
      moreLoading: 'moreLoadingProduct',
      isListEnd: 'isListEndProduct',
      list: 'productList',
    });
  },
});

export const productReducer = productSlice.reducer;
