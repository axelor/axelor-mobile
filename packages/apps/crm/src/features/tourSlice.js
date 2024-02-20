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
import {searchTour as _searchTour} from '../api/tour-api';

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

const initialState = {
  loadingTourList: true,
  moreLoading: false,
  isListEnd: false,
  tourList: [],
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
  },
});

export const tourReducer = tourSlice.reducer;
