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
import {getAllCurrencies} from '../api/currency-api';

export const fetchAllCurrencies = createAsyncThunk(
  'core_currency/fetchAllCurrencies',
  async function (data: any = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getAllCurrencies,
      data,
      action: 'Base_SliceAction_FetchAllCurrencies',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  currencyList: [],
};

const currencySlice = createSlice({
  name: 'core_currency',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllCurrencies.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.currencyList = action.payload;
      })
      .addCase(fetchAllCurrencies.rejected, state => {
        state.loading = false;
      });
  },
});

export const currencyReducer = currencySlice.reducer;
