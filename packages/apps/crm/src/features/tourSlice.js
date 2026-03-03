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
  updateAgendaItems,
} from '@axelor/aos-mobile-core';
import {
  searchTour as _searchTour,
  fetchTourById as _fetchTourById,
  validateTour as _validateTour,
} from '../api/tour-api';

export const searchTour = createAsyncThunk(
  'tour/searchTour',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchTour,
      data,
      action: 'Crm_SliceAction_FetchTour',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchTourById = createAsyncThunk(
  'tour/fetchTourById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchTourById,
      data,
      action: 'Crm_SliceAction_FetchTourById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const validateTour = createAsyncThunk(
  'tour/validateTour',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _validateTour,
      data,
      action: 'Crm_SliceAction_ValidateTour',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(fetchTourById({tourId: data?.tourId}));
    });
  },
);

const initialState = {
  loadingTourList: true,
  moreLoading: false,
  isListEnd: false,
  tourList: [],

  loadingTour: true,
  tour: {},
};

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchTour, {
      loading: 'loadingTourList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'tourList',
    });
    builder.addCase(fetchTourById.pending, (state, action) => {
      state.loadingTour = true;
    });
    builder.addCase(fetchTourById.fulfilled, (state, action) => {
      state.loadingTour = false;
      state.tour = action.payload;
      state.tourList = updateAgendaItems(state.tourList, [action.payload]);
    });
  },
});

export const tourReducer = tourSlice.reducer;
