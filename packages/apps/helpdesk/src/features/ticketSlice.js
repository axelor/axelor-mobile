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
  updateAgendaItems,
} from '@axelor/aos-mobile-core';
import {
  getTicket,
  getTicketType,
  searchTickets,
  updateStatusTicket,
  searchTicketType as _searchTicketType,
  updateTicket as _updateTicket,
  createTicket as _createTicket,
} from '../api/ticket-api';

export const fetchTickets = createAsyncThunk(
  'ticket/fetchTickets',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchTickets,
      data,
      action: 'Helpdesk_SliceAction_FetchMyTicket',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchTicketType = createAsyncThunk(
  'ticket/fetchTicketType',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getTicketType,
      data,
      action: 'Helpdesk_SliceAction_FetchTicketType',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchTicketById = createAsyncThunk(
  'ticket/fetchTicketById',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getTicket,
      data,
      action: 'Helpdesk_SliceAction_FetchTicketById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateTicketStatus = createAsyncThunk(
  'ticket/updateTicketStatus',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: updateStatusTicket,
      data,
      action: 'Helpdesk_SliceAction_UpdateTicketStatus',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: getTicket,
        data: {ticketId: data?.ticketId},
        action: 'Helpdesk_SliceAction_FetchTicketById',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const searchTicketType = createAsyncThunk(
  'ticket/searchTicketType',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchTicketType,
      data,
      action: 'Helpdesk_SliceAction_SearchTicketType',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const updateTicket = createAsyncThunk(
  'ticket/updateTicket',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateTicket,
      data,
      action: 'Helpdesk_SliceAction_UpdateTicket',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: getTicket,
        data: {ticketId: data?.ticket?.id},
        action: 'Helpdesk_SliceAction_FetchTicketById',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const createTicket = createAsyncThunk(
  'ticket/createTicket',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _createTicket,
      data,
      action: 'Helpdesk_SliceAction_CreateTicket',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: searchTickets,
        data,
        action: 'Helpdesk_SliceAction_FetchMyTicket',
        getState,
        responseOptions: {isArrayResponse: true},
      });
    });
  },
);

const initialState = {
  loadingTicket: true,
  moreLoading: false,
  isListEnd: false,
  ticketList: [],
  ticket: {},
  loadingTicketType: true,
  moreLoadingTicketType: false,
  isListEndTicketType: false,
  ticketTypeList: [],
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchTickets, {
      loading: 'loadingTicket',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'ticketList',
    });
    generateInifiniteScrollCases(builder, searchTicketType, {
      loading: 'loadingTicketType',
      moreLoading: 'moreLoadingTicketType',
      isListEnd: 'isListEndTicketType',
      list: 'ticketTypeList',
    });
    builder.addCase(fetchTicketType.pending, state => {
      state.loadingTicketType = true;
    });
    builder.addCase(fetchTicketType.fulfilled, (state, action) => {
      state.loadingTicketType = false;
      state.ticketTypeList = action.payload;
    });
    builder.addCase(fetchTicketById.pending, (state, action) => {
      state.loadingTicket = true;
    });
    builder.addCase(fetchTicketById.fulfilled, (state, action) => {
      state.loadingTicket = false;
      state.ticket = action.payload;
    });
    builder.addCase(updateTicketStatus.pending, (state, action) => {
      state.loadingTicket = true;
    });
    builder.addCase(updateTicketStatus.fulfilled, (state, action) => {
      state.loadingTicket = false;
      state.ticket = action.payload;
      state.ticketList = updateAgendaItems(state.ticketList, [action.payload]);
    });
    builder.addCase(updateTicket.pending, (state, action) => {
      state.loadingTicket = true;
    });
    builder.addCase(updateTicket.fulfilled, (state, action) => {
      state.loadingTicket = false;
      state.ticket = action.payload;
      state.ticketList = updateAgendaItems(state.ticketList, [action.payload]);
    });
    builder.addCase(createTicket.pending, (state, action) => {
      state.loadingTicket = true;
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.loadingTicket = false;
      state.ticketList = action.payload;
    });
  },
});

export const ticketReducer = ticketSlice.reducer;
