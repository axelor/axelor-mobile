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
} from '@axelor/aos-mobile-core';
import {
  fetchQualityImprovementStatus as _fetchQualityImprovementStatus,
  searchQualityImprovement as _searchQualityImprovement,
} from '../api/quality-improvement-api';

export const searchQualityImprovement = createAsyncThunk(
  'quality_qualityImprovement/searchQualityImprovement',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchQualityImprovement,
      data,
      action: 'Quality_SliceAction_SearchQualityImprovement',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchQualityImprovementStatus = createAsyncThunk(
  'quality_qualityImprovement/fetchQualityImprovementStatus',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchQualityImprovementStatus,
      data,
      action: 'Quality_SliceAction_FetchQualityImprovementStatus',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingQualityImprovement: false,
  qualityImprovement: {},
  loadingQualityImprovements: false,
  moreLoadingQualityImprovement: false,
  isListEndQualityImprovement: false,
  qualityImprovementList: [],

  QIStatusList: [],
};

const qualityImprovementSlice = createSlice({
  name: 'quality_qualityImprovement',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchQualityImprovement, {
      loading: 'loadingQualityImprovements',
      moreLoading: 'moreLoadingQualityImprovement',
      isListEnd: 'isListEndQualityImprovement',
      list: 'qualityImprovementList',
    });
    builder.addCase(
      fetchQualityImprovementStatus.fulfilled,
      (state, action) => {
        state.QIStatusList = action.payload;
      },
    );
  },
});

export const qualityImprovementReducer = qualityImprovementSlice.reducer;
