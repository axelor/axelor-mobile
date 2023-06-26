/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {fetchHelpdeskConfig} from '../api/helpdesk-config-api';

export const fetchHelpdeskConfigApi = createAsyncThunk(
  'AppHelpdesk/fetchHelpdeskConfigApi',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchHelpdeskConfig,
      data,
      action: 'Helpdesk_FetchHelpdeskConfig',
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
    builder.addCase(fetchHelpdeskConfigApi.pending, state => {
      state.loadingConfig = true;
    });
    builder.addCase(fetchHelpdeskConfigApi.fulfilled, (state, action) => {
      state.loadingConfig = false;
      state.helpdeskConfig = action.payload;
    });
  },
});

export const helpdeskConfigReducer = helpdeskConfigSlice.reducer;
