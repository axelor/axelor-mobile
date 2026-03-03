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
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {searchCurrencies as _searchCurrencies} from '../api/currency-api';

export const searchCurrencies = createAsyncThunk(
  'currency/searchCurrencies',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchCurrencies,
      data,
      action: 'Hr_SliceAction_FetchCurrencies',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingCurrencies: true,
  moreLoadingCurrencies: false,
  isListEndCurrencies: false,
  currencyList: [],
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchCurrencies, {
      loading: 'loadingCurrencies',
      moreLoading: 'moreLoadingCurrencies',
      isListEnd: 'isListEndCurrencies',
      list: 'currencyList',
    });
  },
});

export const currencyReducer = currencySlice.reducer;
