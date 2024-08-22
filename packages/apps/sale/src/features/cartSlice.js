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
  updateAgendaItems,
} from '@axelor/aos-mobile-core';
import {
  searchCart as _searchCart,
  searchCartLine as _searchCartLine,
  updateCart as _updateCart,
} from '../api/cart-api';

export const searchCart = createAsyncThunk(
  'sale_cart/searchCart',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCart,
      data,
      action: 'Sale_SliceAction_SearchCart',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchCartLine = createAsyncThunk(
  'sale_cart/searchCartLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCartLine,
      data,
      action: 'Sale_SliceAction_SearchCartLine',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const updateCart = createAsyncThunk(
  'sale_cart/updateCart',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateCart,
      data,
      action: 'Sale_SliceAction_UpdateCart',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingCart: true,
  moreLoadingCart: false,
  isListEndCart: false,

  loading: true,
  moreLoading: false,
  isListEnd: false,
  cartList: [],
  carLineList: [],
};

const cartSlice = createSlice({
  name: 'sale_cart',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchCart, {
      loading: 'loadingCart',
      moreLoading: 'moreLoadingCart',
      isListEnd: 'isListEndCart',
      list: 'cartList',
    });
    generateInifiniteScrollCases(builder, searchCartLine, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'carLineList',
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.cartList = updateAgendaItems(state.cartList, [action.payload]);
    });
  },
});

export const cartReducer = cartSlice.reducer;
