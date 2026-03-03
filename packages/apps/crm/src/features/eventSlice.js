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
  searchEventsByIds,
  partnerEventById,
  contactEventById,
  getPlannedEvent,
  getEvent,
  createEvent as _createEvent,
  updateEvent as _updateEvent,
} from '../api/event-api';
import {fetchLeadById} from './leadSlice';
import {updateTourLine} from './tourLineSlice';

export const searchEventById = createAsyncThunk(
  'event/searchEventById',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchEventsByIds,
      data,
      action: 'Crm_SliceAction_FilterEventById',
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
      action: 'Crm_SliceAction_FetchPartnerEvent',
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
      action: 'Crm_SliceAction_FetchContactEvent',
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
      action: 'Crm_SliceAction_FetchPlannedEvent',
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
      action: 'Crm_SliceAction_FetchEventById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _createEvent,
      data,
      action: 'Crm_SliceAction_CreateEvent',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(res => {
      if (data?.tourlineData != null) {
        dispatch(updateTourLine({...data.tourlineData, event: res}));
      }
      if (data?.event?.isLead) {
        dispatch(fetchLeadById({leadId: data?.event?.eventLead?.id}));
      }
      return res;
    });
  },
);

export const updateEvent = createAsyncThunk(
  'event/updateEvent',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateEvent,
      data,
      action: 'Crm_SliceAction_UpdateEvent',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => dispatch(fetchEventById({eventId: data.event.id})));
  },
);

const initialState = {
  loading: false,
  listEventById: [],
  listEventPartner: [],
  listEventContact: [],

  loadingEventList: true,
  moreLoading: false,
  isListEnd: false,
  eventList: [],

  loadingEvent: true,
  event: {},
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchPlannedEvent, {
      loading: 'loadingEventList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'eventList',
    });
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
    builder.addCase(fetchEventById.pending, state => {
      state.loadingEvent = true;
    });
    builder.addCase(fetchEventById.rejected, state => {
      state.loadingEvent = false;
    });
    builder.addCase(fetchEventById.fulfilled, (state, action) => {
      state.loadingEvent = false;
      state.event = action.payload;
    });
  },
});

export const eventReducer = eventSlice.reducer;
