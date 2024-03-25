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
} from '@axelor/aos-mobile-core';
import {
  fetchIntervention as _fetchIntervention,
  fetchInterventionById as _fetchInterventionById,
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

const initialState = {
  loading: true,
  moreLoading: false,
  isListEnd: false,
  interventionList: [],

  loadingIntervention: true,
  intervention: {},
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
    builder.addCase(fetchInterventionById.pending, state => {
      state.loadingIntervention = true;
    });
    builder.addCase(fetchInterventionById.fulfilled, (state, action) => {
      state.loadingIntervention = false;
      state.intervention = action.payload;
    });
  },
});

export const interventionReducer = interventionSlice.reducer;
