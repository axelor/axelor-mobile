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
import {handlerApiCall, updateAgendaItems} from '@axelor/aos-mobile-core';
import {
  searchClient,
  getClient,
  updateClient as _updateClient,
} from '../api/client-api';

export const fetchClients = createAsyncThunk(
  'client/fetchClients',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchClient,
      data,
      action: 'fetch crm client',
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
      action: 'fetch client by id',
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
      action: 'update crm client ',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: getClient,
        data: {clientId: res?.id},
        action: 'get client by id',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  clientList: [],
  client: {},
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchClients.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.clientList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.clientList = [...state.clientList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(getClientbyId.pending, state => {
      state.loading = true;
    });
    builder.addCase(getClientbyId.fulfilled, (state, action) => {
      state.loading = false;
      state.client = action.payload;
    });
    builder.addCase(updateClient.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.loading = false;
      state.client = action.payload;
      state.clientList = updateAgendaItems(state.clientList, [action.payload]);
    });
  },
});

export const clientReducer = clientSlice.reducer;
