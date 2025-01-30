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
import {handlerApiCall} from '../../apiProviders';
import {postTranslations} from '../../i18n';
import {getBaseConfig, getMobileSettings} from '../api/config-api';

export const fetchBaseConfig = createAsyncThunk(
  'base/fetchBaseConfig',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getBaseConfig,
      data,
      action: 'Auth_SliceAction_FetchBaseConfig',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const uploadTranslations = createAsyncThunk(
  'base/uploadTranslations',
  async function ({language, translations}) {
    return postTranslations(language, translations);
  },
);

export const fetchMobileSettings = createAsyncThunk(
  'mobile-settings/fetchMobileSettings',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getMobileSettings,
      data,
      action: 'Auth_SliceAction_FetchAppMobileSettings',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loading: false,
  baseConfig: {},
  mobileSettings: {},
  message: null,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    clearMessage: state => {
      state.message = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBaseConfig.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchBaseConfig.fulfilled, (state, action) => {
      state.loading = false;
      state.baseConfig = action.payload;
    });
    builder.addCase(uploadTranslations.pending, state => {
      state.loading = true;
    });
    builder.addCase(uploadTranslations.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(fetchMobileSettings.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchMobileSettings.fulfilled, (state, action) => {
      state.loading = false;
      state.mobileSettings = action.payload;
    });
  },
});

export const {clearMessage} = configSlice.actions;

export const configReducer = configSlice.reducer;
