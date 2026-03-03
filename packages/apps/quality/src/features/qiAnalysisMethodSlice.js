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
import {searchQIAnalysisMethod as _searchQIAnalysisMethod} from '../api/qi-analysis-method-api';

export const searchQIAnalysisMethod = createAsyncThunk(
  'quality_qiAnalysisMethod/searchQIAnalysisMethod',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchQIAnalysisMethod,
      data,
      action: 'Quality_SliceAction_SearchQIAnalysisMethod',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingQiAnalysisMethods: false,
  moreLoadingQiAnalysisMethod: false,
  isListEndQiAnalysisMethod: false,
  qiAnalysisMethodList: [],
};

const qiAnalysisMethodSlice = createSlice({
  name: 'quality_qiAnalysisMethod',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchQIAnalysisMethod, {
      loading: 'loadingQiAnalysisMethods',
      moreLoading: 'moreLoadingQiAnalysisMethod',
      isListEnd: 'isListEndQiAnalysisMethod',
      list: 'qiAnalysisMethodList',
    });
  },
});

export const qiAnalysisMethodReducer = qiAnalysisMethodSlice.reducer;
