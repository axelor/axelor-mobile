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
import {searchControlEntry as _searchControlEntry} from '../api/controlEntry-api';

export const searchControlEntry = createAsyncThunk(
  'controlEntry/searchControlEntry',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchControlEntry,
      data,
      action: 'Quality_SliceAction_SearchControlEntry',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingControlEntryList: true,
  moreLoading: false,
  isListEnd: false,
  controlEntryList: [],
};

const controlEntrySlice = createSlice({
  name: 'controlEntry',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchControlEntry, {
      loading: 'loadingControlEntryList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'controlEntryList',
    });
  },
});

export const controlEntryReducer = controlEntrySlice.reducer;
