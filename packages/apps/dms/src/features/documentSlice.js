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
  searchDirectory as _searchDirectory,
  searchDocument as _searchDocument,
} from '../api/document-api';

export const searchDocument = createAsyncThunk(
  'dms_document/searchDocument',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchDocument,
      data,
      action: 'Dms_SliceAction_SearchDocument',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchDirectory = createAsyncThunk(
  'dms_document/searchDirectory',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchDirectory,
      data,
      action: 'Dms_SliceAction_SearchDirectory',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingDocuments: false,
  moreLoadingDocument: false,
  isListEndDocument: false,
  documentList: [],

  loadingDirectory: false,
  moreLoadingDirectory: false,
  isListEndDirectory: false,
  directoryList: [],
};

const documentSlice = createSlice({
  name: 'dms_document',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchDocument, {
      loading: 'loadingDocument',
      moreLoading: 'moreLoadingDocument',
      isListEnd: 'isListEndDocument',
      list: 'documentList',
    });
    generateInifiniteScrollCases(builder, searchDirectory, {
      loading: 'loadingDirectory',
      moreLoading: 'moreLoadingDirectory',
      isListEnd: 'isListEndDirectory',
      list: 'directoryList',
    });
  },
});

export const documentReducer = documentSlice.reducer;
