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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {fetchExpenseConfig as _fetchExpenseConfig} from '../api/expense-config-api';

export const fetchExpenseConfig = createAsyncThunk(
  'expenseConfig/fetchExpenseConfig',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchExpenseConfig,
      data,
      action: 'Hr_SliceAction_FetchExpenseConfig',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingConfig: false,
  expenseConfig: {},
};

const expenseConfigSlice = createSlice({
  name: 'expenseConfig',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchExpenseConfig.pending, state => {
      state.loadingConfig = true;
    });
    builder.addCase(fetchExpenseConfig.fulfilled, (state, action) => {
      state.loadingConfig = false;
      state.expenseConfig = action.payload;
    });
  },
});

export const expenseConfigReducer = expenseConfigSlice.reducer;
