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
import {fetchProductionConfig as _fetchProductionConfig} from '../api/production-config-api';

export const fetchProductionConfig = createAsyncThunk(
  'productionAppConfig/fetchProductionConfig',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchProductionConfig,
      data,
      action: 'Manufacturing_SliceAction_FetchProductionConfig',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  productionConfig: {},
};

const productionAppConfigSlice = createSlice({
  name: 'productionAppConfig',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProductionConfig.fulfilled, (state, action) => {
      state.productionConfig = action.payload;
    });
  },
});

export const productionAppConfigReducer = productionAppConfigSlice.reducer;
