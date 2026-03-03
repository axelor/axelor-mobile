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
import {handlerApiCall} from '../apiProviders/utils';
import {getAppConfig} from '../api/app-config-api';

const fetchConfig = async (data, {getState}) => {
  return await handlerApiCall({
    fetchFunction: getAppConfig,
    data,
    action: 'Base_SliceAction_FetchMobileConfig',
    getState,
    responseOptions: {isArrayResponse: false},
  });
};

export const fetchRequiredConfig = createAsyncThunk(
  'appConfig/fetchRequiredConfig',
  async function (data, {getState}) {
    let promises = [];

    data.forEach(configName => {
      promises.push(fetchConfig({configName}, {getState}));
    });

    return Promise.all(promises);
  },
);

const initialState = {
  loadingConfig: false,
};

const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    resetConfigs: state => {
      state.loadingConfig = false;
      state.mobileConfigured = false;
      state.numberConfig = 0;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRequiredConfig.pending, state => {
      state.loadingConfig = true;
    });
    builder.addCase(fetchRequiredConfig.rejected, state => {
      state.loadingConfig = false;
    });
    builder.addCase(fetchRequiredConfig.fulfilled, (state, action) => {
      const configs = action.meta.arg ?? [];
      state.loadingConfig = false;
      configs.forEach((name, idx) => {
        state[formatAppName(name)] = action.payload[idx];
      });
      state.mobileConfigured = configs.find(_i => _i === 'AppMobileSettings');
      state.numberConfig = configs.length;
    });
  },
});

const formatAppName = appName => {
  const configName = appName.replace('App', '');

  return configName.charAt(0).toLowerCase() + configName.substr(1);
};

export const {resetConfigs} = appConfigSlice.actions;

export const appConfigReducer = appConfigSlice.reducer;
