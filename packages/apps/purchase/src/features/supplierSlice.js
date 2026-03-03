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
import {searchSupplier as _searchSupplier} from '../api/supplier-api';

export const searchSupplier = createAsyncThunk(
  'purchase_supplier/searchSupplier',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchSupplier,
      data,
      action: 'Purchase_SliceAction_SearchSupplier',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingSuppliers: false,
  moreLoadingSupplier: false,
  isListEndSupplier: false,
  supplierList: [],
};

const supplierSlice = createSlice({
  name: 'purchase_supplier',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchSupplier, {
      loading: 'loadingSuppliers',
      moreLoading: 'moreLoadingSupplier',
      isListEnd: 'isListEndSupplier',
      list: 'supplierList',
    });
  },
});

export const supplierReducer = supplierSlice.reducer;
