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
  searchExpenseDraft as _searchExpenseDraft,
  searchMyExpense as _searchMyExpense,
  searchExpenseToValidate as _searchExpenseToValidate,
} from '../api/expense-api';

export const searchExpenseDraft = createAsyncThunk(
  'expense/searchExpenseDraft',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchExpenseDraft,
      data,
      action: 'Hr_SliceAction_SearchDraftExpense',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchMyExpense = createAsyncThunk(
  'expense/searchMyExpense',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchMyExpense,
      data,
      action: 'Hr_SliceAction_FetchMyExpense',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchExpenseToValidate = createAsyncThunk(
  'expense/searchExpenseToValidate',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchExpenseToValidate,
      data,
      action: 'Hr_SliceAction_FetchExpenseToValidate',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

const initialState = {
  loading: true,
  expenseDraftList: [],

  loadingMyExpense: true,
  moreLoadingMyExpense: false,
  isListEndMyExpense: false,
  myExpenseList: [],

  loadingExpenseToValidate: true,
  moreLoadingExpenseToValidate: false,
  isListEndExpenseToValidate: false,
  expenseToValidateList: [],
  totalNumberExpenseToValidate: 0,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchMyExpense, {
      loading: 'loadingMyExpense',
      moreLoading: 'moreLoadingMyExpense',
      isListEnd: 'isListEndMyExpense',
      list: 'myExpenseList',
    });
    generateInifiniteScrollCases(
      builder,
      searchExpenseToValidate,
      {
        loading: 'loadingExpenseToValidate',
        moreLoading: 'moreLoadingExpenseToValidate',
        isListEnd: 'isListEndExpenseToValidate',
        list: 'expenseToValidateList',
        total: 'totalNumberExpenseToValidate',
      },
      {
        manageTotal: true,
      },
    );
    builder.addCase(searchExpenseDraft.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchExpenseDraft.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseDraftList = action.payload;
    });
  },
});

export const expenseReducer = expenseSlice.reducer;
