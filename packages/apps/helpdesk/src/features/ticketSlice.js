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
import {getTicket, getTicketType, searchTickets} from '../api/ticket-api';

export const fetchTickets = createAsyncThunk(
  'ticket/fetchTickets',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchTickets,
      data,
      action: 'Helpdesk_fetch_myTicket',
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
      action: 'Helpdesk_fetch_Ticket_Type',
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
      action: 'Heldesk_Fetch_Ticket_ById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingTicket: true,
  loadingTicketType: true,
  moreLoading: false,
  isListEnd: false,
  ticketList: [],
  ticketTypeList: [],
  ticket: {},
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
  },
});

export const ticketReducer = ticketSlice.reducer;
