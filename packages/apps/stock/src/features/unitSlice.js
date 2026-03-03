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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {searchUnit} from '../api/unit-api';

export const fetchUnit = createAsyncThunk(
  'unit/fetchUnit',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchUnit,
      data,
      action: 'Stock_SliceAction_FetchUnits',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingUnit: false,
  unitList: [],
};

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUnit.pending, state => {
      state.loadingUnit = true;
    });
    builder.addCase(fetchUnit.fulfilled, (state, action) => {
      state.loadingUnit = false;
      state.unitList = action.payload;
    });
  },
});

export const unitReducer = unitSlice.reducer;
