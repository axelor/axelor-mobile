/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {handlerApiCall} from '../apiProviders/utils';
import {getAllMetaModules} from '../api/meta-module-api';

export const fetchMetaModules = createAsyncThunk(
  'metaModule/fetchMetaModules',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getAllMetaModules,
      data,
      action: 'Base_SliceAction_FetchMetaModule',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  metaModules: [],
};

const metaModuleSlice = createSlice({
  name: 'metaModule',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchMetaModules.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchMetaModules.fulfilled, (state, action) => {
      state.loading = false;
      state.metaModules = action.payload;
    });
  },
});

export const metaModuleReducer = metaModuleSlice.reducer;
