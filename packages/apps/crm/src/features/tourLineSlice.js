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
  searchTourLine as _searchTourLine,
  validateTourLine as _validateTourLine,
} from '../api/tour-line-api';

export const searchTourLine = createAsyncThunk(
  'tourLine/searchTourLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchTourLine,
      data,
      action: 'Crm_SliceAction_FetchTourLine',
      getState,
      responseOptions: {isArrayResponse: true},
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
    });
  },
);

const initialState = {
  loadingTourLineList: true,
  moreLoading: false,
  isListEnd: false,
  tourLineList: [],
};

const tourLineSlice = createSlice({
  name: 'tourLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchTourLine, {
      loading: 'loadingTourLineList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'tourLineList',
    });
  },
});

export const tourLineReducer = tourLineSlice.reducer;
