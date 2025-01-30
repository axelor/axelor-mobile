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
import {handlerApiCall} from '../apiProviders/utils';
import {fetchDashboardConfigs as _fetchDashboardConfigs} from '../dashboards/api.helpers';

export const fetchDashboardConfigs = createAsyncThunk(
  'mobileDashboard/fetchDashboardConfigs',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchDashboardConfigs,
      data: data,
      action: 'Base_SliceAction_FetchDashboardConfigs',
      getState: getState,
      responseOptions: {isArrayResponse: true, showToast: false},
    });
  },
);

const initialState = {
  dashboardConfigs: [],
};

const mobileDashboardSlice = createSlice({
  name: 'mobileDashboard',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchDashboardConfigs.fulfilled, (state, action) => {
      state.dashboardConfigs = action.payload;
    });
  },
});

export const mobileDashboardReducer = mobileDashboardSlice.reducer;
