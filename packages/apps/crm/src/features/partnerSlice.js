/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
    generateInifiniteScrollCases(builder, fetchClientAndProspect, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'clientAndProspectList',
    });
  },
});

export const partnerReducer = partnerSlice.reducer;
