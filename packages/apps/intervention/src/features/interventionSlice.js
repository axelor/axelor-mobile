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
  fetchActiveIntervention as _fetchActiveIntervention,
  fetchIntervention as _fetchIntervention,
  fetchInterventionById as _fetchInterventionById,
  linkEquipment as _linkEquipment,
  searchHistoryInterventionByEquipment as _searchHistoryInterventionByEquipment,
  unlinkEquipment as _unlinkEquipment,
  updateInterventionStatus as _updateInterventionStatus,
} from '../api/intervention-api';

export const fetchIntervention = createAsyncThunk(
  'intervention_intervention/fetchIntervention',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchIntervention,
      data,
      action: 'Intervention_SliceAction_FetchIntervention',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchInterventionById = createAsyncThunk(
  'intervention_intervention/fetchInterventionById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchInterventionById,
      data,
      action: 'Intervention_SliceAction_FetchInterventionById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const searchHistoryInterventionByEquipment = createAsyncThunk(
  'intervention_intervention/searchHistoryInterventionByEquipment',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchHistoryInterventionByEquipment,
      data,
      action: 'Intervention_SliceAction_SearchHistoryInterventionByEquipment',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchActiveIntervention = createAsyncThunk(
  'intervention_intervention/fetchActiveIntervention',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchActiveIntervention,
      data,
      action: 'Intervention_SliceAction_FetchActiveIntervention',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateInterventionStatus = createAsyncThunk(
  'intervention_intervention/updateInterventionStatus',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateInterventionStatus,
      data,
      action: 'Intervention_SliceAction_UpdateInterventionStatus',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      dispatch(fetchInterventionById({interventionId: data.interventionId}));
    });
  },
);

export const unlinkEquipment = createAsyncThunk(
  'intervention_intervention/unlinkEquipment',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _unlinkEquipment,
      data,
      action: 'Intervention_SliceAction_UnlinkEquipment',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      dispatch(fetchInterventionById(data));
    });
  },
);

export const linkEquipment = createAsyncThunk(
  'intervention_intervention/linkEquipment',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _linkEquipment,
      data,
      action: 'Intervention_SliceAction_LinkEquipment',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      dispatch(fetchInterventionById(data));
    });
  },
);

const initialState = {
  loading: true,
  moreLoading: false,
  isListEnd: false,
  interventionList: [],

  loadingHistoryList: true,
  moreLoadingHistory: false,
  isListEndHistory: false,
  interventionHistoryList: [],

  loadingIntervention: true,
  intervention: {},

  loadingActiveIntervention: false,
  activeIntervention: {},
};

const interventionSlice = createSlice({
  name: 'intervention_intervention',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchIntervention, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'interventionList',
    });
    generateInifiniteScrollCases(
      builder,
      searchHistoryInterventionByEquipment,
      {
        loading: 'loadingHistoryList',
        moreLoading: 'moreLoadingHistory',
        isListEnd: 'isListEndHistory',
        list: 'interventionHistoryList',
      },
    );
    builder.addCase(fetchInterventionById.pending, state => {
      state.loadingIntervention = true;
    });
    builder.addCase(fetchInterventionById.fulfilled, (state, action) => {
      state.loadingIntervention = false;
      state.intervention = action.payload;
    });
    builder.addCase(fetchActiveIntervention.pending, state => {
      state.loadingActiveIntervention = true;
    });
    builder.addCase(fetchActiveIntervention.fulfilled, (state, action) => {
      state.loadingActiveIntervention = false;
      state.activeIntervention = action.payload;
    });
    builder.addCase(fetchActiveIntervention.rejected, state => {
      state.loadingActiveIntervention = false;
    });
  },
});

export const interventionReducer = interventionSlice.reducer;
