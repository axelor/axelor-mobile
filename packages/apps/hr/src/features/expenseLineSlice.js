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
import {
  createExpenseLine as _createExpenseLine,
  deleteExpenseLine as _deleteExpenseLine,
  searchExpenseLines as _searchExpenseLines,
  searchGeneralExpenseLines as _searchGeneralExpenseLines,
  searchKilometricExpenseLines as _searchKilometricExpenseLines,
  updateExpenseLine as _updateExpenseLine,
} from '../api/expense-line-api';
import {fetchExpenseById, updateExpense} from './expenseSlice';
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
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _deleteExpenseLine,
      data,
      action:
        data?.expenseId != null
          ? 'Hr_SliceAction_DeleteExpenseLine'
          : 'Hr_SliceAction_DeleteOrphanExpenseLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      if (data?.expenseId != null) {
        dispatch(fetchExpenseById({ExpenseId: data?.expenseId}));
      } else {
        return handlerApiCall({
          fetchFunction: _searchExpenseLines,
          data: {userId: data?.userId},
          action: 'Hr_SliceAction_FetchExpenseLines',
          getState,
          responseOptions: {isArrayResponse: true},
        });
      }
    });
  },
);

export const createExpenseLine = createAsyncThunk(
  'expenseLine/createExpenseLine',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _createExpenseLine,
      data,
      action: 'Hr_SliceAction_CreateExpenseLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(res => {
      if (data?.idExpense == null) {
        return handlerApiCall({
          fetchFunction: _searchExpenseLines,
          data: {userId: data?.userId},
          action: 'Hr_SliceAction_FetchExpenseLines',
          getState,
          responseOptions: {isArrayResponse: true},
        });
      } else {
        dispatch(
          updateExpense({
            isLineCreation: true,
            expenseId: data?.idExpense,
            version: data?.versionExpense,
            userId: data?.userId,
            expenseLineIdList: [res.expenseLineId],
          }),
        );
      }
    });
  },
);

export const updateExpenseLine = createAsyncThunk(
  'expenseLine/updateExpenseLine',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateExpenseLine,
      data,
      action: 'Hr_SliceAction_UpdateExpenseLine',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      if (data?.expenseId != null) {
        dispatch(fetchExpenseById({ExpenseId: data?.expenseId}));
      } else {
        return handlerApiCall({
          fetchFunction: _searchExpenseLines,
          action: 'Hr_SliceAction_FetchExpenseLines',
          getState,
          data: {userId: data?.userId},
          responseOptions: {isArrayResponse: true},
        });
      }
    });
  },
);

const initialState = {
  loadingExpenseLine: true,
  moreLoading: true,
  isListEnd: true,
  expenseLineList: [],

  loadingGeneralExpenseLine: true,
  moreLoadingGeneralExpenseLine: true,
  isListEndGeneralExpenseLine: true,
  generalExpenseLineList: [],
  totalNumberExpenseGeneral: 0,

  loadingKilometricExpenseLine: true,
  moreLoadingKilometricExpenseLine: true,
  isListEndKilometricExpenseLine: true,
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
      if (action?.meta?.arg?.idExpense == null) {
        state.loadingExpenseLine = true;
      }
    });
    builder.addCase(createExpenseLine.fulfilled, (state, action) => {
      if (action?.meta?.arg?.idExpense == null) {
        state.loadingExpenseLine = false;
        state.expenseLineList = action.payload;
      }
    });
    builder.addCase(deleteExpenseLine.pending, (state, action) => {
      if (action?.meta?.arg?.expenseId == null) {
        state.loadingExpenseLine = true;
      }
    });
    builder.addCase(deleteExpenseLine.fulfilled, (state, action) => {
      if (action?.meta?.arg?.expenseId == null) {
        state.loadingExpenseLine = false;
        state.expenseLineList = action.payload;
      }
    });
    builder.addCase(updateExpenseLine.pending, (state, action) => {
      if (action?.meta?.arg?.expenseId == null) {
        state.loadingExpenseLine = true;
      } else if (action?.meta?.arg?.mode === ExpenseLine.modes.general) {
        state.loadingGeneralExpenseLine = true;
      } else if (action?.meta?.arg?.mode === ExpenseLine.modes.kilometric) {
        state.loadingKilometricExpenseLine = true;
      }
    });
    builder.addCase(updateExpenseLine.fulfilled, (state, action) => {
      if (action?.meta?.arg?.expenseId == null) {
        state.loadingExpenseLine = false;
        state.expenseLineList = action.payload;
      } else if (action?.meta?.arg?.mode === ExpenseLine.modes.general) {
        state.loadingGeneralExpenseLine = false;
      } else if (action?.meta?.arg?.mode === ExpenseLine.modes.kilometric) {
        state.loadingKilometricExpenseLine = false;
      }
    });
  },
});

export const expenseLineReducer = expenseLineSlice.reducer;
