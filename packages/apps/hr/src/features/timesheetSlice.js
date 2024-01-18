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
import {
  handlerApiCall,
  generateInifiniteScrollCases,
} from '@axelor/aos-mobile-core';
import {
  fetchTimesheet as _fetchTimesheet,
  fetchTimesheetById as _fetchTimesheetById,
  fetchTimesheetToValidate as _fetchTimesheetToValidate,
} from '../api/timesheet-api';

export const fetchTimesheet = createAsyncThunk(
  'timesheet/fetchTimesheet',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchTimesheet,
      data,
      action: 'Hr_SliceAction_FetchTimesheet',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchTimesheetToValidate = createAsyncThunk(
  'timesheet/fetchTimesheetToValidate',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchTimesheetToValidate,
      data,
      action: 'Hr_SliceAction_FetchTimesheetToValidate',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

export const fetchTimesheetById = createAsyncThunk(
  'timesheet/fetchTimesheetById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchTimesheetById,
      data,
      action: 'Hr_SliceAction_FetchTimesheetById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingMyTimesheet: true,
  moreLoadingMyTimesheet: false,
  isListEndMyTimesheet: false,
  myTimesheetList: [],

  loadingTimesheetToValidate: true,
  moreLoadingTimesheetToValidate: false,
  isListEndTimesheetToValidate: false,
  timesheetToValidateList: [],
  totalNumberTimesheetToValidate: 0,

  loadingTimesheet: true,
  timesheet: {},
};

const timesheetSlice = createSlice({
  name: 'timesheet',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchTimesheet, {
      loading: 'loadingMyTimesheet',
      moreLoading: 'moreLoadingMyTimesheet',
      isListEnd: 'isListEndMyTimesheet',
      list: 'myTimesheetList',
    });
    generateInifiniteScrollCases(
      builder,
      fetchTimesheetToValidate,
      {
        loading: 'loadingTimesheetToValidate',
        moreLoading: 'moreLoadingTimesheetToValidate',
        isListEnd: 'isListEndTimesheetToValidate',
        list: 'timesheetToValidateList',
        total: 'totalNumberTimesheetToValidate',
      },
      {
        manageTotal: true,
      },
    );
    builder.addCase(fetchTimesheetById.pending, (state, action) => {
      state.loadingTimesheet = true;
    });
    builder.addCase(fetchTimesheetById.fulfilled, (state, action) => {
      state.loadingTimesheet = false;
      state.timesheet = action.payload;
    });
  },
});

export const timesheetReducer = timesheetSlice.reducer;
