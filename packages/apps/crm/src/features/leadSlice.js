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
  updateAgendaItems,
} from '@axelor/aos-mobile-core';
import {
  searchLeads,
  getLeadStatus,
  getLead,
  updateLeadScoring,
  updateLead as _updateLead,
} from '../api/leads-api';

export const fetchLeads = createAsyncThunk(
  'lead/Lead',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchLeads,
      data,
      action: 'Crm_SliceAction_FetchLead',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchLeadStatus = createAsyncThunk(
  'lead/leadStatus',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getLeadStatus,
      data,
      action: 'Crm_SliceAction_FetchLeadStatus',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchLeadById = createAsyncThunk(
  'lead/getLead',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getLead,
      data,
      action: 'Crm_SliceAction_FetchLeadById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateLeadScore = createAsyncThunk(
  'lead/updateLeadScore',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: updateLeadScoring,
      data,
      action: 'Crm_SliceAction_UpdateLeadScore',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: getLead,
        data: {leadId: res?.id},
        action: 'Crm_SliceAction_FetchLeadById',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const updateLead = createAsyncThunk(
  'lead/updateLead',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateLead,
      data,
      action: 'Crm_SliceAction_UpdateLead',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: getLead,
        data: {leadId: res?.id},
        action: 'Crm_SliceAction_FetchLeadById',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

const initialState = {
  loadingLead: true,
  loadingLeadStatus: true,
  moreLoading: false,
  isListEnd: false,
  leadList: [],
  leadStatusList: [],
  lead: {},
};

const leadSlice = createSlice({
  name: 'lead',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchLeads, {
      loading: 'loadingLead',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'leadList',
    });
    builder.addCase(fetchLeadStatus.pending, state => {
      state.loadingLeadStatus = true;
    });
    builder.addCase(fetchLeadStatus.fulfilled, (state, action) => {
      state.loadingLeadStatus = false;
      state.leadStatusList = action.payload;
    });
    builder.addCase(fetchLeadById.pending, (state, action) => {
      state.loadingLead = true;
    });
    builder.addCase(fetchLeadById.fulfilled, (state, action) => {
      state.loadingLead = false;
      state.lead = action.payload;
    });
    builder.addCase(updateLeadScore.pending, (state, action) => {
      state.loadingLead = true;
    });
    builder.addCase(updateLeadScore.fulfilled, (state, action) => {
      state.loadingLead = false;
      state.lead = action.payload;
      state.leadList = updateAgendaItems(state.leadList, [action.payload]);
    });
    builder.addCase(updateLead.pending, (state, action) => {
      state.loadingLead = true;
    });
    builder.addCase(updateLead.fulfilled, (state, action) => {
      state.loadingLead = false;
      state.lead = action.payload;
      state.leadList = updateAgendaItems(state.leadList, [action.payload]);
    });
  },
});

export const leadReducer = leadSlice.reducer;
