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
  fetchActiveTimer as _fetchActiveTimer,
  fetchTimer as _fetchTimer,
} from '../api/timer-api';

export const fetchTimer = createAsyncThunk(
  'hr_timer/fetchTimer',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchTimer,
      data,
      action: 'Hr_SliceAction_FetchTimer',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchTimerDateInterval = createAsyncThunk(
  'hr_timer/fetchTimerDateInterval',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchTimer,
      data,
      action: 'Hr_SliceAction_FetchTimerDateInterval',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchActiveTimer = createAsyncThunk(
  'hr_timer/fetchActiveTimer',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchActiveTimer,
      data,
      action: 'Hr_SliceAction_FetchActiveTimer',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingTimer: true,
  moreLoading: false,
  isListEnd: false,
  timerList: [],

  loadingTimerDateInterval: true,
  moreLoadingTimerDateInterval: false,
  isListEndTimerDateInterval: false,
  timerDateIntervalList: [],

  loadingActiveTimer: true,
  activeTimer: {},
};

const timerSlice = createSlice({
  name: 'hr_timer',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchTimer, {
      loading: 'loadingTimer',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'timerList',
    });
    generateInifiniteScrollCases(builder, fetchTimerDateInterval, {
      loading: 'loadingTimerDateInterval',
      moreLoading: 'moreLoadingTimerDateInterval',
      isListEnd: 'isListEndTimerDateInterval',
      list: 'timerDateIntervalList',
    });
    builder.addCase(fetchActiveTimer.pending, state => {
      state.loadingActiveTimer = true;
    });
    builder.addCase(fetchActiveTimer.fulfilled, (state, action) => {
      state.loadingActiveTimer = false;
      state.activeTimer = action.payload;
    });
  },
});

export const timerReducer = timerSlice.reducer;
