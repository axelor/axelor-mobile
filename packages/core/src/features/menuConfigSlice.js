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
import {getModulesConfig} from '../api/menu-config-api';
import {handlerApiCall} from '../apiProviders/utils';

export const fetchMenuConfig = createAsyncThunk(
  'menuConfig/fetchMenuConfig',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getModulesConfig,
      data,
      action: 'Base_SliceAction_FetchMenuConfig',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingConfig: false,
  restrictedMenus: [],
};

const menuConfigSlice = createSlice({
  name: 'menuConfig',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchMenuConfig.pending, state => {
      state.loadingConfig = true;
    });
    builder.addCase(fetchMenuConfig.fulfilled, (state, action) => {
      state.loadingConfig = false;
      state.restrictedMenus = [...action.payload];
    });
  },
});

export const menuConfigReducer = menuConfigSlice.reducer;
