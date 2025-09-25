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
import {searchLogisticalForms as _searchLogisticalForms} from '../api/logistical-form-api';

export const searchLogisticalForms = createAsyncThunk(
  'logisticalForm/searchLogisticalForms',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchLogisticalForms,
      data,
      action: 'Stock_SliceAction_SearchLogisticalForms',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  logisticalFormList: [],
};

const logisticalFormSlice = createSlice({
  name: 'logisticalForm',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchLogisticalForms, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'logisticalFormList',
    });
  },
});

export const logisticalFormReducer = logisticalFormSlice.reducer;
