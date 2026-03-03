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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {searchSupplierProduct} from '../api/supplier-catalog-api';

export const fetchProductForSupplier = createAsyncThunk(
  'supplierCatalog/fetchProductForSupplier',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchSupplierProduct,
      data,
      action: 'Stock_SliceAction_FetchSupplierCatalogForProduct',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingSupplierCatalog: false,
  supplierProductInfo: {},
};

const supplierCatalogSlice = createSlice({
  name: 'supplierCatalog',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProductForSupplier.pending, state => {
      state.loadingSupplierCatalog = true;
    });
    builder.addCase(fetchProductForSupplier.fulfilled, (state, action) => {
      state.loadingSupplierCatalog = false;
      state.supplierProductInfo = action.payload;
    });
  },
});

export const supplierCatalogReducer = supplierCatalogSlice.reducer;
