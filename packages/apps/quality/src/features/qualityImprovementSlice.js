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
  createQualityImprovement as _createQualityImprovement,
  fetchQiResolution as _fetchQiResolution,
  fetchQualityImprovement as _fetchQualityImprovement,
  fetchQualityImprovementStatus as _fetchQualityImprovementStatus,
  searchQualityImprovement as _searchQualityImprovement,
  updateQualityImprovement as _updateQualityImprovement,
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

export const fetchQualityImprovement = createAsyncThunk(
  'quality_qualityImprovement/fetchQualityImprovement',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchQualityImprovement,
      data,
      action: 'Quality_SliceAction_FetchQualityImprovement',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(async res => {
      if (!res?.id) {
        return undefined;
      }

      const qiResolution = await handlerApiCall({
        fetchFunction: _fetchQiResolution,
        data: {id: res.qiResolution?.id},
        action: 'Quality_SliceAction_FetchQiResolution',
        getState,
        responseOptions: {isArrayResponse: false},
      });

      return {...res, qiResolution};
    });
  },
);

export const createQualityImprovement = createAsyncThunk(
  'quality_qualityImprovement/createQualityImprovement',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _createQualityImprovement,
      data,
      action: 'Quality_SliceAction_CreateQualityImprovement',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const updateQualityImprovement = createAsyncThunk(
  'quality_qualityImprovement/updateQualityImprovement',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateQualityImprovement,
      data,
      action: 'Quality_SliceAction_UpdateQualityImprovement',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

const initialState = {
  loadingQualityImprovements: false,
  moreLoadingQualityImprovement: false,
  isListEndQualityImprovement: false,
  qualityImprovementList: [],

  qiStatusList: [],

  qualityImprovement: {},
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
        state.qiStatusList = action.payload;
      },
    );
    builder.addCase(fetchQualityImprovement.fulfilled, (state, action) => {
      state.qualityImprovement = action.payload;
    });
  },
});

export const qualityImprovementReducer = qualityImprovementSlice.reducer;
