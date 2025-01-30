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
import {fetchHelpdeskConfig as _fetchHelpdeskConfig} from '../api/helpdesk-config-api';

export const fetchHelpdeskConfig = createAsyncThunk(
  'AppHelpdesk/fetchHelpdeskConfig',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchHelpdeskConfig,
      data,
      action: 'Helpdesk_SliceAction_FetchHelpdeskConfig',
      getState,
      responseOptions: {isArrayResponse: false},
      errorOptions: {showErrorToast: false, errorTracing: false},
    });
  },
);

const initialState = {
  loadingConfig: false,
  helpdeskConfig: {},
};

const helpdeskConfigSlice = createSlice({
  name: 'helpdeskConfig',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchHelpdeskConfig.pending, state => {
      state.loadingConfig = true;
    });
    builder.addCase(fetchHelpdeskConfig.fulfilled, (state, action) => {
      state.loadingConfig = false;
      state.helpdeskConfig = action.payload;
    });
  },
});

export const helpdeskConfigReducer = helpdeskConfigSlice.reducer;
