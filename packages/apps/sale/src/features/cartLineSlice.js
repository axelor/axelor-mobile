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
  searchCartLine as _searchCartLine,
  updateCartLine as _updateCartLine,
  deleteCartLine as _deleteCartLine,
  fetchCartLineById as _fetchCartLineById,
} from '../api/cart-line-api';

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

export const fetchCartLineById = createAsyncThunk(
  'sale_cartLine/fetchCartLineById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchCartLineById,
      data,
      action: 'Sale_SliceAction_Fetch cartLineById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loading: true,
  moreLoading: false,
  isListEnd: false,
  carLineList: [],

  cartLine: {},
};

const cartLineSlice = createSlice({
  name: 'sale_cartLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchCartLine, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'carLineList',
    });
    builder.addCase(updateCartLine.fulfilled, (state, action) => {
      state.carLineList = action.payload;
    });
    builder.addCase(deleteCartLine.fulfilled, (state, action) => {
      state.carLineList = action.payload;
    });
    builder.addCase(fetchCartLineById.fulfilled, (state, action) => {
      state.cartLine = action.payload;
    });
  },
});

export const cartLineReducer = cartLineSlice.reducer;
