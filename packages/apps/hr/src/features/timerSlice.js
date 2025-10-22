/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
  createTimer as _createTimer,
  deleteTimer as _deleteTimer,
  fetchActiveTimer as _fetchActiveTimer,
  fetchTimer as _fetchTimer,
  fetchTimerById as _fetchTimerById,
  updateTimer as _updateTimer,
  updateTimerStatus as _updateTimerStatus,
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

export const fetchTimerById = createAsyncThunk(
  'hr_timer/fetchTimerById',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchTimerById,
      data,
      action: 'Hr_SliceAction_FetchTimerById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const fetchActiveTimer = createAsyncThunk(
  'hr_timer/fetchActiveTimer',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _fetchActiveTimer,
      data,
      action: 'Hr_SliceAction_FetchActiveTimer',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      if (res?.id != null) {
        dispatch(fetchTimerById({timerId: res.id}));
        return true;
      } else {
        return false;
      }
    });
  },
);

export const createTimer = createAsyncThunk(
  'hr_timer/createTimer',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _createTimer,
      data,
      action: 'Hr_SliceAction_CreateTimer',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      dispatch(
        updateTimerStatus({
          userId: data.userId,
          timerId: res.timerId,
          version: res.version,
          toStatus: 'start',
        }),
      );
    });
  },
);

export const updateTimer = createAsyncThunk(
  'hr_timer/updateTimer',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateTimer,
      data,
      action: 'Hr_SliceAction_UpdateTimer',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    })
      .then(() => {
        dispatch(fetchTimerById({timerId: data.timer.id}));
      })
      .then(() => {
        dispatch(fetchTimer({userId: data.userId, page: 0}));
      });
  },
);

export const updateTimerStatus = createAsyncThunk(
  'hr_timer/updateTimerStatus',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateTimerStatus,
      data,
      action: 'Hr_SliceAction_UpdateTimerStatus',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    })
      .then(() => {
        dispatch(fetchTimerById({timerId: data.timerId}));
      })
      .then(() => dispatch(fetchTimer({userId: data.userId, page: 0})));
  },
);

export const deleteTimer = createAsyncThunk(
  'hr_timer/deleteTimer',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _deleteTimer,
      data,
      action: 'Hr_SliceAction_DeleteTimer',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      dispatch(fetchTimer({userId: data.userId, page: 0}));
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

  loadingOneTimer: true,
  loadingCreation: false,
  timer: {},
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
    builder.addCase(createTimer.pending, state => {
      state.loadingCreation = true;
    });
    builder.addCase(createTimer.rejected, state => {
      state.loadingCreation = false;
    });
    builder.addCase(updateTimerStatus.rejected, state => {
      if (state.loadingCreation) {
        state.loadingCreation = false;
      }
    });
    builder.addCase(fetchTimerById.pending, state => {
      state.loadingOneTimer = true;
    });
    builder.addCase(fetchTimerById.fulfilled, (state, action) => {
      if (state.loadingCreation) {
        state.loadingCreation = false;
      }
      state.loadingOneTimer = false;
      state.timer = action.payload;
    });
    builder.addCase(fetchTimerById.rejected, state => {
      if (state.loadingCreation) {
        state.loadingCreation = false;
      }
    });
  },
});

export const timerReducer = timerSlice.reducer;
