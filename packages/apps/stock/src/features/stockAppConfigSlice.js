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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {fetchSupplychainConfig} from '../api/supplychain-config-api';

export const fetchSupplychainConfigForStockApp = createAsyncThunk(
  'stockAppConfig/fetchSupplychainConfigForStockApp',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchSupplychainConfig,
      data,
      action: 'Stock_SliceAction_FetchSupplychainConfig',
      getState,
      responseOptions: {isArrayResponse: false},
      errorOptions: {showErrorToast: false, errorTracing: false},
    });
  },
);

const initialState = {
  loadingConfig: false,
  supplychainConfig: {},
};

const stockAppConfigSlice = createSlice({
  name: 'stockAppConfig',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchSupplychainConfigForStockApp.pending, state => {
      state.loadingConfig = true;
    });
    builder.addCase(
      fetchSupplychainConfigForStockApp.fulfilled,
      (state, action) => {
        state.loadingConfig = false;
        state.supplychainConfig = action.payload;
      },
    );
  },
});

export const stockAppConfigReducer = stockAppConfigSlice.reducer;
