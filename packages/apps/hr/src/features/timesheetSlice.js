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
  handlerApiCall,
  generateInifiniteScrollCases,
} from '@axelor/aos-mobile-core';
import {
  addTimerTimesheet as _addTimerTimesheet,
  createTimesheet as _createTimesheet,
  deleteTimesheet as _deleteTimesheet,
  fetchDraftTimesheet as _fetchDraftTimesheet,
  fetchTimesheet as _fetchTimesheet,
  fetchTimesheetById as _fetchTimesheetById,
  fetchTimesheetToValidate as _fetchTimesheetToValidate,
  updateTimesheetStatus as _updateTimesheetStatus,
} from '../api/timesheet-api';
import {fetchTimer} from './timerSlice';

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

export const fetchDraftTimesheet = createAsyncThunk(
  'timesheet/fetchDraftTimesheet',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchDraftTimesheet,
      data,
      action: 'Hr_SliceAction_FetchDraftTimesheet',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const createTimesheet = createAsyncThunk(
  'timesheet/createTimesheet',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _createTimesheet,
      data,
      action: 'Hr_SliceAction_CreateTimesheet',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      dispatch(fetchTimesheet({userId: data.userId}));
      dispatch(fetchTimer({userId: data.userId}));
      return res;
    });
  },
);

export const addTimerTimesheet = createAsyncThunk(
  'timesheet/addTimerTimesheet',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _addTimerTimesheet,
      data,
      action: 'Hr_SliceAction_AddTimerTimesheet',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(fetchTimer({userId: data.userId}));
    });
  },
);

export const updateTimesheetStatus = createAsyncThunk(
  'timesheet/updateTimesheetStatus',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateTimesheetStatus,
      data,
      action: 'Hr_SliceAction_UpdateTimesheetStatus',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    })
      .then(() => {
        dispatch(fetchTimesheetById({timesheetId: data.timesheetId}));
      })
      .then(() => {
        dispatch(fetchTimesheet({userId: data.user.id}));
      })
      .then(() => {
        dispatch(fetchTimesheetToValidate({user: data.user}));
      });
  },
);

export const deleteTimesheet = createAsyncThunk(
  'timesheet/deleteTimesheet',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _deleteTimesheet,
      data,
      action: 'Hr_SliceAction_DeleteTimesheet',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      dispatch(fetchTimesheet({userId: data.userId}));
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

  loadingDraftTimesheet: true,
  draftTimesheetList: [],
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
    builder.addCase(fetchDraftTimesheet.pending, state => {
      state.loadingDraftTimesheet = true;
    });
    builder.addCase(fetchDraftTimesheet.fulfilled, (state, action) => {
      state.loadingDraftTimesheet = false;
      state.draftTimesheetList = action.payload;
    });
  },
});

export const timesheetReducer = timesheetSlice.reducer;
