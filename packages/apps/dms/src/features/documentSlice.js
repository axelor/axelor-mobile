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
  fetchActiveUser,
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {
  addToFavorites as _addToFavorites,
  createDocument as _createDocument,
  deleteDocument as _deleteDocument,
  removeFromFavorites as _removeFromFavorites,
  searchDirectory as _searchDirectory,
  searchDocument as _searchDocument,
  updateDocument as _updateDocument,
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

export const searchFavoriteDocument = createAsyncThunk(
  'dms_document/searchFavoriteDocument',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchDocument,
      data,
      action: 'Dms_SliceAction_SearchFavoriteDocument',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const createDocument = createAsyncThunk(
  'dms_document/createDocument',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _createDocument,
      data,
      action: 'Dms_SliceAction_CreateDocument',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateDocument = createAsyncThunk(
  'dms_document/updateDocument',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateDocument,
      data,
      action: 'Dms_SliceAction_UpdateDocument',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const addToFavorites = createAsyncThunk(
  'dms_document/addToFavorites',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _addToFavorites,
      data,
      action: 'Dms_SliceAction_AddToFavorites',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => dispatch(fetchActiveUser(data.userId)));
  },
);

export const removeFromFavorites = createAsyncThunk(
  'dms_document/removeFromFavorites',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _removeFromFavorites,
      data,
      action: 'Dms_SliceAction_RemoveFromFavorites',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => dispatch(fetchActiveUser(data.userId)));
  },
);

export const deleteDocument = createAsyncThunk(
  'dms_document/deleteDocument',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _deleteDocument,
      data,
      action: 'Dms_SliceAction_DeleteDocument',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const deleteFavoriteDocument = createAsyncThunk(
  'dms_document/deleteFavoriteDocument',
  async function (data, {dispatch}) {
    dispatch(removeFromFavorites(data)).then(() =>
      dispatch(deleteDocument(data)),
    );
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

  loadingFavoriteDocument: false,
  moreLoadingFavoriteDocument: false,
  isListEndFavoriteDocument: false,
  favoriteDocumentList: [],
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
    generateInifiniteScrollCases(builder, searchFavoriteDocument, {
      loading: 'loadingFavoriteDocument',
      moreLoading: 'moreLoadingFavoriteDocument',
      isListEnd: 'isListEndFavoriteDocument',
      list: 'favoriteDocumentList',
    });
  },
});

export const documentReducer = documentSlice.reducer;
