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
import {searchDefect as _searchDefect} from '../api/qi-default-api';

export const searchDefect = createAsyncThunk(
  'quality_qiDefault/searchDefect',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchDefect,
      data,
      action: 'Quality_SliceAction_SearchDefect',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingQiDefaults: false,
  moreLoadingQiDefault: false,
  isListEndQiDefault: false,
  qiDefaultList: [],
};

const qiDefaultSlice = createSlice({
  name: 'quality_qiDefault',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchDefect, {
      loading: 'loadingQiDefaults',
      moreLoading: 'moreLoadingQiDefault',
      isListEnd: 'isListEndQiDefault',
      list: 'qiDefaultList',
    });
  },
});

export const qiDefaultReducer = qiDefaultSlice.reducer;
