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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {createTimesheetLine} from '@axelor/aos-mobile-hr';
import {fetchTimesheetLinesByTask as _fetchTimesheetLinesByTask} from '../api/timesheet-lines-api';

export const fetchTimesheetLinesByTask = createAsyncThunk(
  'project_timesheetLines/fetchTimesheetLinesByTask',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchTimesheetLinesByTask,
      data,
      action: 'Project_SliceAction_FetchTimesheetLinesByTask',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const createTimeLog = createAsyncThunk(
  'project_timesheetLines/createTimeLog',
  async function (data, {dispatch}) {
    return dispatch(createTimesheetLine(data));
  },
);

const initialState = {
  timesheetLineList: [],
  resetTimeForm: false,
};

const timesheetLinesSlice = createSlice({
  name: 'project_timesheetLines',
  initialState,
  reducers: {
    clearReset: state => {
      state.resetTimeForm = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTimesheetLinesByTask.fulfilled, (state, action) => {
      state.timesheetLineList = action.payload;
    });
    builder.addCase(createTimeLog.fulfilled, state => {
      state.resetTimeForm = true;
    });
  },
});

export const {clearReset} = timesheetLinesSlice.actions;

export const timesheetLinesReducer = timesheetLinesSlice.reducer;
