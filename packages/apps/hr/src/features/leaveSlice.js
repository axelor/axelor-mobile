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
  fetchLeave as _fetchLeave,
  fetchLeaveById as _fetchLeaveById,
  fetchLeaveToValidate as _fetchLeaveToValidate,
} from '../api/leave-api';

export const fetchLeave = createAsyncThunk(
  'hr_leave/fetchLeave',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchLeave,
      data,
      action: 'Hr_SliceAction_FetchLeave',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchLeaveToValidate = createAsyncThunk(
  'hr_leave/fetchLeaveToValidate',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchLeaveToValidate,
      data,
      action: 'Hr_SliceAction_FetchLeaveToValidate',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

export const fetchLeaveById = createAsyncThunk(
  'hr_leave/fetchLeaveById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchLeaveById,
      data,
      action: 'Hr_SliceAction_FetchLeaveById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingMyLeave: true,
  moreLoadingMyLeave: false,
  isListEndMyLeave: false,
  myLeaveList: [],

  loadingLeaveToValidate: true,
  moreLoadingLeaveToValidate: false,
  isListEndLeaveToValidate: false,
  leaveToValidateList: [],
  totalNumberLeaveToValidate: 0,

  loadingLeave: true,
  leave: {},
};

const leaveSlice = createSlice({
  name: 'hr_leave',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchLeave, {
      loading: 'loadingMyLeave',
      moreLoading: 'moreLoadingMyLeave',
      isListEnd: 'isListEndMyLeave',
      list: 'myLeaveList',
    });
    generateInifiniteScrollCases(
      builder,
      fetchLeaveToValidate,
      {
        loading: 'loadingLeaveToValidate',
        moreLoading: 'moreLoadingLeaveToValidate',
        isListEnd: 'isListEndLeaveToValidate',
        list: 'leaveToValidateList',
        total: 'totalNumberLeaveToValidate',
      },
      {
        manageTotal: true,
      },
    );
    builder.addCase(fetchLeaveById.pending, state => {
      state.loadingLeave = true;
    });
    builder.addCase(fetchLeaveById.fulfilled, (state, action) => {
      state.loadingLeave = false;
      state.leave = action.payload;
    });
  },
});

export const leaveReducer = leaveSlice.reducer;
