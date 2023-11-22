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
  searchGeneralExpenseLines as _searchGeneralExpenseLines,
  searchKilometricExpenseLines as _searchKilometricExpenseLines,
  createExpenseLine as _createExpenseLine,
  updateExpenseLine as _updateExpenseLine,
  deleteExpenseLine as _deleteExpenseLine,
} from '../api/expense-line-api';
import {ExpenseLine} from '../types';

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

export const searchKilometricExpenseLines = createAsyncThunk(
  'expenseLine/searchKilometricExpenseLines',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchKilometricExpenseLines,
      data,
      action: 'Hr_SliceAction_SearchKilometricExpenseLines',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

export const searchGeneralExpenseLines = createAsyncThunk(
  'expenseLine/searchGeneralExpenseLines',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchGeneralExpenseLines,
      data,
      action: 'Hr_SliceAction_SearchGeneralExpenseLines',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

export const deleteExpenseLine = createAsyncThunk(
  'expenseLine/deleteExpenseLine',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _deleteExpenseLine,
      data,
      action: 'Hr_SliceAction_DeleteExpenseLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: _searchExpenseLines,
        data: {userId: data?.userId},
        action: 'Hr_SliceAction_FetchExpenseLines',
        getState,
        responseOptions: {isArrayResponse: true},
      });
    });
  },
);

export const createExpenseLine = createAsyncThunk(
  'expenseLine/createExpenseLine',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _createExpenseLine,
      data,
      action: 'Hr_SliceAction_CreateExpenseLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: _searchExpenseLines,
        data: {userId: data?.userId},
        action: 'Hr_SliceAction_FetchExpenseLines',
        getState,
        responseOptions: {isArrayResponse: true},
      });
    });
  },
);

export const updateExpenseLine = createAsyncThunk(
  'expenseLine/updateExpenseLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateExpenseLine,
      data,
      action: 'Hr_SliceAction_SearchKilometricAllowParam',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      return handlerApiCall({
        fetchFunction:
          data?.expenseId == null
            ? _searchExpenseLines
            : data.mode === ExpenseLine.modes.general
            ? _searchGeneralExpenseLines
            : _searchKilometricExpenseLines,
        action:
          data?.expenseId == null
            ? 'Hr_SliceAction_FetchExpenseLines'
            : data?.mode === ExpenseLine.modes.general
            ? 'Hr_SliceAction_SearchGeneralExpenseLines'
            : 'Hr_SliceAction_SearchKilometricExpenseLines',
        getState,
        data: {expenseId: data.expenseId, userId: data?.userId},
        responseOptions: {isArrayResponse: true},
      });
    });
  },
);

const initialState = {
  loadingExpenseLine: true,
  moreLoading: false,
  isListEnd: false,
  expenseLineList: [],

  loadingGeneralExpenseLine: true,
  moreLoadingGeneralExpenseLine: false,
  isListEndGeneralExpenseLine: false,
  generalExpenseLineList: [],
  totalNumberExpenseGeneral: 0,

  loadingKilometricExpenseLine: true,
  moreLoadingKilometricExpenseLine: false,
  isListEndKilometricExpenseLine: false,
  kilometricExpenseLineList: [],
  totalNumberExpenseKilomectric: 0,
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
      searchKilometricExpenseLines,
      {
        loading: 'loadingKilometricExpenseLine',
        moreLoading: 'moreLoadingKilometricExpenseLine',
        isListEnd: 'isListEndKilometricExpenseLine',
        list: 'kilometricExpenseLineList',
        total: 'totalNumberExpenseKilomectric',
      },
      {
        manageTotal: true,
      },
    );
    generateInifiniteScrollCases(
      builder,
      searchGeneralExpenseLines,
      {
        loading: 'loadingGeneralExpenseLine',
        moreLoading: 'moreLoadingGeneralExpenseLine',
        isListEnd: 'isListEndGeneralExpenseLine',
        list: 'generalExpenseLineList',
        total: 'totalNumberExpenseGeneral',
      },
      {
        manageTotal: true,
      },
    );
    builder.addCase(createExpenseLine.pending, (state, action) => {
      state.loadingExpenseLine = true;
    });
    builder.addCase(createExpenseLine.fulfilled, (state, action) => {
      state.loadingExpenseLine = false;
      state.expenseLineList = action.payload;
    });
    builder.addCase(deleteExpenseLine.fulfilled, (state, action) => {
      state.expenseLineList = action.payload;
    });
    builder.addCase(updateExpenseLine.fulfilled, (state, action) => {
      if (action?.meta?.arg?.expenseId == null) {
        state.expenseLineList = action.payload;
      } else {
        if (action?.meta?.arg?.mode === ExpenseLine.modes.general) {
          state.loadingGeneralExpenseLine = false;
          state.generalExpenseLineList = action.payload;
        }
        if (action?.meta?.arg?.mode === ExpenseLine.modes.kilometric) {
          state.loadingKilometricExpenseLine = false;
          state.kilometricExpenseLineList = action.payload;
        }
      }
    });
  },
});

export const expenseLineReducer = expenseLineSlice.reducer;
