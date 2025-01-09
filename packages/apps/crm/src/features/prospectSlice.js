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
  searchProspect,
  getProspect,
  getProspectStatus,
  updateProspectScoring,
  updateProspect as _updateProspect,
} from '../api/prospect-api';

export const fetchProspects = createAsyncThunk(
  'prospect/fetchProspects',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchProspect,
      data,
      action: 'Crm_SliceAction_FetchProspect',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchProspectStatus = createAsyncThunk(
  'prospect/fetchProspectStatus',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getProspectStatus,
      data,
      action: 'Crm_SliceAction_FetchProspectStatus',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchProspectById = createAsyncThunk(
  'prospect/fetchProspectById',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getProspect,
      data,
      action: 'Crm_SliceAction_FetchProspectById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateProspectScore = createAsyncThunk(
  'lead/updateProspectScore',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: updateProspectScoring,
      data,
      action: 'Crm_SliceAction_UpdateProspectScore',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: getProspect,
        data: {partnerId: res?.id},
        action: 'Crm_SliceAction_FetchProspectById',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const updateProspect = createAsyncThunk(
  'prospect/updateProspect',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateProspect,
      data,
      action: 'Crm_SliceAction_UpdateProspect',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: getProspect,
        data: {partnerId: res?.id},
        action: 'Crm_SliceAction_FetchProspectById',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

const initialState = {
  loading: false,
  loadingProspectStatus: true,
  moreLoading: false,
  isListEnd: false,
  prospectList: [],
  prospect: {},
  prospectStatusList: [],
};

const prospectSlice = createSlice({
  name: 'prospect',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchProspects, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'prospectList',
    });
    builder.addCase(fetchProspectById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProspectById.fulfilled, (state, action) => {
      state.loading = false;
      state.prospect = action.payload;
    });
    builder.addCase(fetchProspectStatus.pending, state => {
      state.loadingProspectStatus = true;
    });
    builder.addCase(fetchProspectStatus.fulfilled, (state, action) => {
      state.loadingProspectStatus = false;
      state.prospectStatusList = action.payload;
    });
    builder.addCase(updateProspectScore.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProspectScore.fulfilled, (state, action) => {
      state.loading = false;
      state.prospect = action.payload;
      state.prospectList = updateAgendaItems(state.prospectList, [
        action.payload,
      ]);
    });
    builder.addCase(updateProspect.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProspect.fulfilled, (state, action) => {
      state.loading = false;
      state.prospect = action.payload;
      state.prospectList = updateAgendaItems(state.prospectList, [
        action.payload,
      ]);
    });
  },
});

export const prospectReducer = prospectSlice.reducer;
