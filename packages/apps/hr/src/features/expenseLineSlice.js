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
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {
  searchExpenseLines as _searchExpenseLines,
  searchGeneralByIds as _searchGeneralByIds,
} from '../api/expense-line-api';

export const fetchExpenseLine = createAsyncThunk(
  'expenseLine/fetchExpenseLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchExpenseLines,
      data,
      action: 'Hr_SliceAction_FetchExpenseLines',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchGeneralByIds = createAsyncThunk(
  'expenseLine/searchGeneralByIds',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchGeneralByIds,
      data,
      action: 'Hr_SliceAction_FetchExpenseLinesGeneralByIds',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

const initialState = {
  loadingExpenseLine: true,
  moreLoading: false,
  isListEnd: false,
  expenseLineList: [],

  loadingExpenseGeneralLine: true,
  moreLoadingExpenseGeneralLine: false,
  isListEndExpenseGeneralLine: false,
  expenseGeneralLineList: [],
  totalNumberExpenseGeneral: 0,
};

const expenseLineSlice = createSlice({
  name: 'expenseLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchExpenseLine, {
      loading: 'loadingExpenseLine',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'expenseLineList',
    });
    generateInifiniteScrollCases(
      builder,
      searchGeneralByIds,
      {
        loading: 'loadingExpenseGeneralLine',
        moreLoading: 'moreLoadingExpenseGeneralLine',
        isListEnd: 'isListEndExpenseGeneralLine',
        list: 'expenseGeneralLineList',
        total: 'totalNumberExpenseGeneral',
      },
      {
        manageTotal: true,
      },
    );
  },
});

export const expenseLineReducer = expenseLineSlice.reducer;
