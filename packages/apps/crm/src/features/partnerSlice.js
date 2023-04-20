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
import {getPartner, searchClientAndProspect} from '../api/partner-api';

export const fetchPartner = createAsyncThunk(
  'partner/fetchPartner',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getPartner,
      data,
      action: 'Crm_SliceAction_FetchPartner',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const fetchClientAndProspect = createAsyncThunk(
  'client/fetchClients',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchClientAndProspect,
      data,
      action: 'Crm_SliceAction_FetchClientProspect',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingPartner: true,
  partner: {},
  clientAndProspectList: [],
  loading: false,
  moreLoading: false,
  isListEnd: false,
};

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchPartner.pending, state => {
      state.loadingPartner = true;
    });
    builder.addCase(fetchPartner.fulfilled, (state, action) => {
      state.loadingPartner = false;
      state.partner = action.payload;
    });
    builder.addCase(fetchClientAndProspect.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchClientAndProspect.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.clientAndProspectList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.clientAndProspectList = [
            ...state.clientAndProspectList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
  },
});

export const partnerReducer = partnerSlice.reducer;
