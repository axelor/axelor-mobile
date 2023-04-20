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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {getFunction} from '../api/function-api';

export const fetchFunction = createAsyncThunk(
  'Function/fetchFunction',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: getFunction,
      data,
      action: 'Crm_SliceAction_FetchFunction',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);
const initialState = {
  loadingFunction: true,
  functionList: [],
};

const functionSlice = createSlice({
  name: 'function',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchFunction.pending, state => {
      state.loadingFunction = true;
    });
    builder.addCase(fetchFunction.fulfilled, (state, action) => {
      state.loadingFunction = false;
      state.functionList = action.payload;
    });
  },
});

export const functionReducer = functionSlice.reducer;
