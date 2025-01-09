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
import {fetchIndicator as _fetchIndicator} from '../api/reporting-api';

export const getProjectReportingIndicator = createAsyncThunk(
  'project_reporting/getProjectReportingIndicator',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchIndicator,
      data,
      action: 'Project_SliceAction_GetProjectReportingIndicator',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  reportingIndicator: [],
};

const reportingSlice = createSlice({
  name: 'project_reporting',
  initialState,
  extraReducers: builder => {
    builder.addCase(getProjectReportingIndicator.fulfilled, (state, action) => {
      state.reportingIndicator = action.payload?.categoryList;
    });
  },
});

export const reportingReducer = reportingSlice.reducer;
