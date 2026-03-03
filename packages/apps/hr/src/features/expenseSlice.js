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
  updateAgendaItems,
} from '@axelor/aos-mobile-core';
import {
  cancelExpense as _cancelExpense,
  createExpense as _createExpense,
  deleteExpense as _deleteExpense,
  getExpense,
  quickCreateExpense as _quickCreateExpense,
  refuseExpense as _refuseExpense,
  returnToDraftStatusExpense as _returnToDraftStatusExpense,
  searchExpenseDraft as _searchExpenseDraft,
  searchExpenseToValidate as _searchExpenseToValidate,
  searchMyExpense as _searchMyExpense,
  sendExpense as _sendExpense,
  updateExpense as _updateExpense,
  validateExpense as _validateExpense,
} from '../api/expense-api';
import {Expense} from '../types';
import {fetchExpenseLine} from './expenseLineSlice';

export const createExpense = createAsyncThunk(
  'expense/createExpense',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _createExpense,
      data,
      action: 'Hr_SliceAction_CreateExpense',
      getState,
      responseOptions: {isArrayResponse: false},
    })
      .then(() => {
        return handlerApiCall({
          fetchFunction: _searchMyExpense,
          data: {userId: data.userId},
          action: 'Hr_SliceAction_FetchMyExpense',
          getState,
          responseOptions: {isArrayResponse: true},
        });
      })
      .then(res => {
        dispatch(fetchExpenseLine({userId: data.userId}));
        return res;
      });
  },
);

export const quickCreateExpense = createAsyncThunk(
  'expense/quickCreateExpense',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _quickCreateExpense,
      data,
      action: 'Hr_SliceAction_QuickCreateExpense',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(res => {
      dispatch(searchMyExpense({userId: data.userId, page: 0}));
      return res;
    });
  },
);

export const sendExpense = createAsyncThunk(
  'expense/sendExpense',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _sendExpense,
      data,
      action: 'Hr_SliceAction_SendExpense',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      if (data.onExpense) {
        return handlerApiCall({
          fetchFunction: getExpense,
          data: {ExpenseId: data.expenseId},
          action: 'Hr_SliceAction_FetchExpenseById',
          getState,
          responseOptions: {isArrayResponse: false},
        });
      } else {
        return handlerApiCall({
          fetchFunction: _searchMyExpense,
          data: {userId: data.userId},
          action: 'Hr_SliceAction_FetchMyExpense',
          getState,
          responseOptions: {isArrayResponse: true},
        });
      }
    });
  },
);

export const validateExpense = createAsyncThunk(
  'expense/validateExpense',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _validateExpense,
      data,
      action: 'Hr_SliceAction_ValidateExpense',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      if (data.onExpense) {
        return handlerApiCall({
          fetchFunction: getExpense,
          data: {ExpenseId: data.expenseId},
          action: 'Hr_SliceAction_FetchExpenseById',
          getState,
          responseOptions: {isArrayResponse: false},
        });
      } else if (data.mode === Expense.mode.validation) {
        return handlerApiCall({
          fetchFunction: _searchExpenseToValidate,
          data: {user: data.user},
          action: 'Hr_SliceAction_FetchExpenseToValidate',
          getState,
          responseOptions: {isArrayResponse: true},
        });
      } else {
        return handlerApiCall({
          fetchFunction: _searchMyExpense,
          data: {userId: data.userId},
          action: 'Hr_SliceAction_FetchMyExpense',
          getState,
          responseOptions: {isArrayResponse: true},
        });
      }
    });
  },
);

export const refuseExpense = createAsyncThunk(
  'expense/refuseExpense',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: _refuseExpense,
      data,
      action: 'Hr_SliceAction_RefuseExpense',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      return handlerApiCall({
        fetchFunction: getExpense,
        data: {ExpenseId: data.expenseId},
        action: 'Hr_SliceAction_FetchExpenseById',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const updateExpense = createAsyncThunk(
  'expense/updateExpense',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateExpense,
      data,
      action: 'Hr_SliceAction_UpdateExpense',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      if (data?.isLineCreation) {
        return handlerApiCall({
          fetchFunction: getExpense,
          data: {ExpenseId: data.expenseId},
          action: 'Hr_SliceAction_FetchExpenseById',
          getState,
          responseOptions: {isArrayResponse: false},
        });
      } else {
        return handlerApiCall({
          fetchFunction: _searchMyExpense,
          data: {userId: data.userId},
          action: 'Hr_SliceAction_FetchMyExpense',
          getState,
          responseOptions: {isArrayResponse: true},
        }).then(res => {
          dispatch(fetchExpenseLine({userId: data.userId}));
          return res;
        });
      }
    });
  },
);

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

export const fetchExpenseById = createAsyncThunk(
  'expense/fetchExpenseById',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getExpense,
      data,
      action: 'Hr_SliceAction_FetchExpenseById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const deleteExpense = createAsyncThunk(
  'expense/deleteExpense',
  async function (data = {}, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _deleteExpense,
      data,
      action: 'Hr_SliceAction_DeleteExpense',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      dispatch(searchMyExpense({userId: data.userId, page: 0}));
    });
  },
);

export const cancelExpense = createAsyncThunk(
  'hr_expense/cancelExpense',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _cancelExpense,
      data,
      action: 'Hr_SliceAction_CancelExpense',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(fetchExpenseById({ExpenseId: data.expenseId}));
      if (data.mode === Expense.mode.validation) {
        dispatch(searchExpenseToValidate({user: data.user}));
      } else {
        dispatch(searchMyExpense({userId: data.user?.id}));
      }
    });
  },
);

export const returnToDraftStatusExpense = createAsyncThunk(
  'hr_expense/returnToDraftStatusExpense',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _returnToDraftStatusExpense,
      data,
      action: 'Hr_SliceAction_ReturnToDraftStatusExpense',
      getState,
      responseOptions: {isArrayResponse: false},
    }).then(() => {
      dispatch(fetchExpenseById({ExpenseId: data.expenseId}));
      dispatch(searchMyExpense({userId: data.user?.id}));
    });
  },
);

const initialState = {
  loading: true,
  expenseDraftList: [],

  loadingMyExpense: true,
  moreLoadingMyExpense: true,
  isListEndMyExpense: true,
  myExpenseList: [],

  loadingExpenseToValidate: true,
  moreLoadingExpenseToValidate: true,
  isListEndExpenseToValidate: true,
  expenseToValidateList: [],
  totalNumberExpenseToValidate: 0,

  loadingExpense: true,
  expense: {},
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
    builder.addCase(fetchExpenseById.pending, (state, action) => {
      state.loadingExpense = true;
    });
    builder.addCase(fetchExpenseById.fulfilled, (state, action) => {
      state.loadingExpense = false;
      state.expense = action.payload;
    });
    builder.addCase(createExpense.pending, (state, action) => {
      state.loadingMyExpense = true;
    });
    builder.addCase(createExpense.fulfilled, (state, action) => {
      state.loadingMyExpense = false;
      state.myExpenseList = action.payload;
    });
    builder.addCase(updateExpense.pending, (state, action) => {
      if (action?.meta?.arg?.isLineCreation) {
        state.loadingExpense = true;
      } else {
        state.loadingMyExpense = true;
      }
    });
    builder.addCase(updateExpense.fulfilled, (state, action) => {
      if (action?.meta?.arg?.isLineCreation) {
        state.loadingExpense = false;
        state.expense = action.payload;
      } else {
        state.loadingMyExpense = false;
        state.myExpenseList = action.payload;
      }
    });
    builder.addCase(sendExpense.pending, (state, action) => {
      if (action?.meta?.arg?.onExpense) {
        state.loadingExpense = true;
      } else {
        state.loadingMyExpense = true;
      }
    });
    builder.addCase(sendExpense.fulfilled, (state, action) => {
      if (action?.meta?.arg?.onExpense) {
        state.loadingExpense = false;
        state.expense = action.payload;
        state.myExpenseList = updateAgendaItems(state.myExpenseList, [
          action.payload,
        ]);
      } else {
        state.loadingMyExpense = false;
        state.myExpenseList = action.payload;
      }
    });
    builder.addCase(validateExpense.pending, (state, action) => {
      if (action?.meta?.arg?.onExpense) {
        state.loadingExpense = true;
      } else if (action?.meta?.arg?.mode === Expense.mode.validation) {
        state.loadingExpenseToValidate = true;
      } else {
        state.loadingMyExpense = true;
      }
    });
    builder.addCase(validateExpense.fulfilled, (state, action) => {
      if (action?.meta?.arg?.onExpense) {
        state.loadingExpense = false;
        state.expense = action.payload;
        if (action?.meta?.arg?.mode === Expense.mode.validation) {
          state.expenseToValidateList = updateAgendaItems(
            state.expenseToValidateList,
            [action.payload],
          );
        } else {
          state.myExpenseList = updateAgendaItems(state.myExpenseList, [
            action.payload,
          ]);
        }
      } else if (action?.meta?.arg?.mode === Expense.mode.validation) {
        state.loadingExpenseToValidate = false;
        state.expenseToValidateList = action.payload;
      } else {
        state.loadingMyExpense = false;
        state.myExpenseList = action.payload;
      }
    });
    builder.addCase(refuseExpense.pending, (state, action) => {
      state.loadingExpense = true;
    });
    builder.addCase(refuseExpense.fulfilled, (state, action) => {
      state.loadingExpense = false;
      state.expense = action.payload;
      if (action?.meta?.arg?.mode === Expense.mode.validation) {
        state.expenseToValidateList = updateAgendaItems(
          state.expenseToValidateList,
          [action.payload],
        );
      } else {
        state.myExpenseList = updateAgendaItems(state.myExpenseList, [
          action.payload,
        ]);
      }
    });
  },
});

export const expenseReducer = expenseSlice.reducer;
