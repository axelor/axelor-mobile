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
import {searchCatalog, getCatalogType} from '../api/catalog-api';

export const fetchCatalog = createAsyncThunk(
  'catalog/fetchCatalog',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchCatalog,
      data,
      action: 'fetch catalog',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchCatalogType = createAsyncThunk(
  'catalog/fetchCatalogType',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getCatalogType,
      data,
      action: 'fetch catalog CatalogType',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingCatalog: true,
  loadingCatalogType: true,
  moreLoading: false,
  isListEnd: false,
  catalogList: [],
  catalogTypeList: [],
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchCatalog.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingCatalog = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchCatalog.fulfilled, (state, action) => {
      state.loadingCatalog = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.catalogList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.catalogList = [...state.catalogList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchCatalogType.pending, state => {
      state.loadingCatalogType = true;
    });
    builder.addCase(fetchCatalogType.fulfilled, (state, action) => {
      state.loadingCatalogType = false;
      state.catalogTypeList = action.payload;
    });
  },
});

export const catalogReducer = catalogSlice.reducer;
