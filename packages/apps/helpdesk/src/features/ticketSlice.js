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
import {
  getTicketType,
  searchTickets,
  searchTeamTickets,
} from '../api/ticket-api';

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

export const fetchTeamTickets = createAsyncThunk(
  'ticket/fetchTeamTickets',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchTeamTickets,
      data,
      action: 'Helpdesk_fetch_myTeamTicket',
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

const initialState = {
  loadingTicket: true,
  loadingTicketType: true,
  moreLoading: false,
  isListEnd: false,
  ticketList: [],
  ticketTypeList: [],
  tickeTeamtList: [],
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
    generateInifiniteScrollCases(builder, fetchTeamTickets, {
      loading: 'loadingTicket',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'tickeTeamtList',
    });
    builder.addCase(fetchTicketType.pending, state => {
      state.loadingTicketType = true;
    });
    builder.addCase(fetchTicketType.fulfilled, (state, action) => {
      state.loadingTicketType = false;
      state.ticketTypeList = action.payload;
    });
  },
});

export const ticketReducer = ticketSlice.reducer;
