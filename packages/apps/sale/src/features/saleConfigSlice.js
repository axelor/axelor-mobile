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
import {fetchSaleConfig as _fetchSaleConfig} from '../api/sale-config-api';

export const fetchSaleConfig = createAsyncThunk(
  'sale_saleConfig/fetchSaleConfig',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchSaleConfig,
      data,
      action: 'Sale_SliceAction_FetchSaleConfig',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingSaleConfig: true,
  saleConfig: {},
};

const saleConfigSlice = createSlice({
  name: 'sale_saleConfig',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchSaleConfig.pending, (state, action) => {
      state.loadingSaleConfig = true;
    });
    builder.addCase(fetchSaleConfig.fulfilled, (state, action) => {
      state.loadingSaleConfig = false;
      state.saleConfig = action.payload?.[0];
    });
  },
});

export const saleConfigReducer = saleConfigSlice.reducer;
