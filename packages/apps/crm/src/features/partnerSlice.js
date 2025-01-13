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
import {
  fetchPartnerAddressByIds as _fetchPartnerAddressByIds,
  getPartner,
  searchClientAndProspect,
  searchLinkedPartnersOfContact as _searchLinkedPartnersOfContact,
  searchPartner as _searchPartner,
} from '../api/partner-api';

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

export const searchPartner = createAsyncThunk(
  'partner/searchPartner',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchPartner,
      data,
      action: 'Crm_SliceAction_SearchPartner',
      getState,
      responseOptions: {isArrayResponse: true},
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

export const searchLinkedPartnersOfContact = createAsyncThunk(
  'client/searchLinkedPartnersOfContact',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchLinkedPartnersOfContact,
      data,
      action: 'Crm_SliceAction_FetchLinkedPartnersOfContact',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchPartnerAddressByIds = createAsyncThunk(
  'crm_partner/fetchPartnerAddressByIds',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchPartnerAddressByIds,
      data,
      action: 'Crm_SliceAction_FetchPartnerAddressByIds',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  partnerAddress: [],

  loadingPartner: true,
  partner: {},

  loadingList: false,
  clientAndProspectList: [],

  loadingPartnerList: false,
  moreLoading: false,
  isListEnd: false,
  partnerList: [],

  linkedPartnersOfContact: [],
};

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    updatePartner: (state, action) => {
      state.partner = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPartner.pending, state => {
      state.loadingPartner = true;
    });
    builder.addCase(fetchPartner.fulfilled, (state, action) => {
      state.loadingPartner = false;
      state.partner = action.payload;
    });
    builder.addCase(
      searchLinkedPartnersOfContact.fulfilled,
      (state, action) => {
        state.linkedPartnersOfContact = action.payload;
      },
    );
    generateInifiniteScrollCases(builder, fetchClientAndProspect, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'clientAndProspectList',
    });
    generateInifiniteScrollCases(builder, searchPartner, {
      loading: 'loadingPartnerList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'partnerList',
    });
    builder.addCase(fetchPartnerAddressByIds.fulfilled, (state, action) => {
      state.partnerAddress = action.payload;
    });
  },
});

export const {updatePartner} = partnerSlice.actions;

export const partnerReducer = partnerSlice.reducer;
