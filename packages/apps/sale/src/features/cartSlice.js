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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {
  searchCart,
  updateCart as _updateCart,
  validateCart as _validateCart,
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

export const updateCart = createAsyncThunk(
  'sale_cart/updateCart',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateCart,
      data,
      action: 'Sale_SliceAction_UpdateCart',
      getState,
      responseOptions: {isArrayResponse: true},
    }).then(() => dispatch(fetchActiveCart(data)));
  },
);

export const validateCart = createAsyncThunk(
  'sale_cart/validateCart',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _validateCart,
      data,
      action: 'Sale_SliceAction_ValidateCart',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => dispatch(fetchActiveCart(data)));
  },
);

const initialState = {
  activeCart: {},
};

const cartSlice = createSlice({
  name: 'sale_cart',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchActiveCart.fulfilled, (state, action) => {
      state.activeCart = action.payload;
    });
  },
});

export const cartReducer = cartSlice.reducer;
