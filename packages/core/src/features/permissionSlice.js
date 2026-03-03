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
import {handlerApiCall} from '../apiProviders/utils';
import {
  getAllPerms as _getAllPerms,
  getAllFieldsPerms as _getAllFieldsPerms,
} from '../permissions/api.helpers';
import {
  formatMetaPermissions,
  formatPermissions,
} from '../permissions/format.helpers';

export const fetchAllPermissions = createAsyncThunk(
  'permission/fetchAllPermissions',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _getAllPerms,
      data: data,
      action: 'Base_SliceAction_FetchAllPermissions',
      getState: getState,
      responseOptions: {isArrayResponse: true, showToast: false},
      errorOptions: {showErrorToast: false},
    });
  },
);

export const fetchAllMetaPermissionRules = createAsyncThunk(
  'permission/fetchAllMetaPermissionRules',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _getAllFieldsPerms,
      data: data,
      action: 'Base_SliceAction_FetchAllMetaPermissionRules',
      getState: getState,
      responseOptions: {isArrayResponse: true, showToast: false},
      errorOptions: {showErrorToast: false},
    });
  },
);

const initialState = {
  modelsPermissions: {},
  fieldsPermissions: {},
};

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchAllPermissions.fulfilled, (state, action) => {
      state.modelsPermissions = formatPermissions(action.payload);
    });
    builder.addCase(fetchAllMetaPermissionRules.fulfilled, (state, action) => {
      state.fieldsPermissions = formatMetaPermissions(action.payload);
    });
  },
});

export const permissionReducer = permissionSlice.reducer;
