/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
import {handlerApiCall} from '../apiProviders/utils';
import {
  createRecord as _createRecord,
  updateRecord as _updateRecord,
  refreshRecord as _refreshRecord,
} from '../forms/api.helpers';

export const createRecord = createAsyncThunk(
  'form/create',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _createRecord,
      data: data,
      action: 'Base_SliceAction_FetchAttachedFiles',
      getState: getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const updateRecord = createAsyncThunk(
  'form/update',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateRecord,
      data: data,
      action: 'Base_SliceAction_FetchAttachedFiles',
      getState: getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const refreshRecord = createAsyncThunk(
  'form/refresh',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _refreshRecord,
      data: data,
      action: 'Base_SliceAction_FetchAttachedFiles',
      getState: getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  record: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    clearRecord: state => {
      state.record = {};
    },
  },
  extraReducers: builder => {
    builder.addCase(updateRecord.fulfilled, (state, action) => {
      state.record = action.payload;
    });
    builder.addCase(refreshRecord.fulfilled, (state, action) => {
      state.record = action.payload;
    });
  },
});

export const {clearRecord} = formSlice.actions;

export const fromReducer = formSlice.reducer;
