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
  searchTourLine as _searchTourLine,
  validateTourLine as _validateTourLine,
  updateTourLine as _updateTourLine,
} from '../api/tour-line-api';
import {fetchTourById} from './tourSlice';

export const searchTourLine = createAsyncThunk(
  'tourLine/searchTourLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchTourLine,
      data,
      action: 'Crm_SliceAction_FetchTourLine',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

export const validateTourLine = createAsyncThunk(
  'tourLine/validateTourLine',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _validateTourLine,
      data,
      action: 'Crm_SliceAction_ValidateTourLine',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(fetchTourById({tourId: data?.tourId}));
    });
  },
);

export const updateTourLine = createAsyncThunk(
  'tourLine/updateTourLine',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateTourLine,
      data,
      action: 'Crm_SliceAction_UpdateTourLine',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(
        searchTourLine({
          tourId: data?.tourId,
          isValidated: data?.isValidated,
        }),
      );
    });
  },
);
const initialState = {
  loadingTourLineList: true,
  moreLoading: false,
  isListEnd: false,
  tourLineList: [],
  totalTourLine: 0,
};

const tourLineSlice = createSlice({
  name: 'tourLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(
      builder,
      searchTourLine,
      {
        loading: 'loadingTourLineList',
        moreLoading: 'moreLoading',
        isListEnd: 'isListEnd',
        list: 'tourLineList',
        total: 'totalTourLine',
      },
      {
        manageTotal: true,
      },
    );
  },
});

export const tourLineReducer = tourLineSlice.reducer;
