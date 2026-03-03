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
  fetchTimesheetLine as _fetchTimesheetLine,
  updateTimesheetLine as _updateTimesheetLine,
} from '../api/timesheet-line-api';
import {fetchTimesheetById} from './timesheetSlice';

export const fetchTimesheetLine = createAsyncThunk(
  'timesheetLine/fetchTimesheetLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchTimesheetLine,
      data,
      action: 'Hr_SliceAction_FetchTimesheetLine',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const createTimesheetLine = createAsyncThunk(
  'timesheetLine/createTimesheetLine',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _createTimesheetLine,
      data,
      action: 'Hr_SliceAction_CreateTimesheetLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      if (data?.timesheetLine?.timesheetId != null) {
        dispatch(
          fetchTimesheetById({timesheetId: data.timesheetLine.timesheetId}),
        );
      }
    });
  },
);

export const updateTimesheetLine = createAsyncThunk(
  'timesheetLine/updateTimesheetLine',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateTimesheetLine,
      data,
      action: 'Hr_SliceAction_UpdateTimesheetLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() =>
      dispatch(fetchTimesheetById({timesheetId: data.timesheetId})),
    );
  },
);

export const deleteTimesheetLine = createAsyncThunk(
  'timesheet/deleteTimesheetLine',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _deleteTimesheetLine,
      data,
      action: 'Hr_SliceAction_DeleteTimesheetLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      dispatch(fetchTimesheetById({timesheetId: data.timesheetId}));
    });
  },
);

const initialState = {
  loadingTimesheetLine: true,
  moreLoading: false,
  isListEnd: false,
  timesheetLineList: [],
};

const timesheetLineSlice = createSlice({
  name: 'timesheetLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchTimesheetLine, {
      loading: 'loadingTimesheetLine',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'timesheetLineList',
    });
  },
});

export const timesheetLineReducer = timesheetLineSlice.reducer;
