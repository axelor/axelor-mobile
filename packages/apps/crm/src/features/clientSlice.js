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
  generateInifiniteScrollCases,
  handlerApiCall,
  updateAgendaItems,
} from '@axelor/aos-mobile-core';
import {
  createClient as _createClient,
  getClient,
  searchClient,
  updateClient as _updateClient,
} from '../api/client-api';

export const fetchClients = createAsyncThunk(
  'client/fetchClients',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchClient,
      data,
      action: 'Crm_SliceAction_FetchClient',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const getClientbyId = createAsyncThunk(
  'client/getClientbyId',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getClient,
      data,
      action: 'Crm_SliceAction_FetchClientById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateClient = createAsyncThunk(
  'client/updateClient',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateClient,
      data,
      action: 'Crm_SliceAction_UpdateClient',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: getClient,
        data: {clientId: res?.id},
        action: 'Crm_SliceAction_FetchClientById',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const createClient = createAsyncThunk(
  'crm_client/createClient',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _createClient,
      data,
      action: 'Crm_SliceAction_CreateClient',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingClientList: false,
  moreLoading: false,
  isListEnd: false,
  clientList: [],

  loadingClient: false,
  client: {},
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchClients, {
      loading: 'loadingClientList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'clientList',
    });
    builder.addCase(getClientbyId.pending, state => {
      state.loadingClient = true;
    });
    builder.addCase(getClientbyId.fulfilled, (state, action) => {
      state.loadingClient = false;
      state.client = action.payload;
    });
    builder.addCase(updateClient.pending, (state, action) => {
      state.loadingClient = true;
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.loadingClient = false;
      state.client = action.payload;
      state.clientList = updateAgendaItems(state.clientList, [action.payload]);
    });
  },
});

export const clientReducer = clientSlice.reducer;
