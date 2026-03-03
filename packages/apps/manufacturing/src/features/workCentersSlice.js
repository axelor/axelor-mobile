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
import {searchWorkCenterFilter} from '../api/work-center-api';

export const searchWorkCenters = createAsyncThunk(
  'workCenter/searchWorkCenter',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchWorkCenterFilter,
      data,
      action: 'Manufacturing_SliceAction_FilterWorkCenter',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  workCenterList: [],
  moreLoading: false,
  isListEnd: false,
};

const workCentersSlice = createSlice({
  name: 'workCenters',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchWorkCenters, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'workCenterList',
    });
  },
});

export const workCentersReducer = workCentersSlice.reducer;
