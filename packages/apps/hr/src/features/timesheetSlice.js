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
import {
  handlerApiCall,
  generateInifiniteScrollCases,
} from '@axelor/aos-mobile-core';
import {fetchTimesheet as _fetchTimesheet} from '../api/timesheet-api';

export const fetchTimesheet = createAsyncThunk(
  'hr_timesheet/fetchTimesheet',
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

const initialState = {
  loadingTimesheet: true,
  moreLoading: false,
  isListEnd: false,
  timesheetList: [],
};

const timesheetSlice = createSlice({
  name: 'hr_timesheet',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchTimesheet, {
      loading: 'loadingTimesheet',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'timesheetList',
    });
  },
});

export const timesheetReducer = timesheetSlice.reducer;
