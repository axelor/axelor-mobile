import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {searchTickets} from '../api/ticket-api';

export const fetchTickets = createAsyncThunk(
  'ticket/myTicket',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchTickets,
      data,
      action: 'fetch myTicket',
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
  ticket: {},
};

const ticketSlice = createSlice({
  name: 'lead',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchTickets, {
      loading: 'loadingTicket',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'ticketList',
    });
  },
});

export const ticketReducer = ticketSlice.reducer;
