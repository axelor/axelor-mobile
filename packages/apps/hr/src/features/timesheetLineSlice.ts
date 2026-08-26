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
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {
  createTimesheetLine as _createTimesheetLine,
  deleteTimesheetLine as _deleteTimesheetLine,
  fetchAllTimesheetLines as _fetchAllTimesheetLines,
  fetchTimesheetLine as _fetchTimesheetLine,
  fetchTimesheetLineCount as _fetchTimesheetLineCount,
  updateTimesheetLine as _updateTimesheetLine,
} from '../api/timesheet-line-api';
import {fetchTimesheetById} from './timesheetSlice';

export const fetchTimesheetLine = createAsyncThunk(
  'timesheetLine/fetchTimesheetLine',
  async function (data: any, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchTimesheetLine,
      data,
      action: 'Hr_SliceAction_FetchTimesheetLine',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchAllTimesheetLines = createAsyncThunk(
  'timesheetLine/fetchAllTimesheetLines',
  async function (data: any, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchAllTimesheetLines,
      data,
      action: 'Hr_SliceAction_FetchTimesheetLine',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchTimesheetLineCount = createAsyncThunk(
  'timesheetLine/fetchTimesheetLineCount',
  async function (data: any, {getState}) {
    if (data?.timesheetId == null) return null;

    return handlerApiCall({
      fetchFunction: _fetchTimesheetLineCount,
      data,
      action: 'Hr_SliceAction_FetchTimesheetLineCount',
      getState,
      responseOptions: {isArrayResponse: false},
      errorOptions: {showErrorToast: false, errorTracing: false},
    });
  },
);

const refreshTimesheet = (dispatch: any, timesheetId: number) => {
  if (timesheetId == null) return;

  dispatch((fetchTimesheetById as any)({timesheetId}));
  dispatch(fetchAllTimesheetLines({timesheetId}));
  dispatch(fetchTimesheetLineCount({timesheetId}));
};

export const createTimesheetLine = createAsyncThunk(
  'timesheetLine/createTimesheetLine',
  async function (data: any, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _createTimesheetLine,
      data,
      action: 'Hr_SliceAction_CreateTimesheetLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => refreshTimesheet(dispatch, data?.timesheetLine?.timesheetId));
  },
);

export const updateTimesheetLine = createAsyncThunk(
  'timesheetLine/updateTimesheetLine',
  async function (data: any, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateTimesheetLine,
      data,
      action: 'Hr_SliceAction_UpdateTimesheetLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => refreshTimesheet(dispatch, data.timesheetId));
  },
);

export const deleteTimesheetLine = createAsyncThunk(
  'timesheet/deleteTimesheetLine',
  async function (data: any, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _deleteTimesheetLine,
      data,
      action: 'Hr_SliceAction_DeleteTimesheetLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => refreshTimesheet(dispatch, data.timesheetId));
  },
);

const initialState: any = {
  loadingTimesheetLine: true,
  moreLoading: false,
  isListEnd: false,
  timesheetLineList: [],

  loadingAllTimesheetLines: false,
  allTimesheetLineList: [],

  loadingTimesheetLineCount: false,
  timesheetLineCounts: null,
  loadedTimesheetId: null,
};

const timesheetLineSlice = createSlice({
  name: 'timesheetLine',
  initialState,
  reducers: {},
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchTimesheetLine, {
      loading: 'loadingTimesheetLine',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'timesheetLineList',
    });
    builder.addCase(fetchAllTimesheetLines.pending, (state, action) => {
      state.loadingAllTimesheetLines = true;
      if (state.loadedTimesheetId !== action.meta.arg.timesheetId) {
        state.loadedTimesheetId = action.meta.arg.timesheetId;
        state.allTimesheetLineList = [];
        state.timesheetLineCounts = null;
      }
    });
    builder.addCase(fetchAllTimesheetLines.fulfilled, (state, action) => {
      state.loadingAllTimesheetLines = false;
      state.allTimesheetLineList = action.payload ?? [];
    });
    builder.addCase(fetchAllTimesheetLines.rejected, state => {
      state.loadingAllTimesheetLines = false;
    });
    builder.addCase(fetchTimesheetLineCount.pending, state => {
      state.loadingTimesheetLineCount = true;
    });
    builder.addCase(fetchTimesheetLineCount.fulfilled, (state, action) => {
      state.loadingTimesheetLineCount = false;
      state.timesheetLineCounts = action.payload;
    });
    builder.addCase(fetchTimesheetLineCount.rejected, state => {
      state.loadingTimesheetLineCount = false;
      state.timesheetLineCounts = null;
    });
  },
});

export const timesheetLineReducer = timesheetLineSlice.reducer;
