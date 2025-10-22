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
  searchLogisticalForms as _searchLogisticalForms,
  fetchLogisticalForm as _fetchLogisticalForm,
  createLogisticalForm as _createLogisticalForm,
  updateLogisticalForm as _updateLogisticalForm,
  addStockMoveToLogisticalForm as _addStockMoveToLogisticalForm,
  removeStockMoveFromLogisticalForm as _removeStockMoveFromLogisticalForm,
} from '../api/logistical-form-api';

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

export const fetchLogisticalForm = createAsyncThunk(
  'logisticalForm/fetchLogisticalForm',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchLogisticalForm,
      data,
      action: 'Stock_SliceAction_FetchLogisticalForm',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const createLogisticalForm = createAsyncThunk(
  'logisticalForm/createLogisticalForm',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _createLogisticalForm,
      data,
      action: 'Stock_SliceAction_CreateLogisticalForm',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const updateLogisticalForm = createAsyncThunk(
  'logisticalForm/updateLogisticalForm',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateLogisticalForm,
      data,
      action: 'Stock_SliceAction_UpdateLogisticalForm',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(response => {
      dispatch(fetchLogisticalForm({logisticalFormId: data.id}));
      return response;
    });
  },
);

export const addStockMoveToLogisticalForm = createAsyncThunk(
  'logisticalForm/addStockMoveToLogisticalForm',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _addStockMoveToLogisticalForm,
      data,
      action: 'Stock_SliceAction_AddStockMoveToLogisticalForm',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(response => {
      if (data?.logisticalFormId != null) {
        dispatch(
          fetchLogisticalForm({logisticalFormId: data.logisticalFormId}),
        );
      }
      return response;
    });
  },
);

export const removeStockMoveFromLogisticalForm = createAsyncThunk(
  'logisticalForm/removeStockMoveFromLogisticalForm',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _removeStockMoveFromLogisticalForm,
      data,
      action: 'Stock_SliceAction_RemoveStockMoveFromLogisticalForm',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(response => {
      if (data?.logisticalFormId != null) {
        dispatch(
          fetchLogisticalForm({logisticalFormId: data.logisticalFormId}),
        );
      }
      return response;
    });
  },
);

const initialState = {
  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  logisticalFormList: [],

  loading: false,
  logisticalForm: null,
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
    builder.addCase(fetchLogisticalForm.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchLogisticalForm.fulfilled, (state, action) => {
      state.loading = false;
      state.logisticalForm = action.payload;
    });
    builder.addCase(fetchLogisticalForm.rejected, state => {
      state.loading = false;
    });
    builder.addCase(createLogisticalForm.pending, state => {
      state.loading = true;
    });
    builder.addCase(createLogisticalForm.fulfilled, (state, action) => {
      state.loading = false;
      state.logisticalForm = action.payload;
    });
    builder.addCase(createLogisticalForm.rejected, state => {
      state.loading = false;
    });
    builder.addCase(updateLogisticalForm.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateLogisticalForm.fulfilled, (state, action) => {
      state.loading = false;
      state.logisticalForm = action.payload;
    });
    builder.addCase(updateLogisticalForm.rejected, state => {
      state.loading = false;
    });
    builder.addCase(addStockMoveToLogisticalForm.pending, state => {
      state.loading = true;
    });
    builder.addCase(addStockMoveToLogisticalForm.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(addStockMoveToLogisticalForm.rejected, state => {
      state.loading = false;
    });
    builder.addCase(removeStockMoveFromLogisticalForm.pending, state => {
      state.loading = true;
    });
    builder.addCase(removeStockMoveFromLogisticalForm.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(removeStockMoveFromLogisticalForm.rejected, state => {
      state.loading = false;
    });
  },
});

export const logisticalFormReducer = logisticalFormSlice.reducer;
