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
import {
  searchEventsByIds,
  partnerEventById,
  contactEventById,
  getPlannedEvent,
  getEvent,
} from '../api/event-api';

export const searchEventById = createAsyncThunk(
  'event/searchEventById',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchEventsByIds,
      data,
      action: 'filter event by id',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchPartnerEventById = createAsyncThunk(
  'event/fetchPartnerEventById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: partnerEventById,
      data,
      action: 'fetch crm partnerEvent',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchContactEventById = createAsyncThunk(
  'event/fetchContactEventById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: contactEventById,
      data,
      action: 'fetch crm contactEvent',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchPlannedEvent = createAsyncThunk(
  'Event/fetchPlannedEvent',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getPlannedEvent,
      data,
      action: 'fetch planned event',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchEventById = createAsyncThunk(
  'event/fetchEventById',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getEvent,
      data,
      action: 'get crm event by id',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loading: false,
  listEventById: [],
  listEventPartner: [],
  listEventContact: [],
  loadingEvent: true,
  moreLoading: false,
  isListEnd: false,
  eventList: [],
  event: {},
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchEventById.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchEventById.fulfilled, (state, action) => {
      state.loading = false;
      state.listEventById = action.payload;
    });
    builder.addCase(fetchPartnerEventById.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPartnerEventById.fulfilled, (state, action) => {
      state.loading = false;
      state.listEventPartner = action.payload;
    });
    builder.addCase(fetchContactEventById.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchContactEventById.fulfilled, (state, action) => {
      state.loading = false;
      state.listEventContact = action.payload;
    });
    builder.addCase(fetchPlannedEvent.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingEvent = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchPlannedEvent.fulfilled, (state, action) => {
      state.loadingEvent = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.eventList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.eventList = [...state.eventList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchEventById.pending, (state, action) => {
      state.loadingEvent = true;
    });
    builder.addCase(fetchEventById.fulfilled, (state, action) => {
      state.loadingEvent = false;
      state.event = action.payload;
    });
  },
});

export const eventReducer = eventSlice.reducer;
