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
  searchCart,
  searchCartLine as _searchCartLine,
  updateCart as _updateCart,
  updateCartLine as _updateCartLine,
  deleteCartLine as _deleteCartLine,
} from '../api/cart-api';

export const fetchActiveCart = createAsyncThunk(
  'sale_cart/searchCart',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchCart,
      data,
      action: 'Sale_SliceAction_SearchCart',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const searchCartLine = createAsyncThunk(
  'sale_cartLine/searchCartLine',
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
    }).then(() => {
      handlerApiCall({
        fetchFunction: searchCart,
        data,
        action: 'Sale_SliceAction_SearchCart',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const deleteCartLine = createAsyncThunk(
  'sale_cartLine/deleteCartLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _deleteCartLine,
      data,
      action: 'Sale_SliceAction_DeleteCartLine',
      getState,
      responseOptions: {isArrayResponse: true},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: _searchCartLine,
        data: {cartId: data.cartId},
        action: 'Sale_SliceAction_SearchCartLine',
        getState,
        responseOptions: {isArrayResponse: true},
      });
    });
  },
);

export const updateCartLine = createAsyncThunk(
  'sale_cartLine/updateCartLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateCartLine,
      data,
      action: 'Sale_SliceAction_UpdateCartLine',
      getState,
      responseOptions: {isArrayResponse: true},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: _searchCartLine,
        data: {cartId: data.cartId},
        action: 'Sale_SliceAction_SearchCartLine',
        getState,
        responseOptions: {isArrayResponse: true},
      });
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
  activeCart: {},
  carLineList: [],
};

const cartSlice = createSlice({
  name: 'sale_cart',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchActiveCart.fulfilled, (state, action) => {
      state.activeCart = action.payload;
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
    builder.addCase(updateCartLine.fulfilled, (state, action) => {
      state.carLineList = action.payload;
    });
    builder.addCase(deleteCartLine.fulfilled, (state, action) => {
      state.carLineList = action.payload;
    });
  },
});

export const cartReducer = cartSlice.reducer;
