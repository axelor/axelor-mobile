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
import {handlerApiCall} from '../../apiProviders';
import {postTranslations} from '../../i18n';
import {uploadNavigationTools as _uploadNavigationTools} from '../api/config-api';

export const uploadTranslations = createAsyncThunk(
  'base/uploadTranslations',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: postTranslations,
      data,
      action: 'Auth_SliceAction_UploadTranslations',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const uploadNavigationTools = createAsyncThunk(
  'base/uploadNavigationTools',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _uploadNavigationTools,
      data,
      action: 'Auth_SliceAction_UploadNavigationTools',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

const initialState = {
  loadingTranslations: false,
  loading: false,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  extraReducers: builder => {
    builder.addCase(uploadTranslations.pending, state => {
      state.loadingTranslations = true;
    });
    builder.addCase(uploadTranslations.fulfilled, (state, action) => {
      state.loadingTranslations = false;
    });
    builder.addCase(uploadTranslations.rejected, state => {
      state.loadingTranslations = false;
    });
    builder.addCase(uploadNavigationTools.pending, state => {
      state.loading = true;
    });
    builder.addCase(uploadNavigationTools.rejected, state => {
      state.loading = false;
    });
    builder.addCase(uploadNavigationTools.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export const configReducer = configSlice.reducer;
