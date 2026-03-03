/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
  searchProspect,
  getProspect,
  getProspectStatus,
  updateProspectScoring,
  updateProspect as _updateProspect,
} from '../api/prospect-api';
import {createPartner} from '../api/partner-api';

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
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: updateProspectScoring,
      data,
      action: 'Crm_SliceAction_UpdateProspectScore',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => dispatch(fetchProspectById({partnerId: data.partnerId})));
  },
);

export const updateProspect = createAsyncThunk(
  'prospect/updateProspect',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateProspect,
      data,
      action: 'Crm_SliceAction_UpdateProspect',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => dispatch(fetchProspectById({partnerId: data.id})));
  },
);

export const createProspect = createAsyncThunk(
  'prospect/createProspect',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: createPartner,
      data,
      action: 'Crm_SliceAction_CreateProspect',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(res => {
      dispatch(
        fetchProspects({companyId: getState()?.user?.user?.activeCompany?.id}),
      );

      return res;
    });
  },
);

const initialState = {
  loading: false,
  prospect: {},

  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  prospectList: [],

  loadingProspectStatus: true,
  prospectStatusList: [],
};

const prospectSlice = createSlice({
  name: 'prospect',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchProspects, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'prospectList',
    });
    builder.addCase(fetchProspectById.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProspectById.rejected, state => {
      state.loading = false;
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
  },
});

export const prospectReducer = prospectSlice.reducer;
