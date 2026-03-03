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
} from '../apiProviders/utils';
import {searchPrintingTemplate as _searchPrintingTemplate} from '../api/print-template-api';

export const searchPrintingTemplate = createAsyncThunk(
  'printingTemplate/searchPrintingTemplate',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchPrintingTemplate,
      data: data,
      action: 'Base_SliceAction_SearchPrintingTemplate',
      getState: getState,
      responseOptions: {isArrayResponse: true, showToast: false},
      errorOptions: {showErrorToast: false},
    });
  },
);

const initialState = {
  printTemplateList: [],
  moreLoading: false,
  isListEnd: false,
  loadingList: true,
};

const printTemplateSlice = createSlice({
  name: 'printTemplate',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchPrintingTemplate, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'printTemplateList',
    });
  },
});

export const printTemplateReducer = printTemplateSlice.reducer;
