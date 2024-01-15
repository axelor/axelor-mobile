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
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {fetchTimesheetLineSlice as _fetchTimesheetLineSlice} from '../api/timesheet-line-api';

export const fetchTimesheetLineSlice = createAsyncThunk(
  'timesheetLine/fetchExpenseLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchTimesheetLineSlice,
      data,
      action: 'Hr_SliceAction_FetchTimesheetLine',
      getState,
      responseOptions: {isArrayResponse: true},
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
    generateInifiniteScrollCases(builder, fetchTimesheetLineSlice, {
      loading: 'loadingTimesheetLine',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'timesheetLineList',
    });
  },
});

export const timesheetLineReducer = timesheetLineSlice.reducer;
