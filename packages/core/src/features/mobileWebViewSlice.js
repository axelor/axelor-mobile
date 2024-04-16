/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {fetchWebViewConfigs as _fetchWebViewConfigs} from '../webViews/api.helpers';

export const fetchWebViewConfigs = createAsyncThunk(
  'mobileWebView/fetchWebViewConfigs',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchWebViewConfigs,
      data: data,
      action: 'Base_SliceAction_FetchWebViewConfigs',
      getState: getState,
      responseOptions: {isArrayResponse: true, showToast: false},
    });
  },
);

const initialState = {
  webViewConfigs: [],
};

const mobileWebViewSlice = createSlice({
  name: 'mobileWebView',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchWebViewConfigs.fulfilled, (state, action) => {
      state.webViewConfigs = action.payload;
    });
  },
});

export const mobileWebViewReducer = mobileWebViewSlice.reducer;
