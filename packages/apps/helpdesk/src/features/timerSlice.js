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
import {handlerApiCall} from '@axelor/aos-mobile-core';

import {getTimer, searchTimerHistoryWithId} from '../api/timer-api';

export const fetchTimerById = createAsyncThunk(
  'timer/fetchTimerById',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getTimer,
      data,
      action: 'Heldesk_Fetch_Timer_ById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const searchTimerHistoryById = createAsyncThunk(
  'timerHistory/searchTimerHistoryById',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchTimerHistoryWithId,
      data,
      action: 'Heldesk_Fetch_TimerHistory_WithId',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingTimer: true,
  timer: {},
  timerHistory: [],
};

const ticketSlice = createSlice({
  name: 'timer',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchTimerById.pending, (state, action) => {
      state.loadingTimer = true;
    });
    builder.addCase(fetchTimerById.fulfilled, (state, action) => {
      state.loadingTimer = false;
      state.timer = action.payload;
    });
    builder.addCase(searchTimerHistoryById.pending, state => {
      state.loadingTimer = true;
    });
    builder.addCase(searchTimerHistoryById.fulfilled, (state, action) => {
      state.loadingTimer = false;
      state.timerHistory = action.payload;
    });
  },
});

export const timerReducer = ticketSlice.reducer;
