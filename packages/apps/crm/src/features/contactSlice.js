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
  searchContactWithIds,
  searchContact,
  getContact as _getContact,
  updateContact as _updateContact,
} from '../api/contact-api';

export const searchContactById = createAsyncThunk(
  'contact/searchContactById',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchContactWithIds,
      data,
      action: 'filter contact by id',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchContact = createAsyncThunk(
  'contact/fetchContact',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchContact,
      data,
      action: 'fetch crm contact',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const getContact = createAsyncThunk(
  'contact/getContact',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _getContact,
      data,
      action: 'get contact by id',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateContact = createAsyncThunk(
  'contact/updateContact',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateContact,
      data,
      action: 'update crm contact ',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: _getContact,
        data: {contactId: res?.id},
        action: 'get contact by id',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

const initialState = {
  loading: false,
  listContactById: [],
  moreLoading: false,
  loadingContact: false,
  isListEnd: false,
  contactList: [],
  contact: {},
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchContactById.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchContactById.fulfilled, (state, action) => {
      state.loading = false;
      state.listContactById = action.payload;
    });
    builder.addCase(fetchContact.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingContact = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchContact.fulfilled, (state, action) => {
      state.loadingContact = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.contactList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.contactList = [...state.contactList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(getContact.pending, state => {
      state.loading = true;
    });
    builder.addCase(getContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contact = action.payload;
    });
    builder.addCase(updateContact.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contact = action.payload;
      state.contactList = updateAgendaItems(state.contactList, [
        action.payload,
      ]);
    });
  },
});

export const contactReducer = contactSlice.reducer;
