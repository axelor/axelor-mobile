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
import {getMobileConfigs} from '../api/mobile-config-api';
import {handlerApiCall} from '../apiProviders/utils';

export const fetchMobileConfig = createAsyncThunk(
  'mobileConfig/fetchMobileConfig',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getMobileConfigs,
      data,
      action: 'Base_SliceAction_FetchMobileConfig',
      getState,
      responseOptions: {isArrayResponse: true},
      errorOptions: {showErrorToast: false, errorTracing: false},
    });
  },
);

const initialState = {
  loadingConfig: false,
  mobileConfigs: [],
};

const mobileConfigSlice = createSlice({
  name: 'mobileConfig',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchMobileConfig.pending, state => {
      state.loadingConfig = true;
    });
    builder.addCase(fetchMobileConfig.rejected, state => {
      state.loadingConfig = false;
    });
    builder.addCase(fetchMobileConfig.fulfilled, (state, action) => {
      state.loadingConfig = false;
      state.mobileConfigs = action.payload;
    });
  },
});

export const mobileConfigReducer = mobileConfigSlice.reducer;
