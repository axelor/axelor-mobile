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
  updateAgendaItems,
} from '@axelor/aos-mobile-core';
import {
  searchCatalog,
  getCatalogType,
  createCatalog as _createCatalog,
} from '../api/catalog-api';

export const fetchCatalog = createAsyncThunk(
  'catalog/fetchCatalog',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchCatalog,
      data,
      action: 'Crm_SliceAction_FetchCatalog',
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
      action: 'Crm_SliceAction_FetchCatalogType',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const createCatalog = createAsyncThunk(
  'catalog/createCatalog',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _createCatalog,
      data,
      action: 'Crm_SliceAction_CreateCatalog',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingCatalog: true,
  moreLoading: false,
  isListEnd: false,
  catalogList: [],

  loadingCatalogType: true,
  catalogTypeList: [],
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchCatalog, {
      loading: 'loadingCatalog',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'catalogList',
    });
    builder.addCase(fetchCatalogType.pending, state => {
      state.loadingCatalogType = true;
    });
    builder.addCase(fetchCatalogType.fulfilled, (state, action) => {
      state.loadingCatalogType = false;
      state.catalogTypeList = action.payload;
    });
    builder.addCase(createCatalog.fulfilled, (state, action) => {
      state.catalogList = updateAgendaItems(state.catalogList, [
        action.payload,
      ]);
    });
  },
});

export const catalogReducer = catalogSlice.reducer;
