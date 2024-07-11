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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {
  getProjectTimeData as _getProjectTimeData,
  getProjectFinancialData as _getProjectFinancialData,
} from '../api/reporting-api';

export const getProjectTimeData = createAsyncThunk(
  'project_reporting/getProjectTimeData',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _getProjectTimeData,
      data,
      action: 'Project_SliceAction_GetProjectTimeData',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const getProjectFinancialData = createAsyncThunk(
  'project_reporting/getProjectFinancialData',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _getProjectFinancialData,
      data,
      action: 'Project_SliceAction_GetProjectFinancialData',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  reportingTimeData: [],
  reportingFinancialData: [],
};

const reportingSlice = createSlice({
  name: 'project_reporting',
  initialState,
  extraReducers: builder => {
    builder.addCase(getProjectTimeData.fulfilled, (state, action) => {
      state.reportingTimeData = action.payload;
    });
    builder.addCase(getProjectFinancialData.fulfilled, (state, action) => {
      state.reportingFinancialData = action.payload;
    });
  },
});

export const reportingReducer = reportingSlice.reducer;
