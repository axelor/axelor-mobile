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
  createInterventionNote as _createInterventionNote,
  deleteInterventionNote as _deleteInterventionNote,
  fetchInterventionNote as _fetchInterventionNote,
  fetchInterventionNoteById as _fetchInterventionNoteById,
  fetchInterventionNoteType as _fetchInterventionNoteType,
  updateInterventionNote as _updateInterventionNote,
} from '../api/intervention-note-api';

export const fetchInterventionNote = createAsyncThunk(
  'intervention_interventionNote/fetchInterventionNote',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchInterventionNote,
      data,
      action: 'Intervention_SliceAction_FetchInterventionNote',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchInterventionNoteById = createAsyncThunk(
  'intervention_interventionNote/fetchInterventionNoteById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchInterventionNoteById,
      data,
      action: 'Intervention_SliceAction_FetchInterventionNoteById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const fetchInterventionNoteType = createAsyncThunk(
  'intervention_interventionNote/fetchInterventionNoteType',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchInterventionNoteType,
      data,
      action: 'Intervention_SliceAction_FetchInterventionNoteType',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const createInterventionNote = createAsyncThunk(
  'intervention_interventionNote/createInterventionNote',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _createInterventionNote,
      data,
      action: 'Intervention_SliceAction_CreateInterventionNote',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const updateInterventionNote = createAsyncThunk(
  'intervention_interventionNote/updateInterventionNote',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateInterventionNote,
      data,
      action: 'Intervention_SliceAction_UpdateInterventionNote',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const deleteInterventionNote = createAsyncThunk(
  'intervention_interventionNote/deleteInterventionNote',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _deleteInterventionNote,
      data,
      action: 'Intervention_SliceAction_DeleteInterventionNote',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      dispatch(
        fetchInterventionNote({deliveredPartnerId: data.deliveredPartnerId}),
      );
    });
  },
);

const initialState = {
  loading: true,
  moreLoading: false,
  isListEnd: false,
  interventionNoteList: [],

  loadingInterventionNote: true,
  interventionNote: {},

  loadingInterventionNoteTypeList: true,
  interventionNoteTypeList: [],
};

const interventionNoteSlice = createSlice({
  name: 'intervention_interventionNote',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchInterventionNote, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'interventionNoteList',
    });
    builder.addCase(fetchInterventionNoteById.pending, state => {
      state.loadingInterventionNote = true;
    });
    builder.addCase(fetchInterventionNoteById.fulfilled, (state, action) => {
      state.loadingInterventionNote = false;
      state.interventionNote = action.payload;
    });
    builder.addCase(fetchInterventionNoteType.pending, state => {
      state.loadingInterventionNoteTypeList = true;
    });
    builder.addCase(fetchInterventionNoteType.fulfilled, (state, action) => {
      state.loadingInterventionNoteTypeList = false;
      state.interventionNoteTypeList = action.payload;
    });
  },
});

export const interventionNoteReducer = interventionNoteSlice.reducer;
