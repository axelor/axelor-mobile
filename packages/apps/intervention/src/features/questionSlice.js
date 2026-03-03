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
  fetchQuestion as _fetchQuestion,
  fetchQuestionById as _fetchQuestionById,
  fetchRange as _fetchRange,
  updateQuestion as _updateQuestion,
} from '../api/question-api';

export const fetchQuestion = createAsyncThunk(
  'intervention_question/fetchQuestion',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _fetchQuestion,
      data,
      action: 'Intervention_SliceAction_FetchQuestion',
      getState,
      responseOptions: {isArrayResponse: true},
    }).then(res => {
      if (data.rangeId == null && data.page === 0) {
        dispatch(fetchRange({interventionId: data.interventionId}));
      }

      return res;
    });
  },
);

export const fetchQuestionById = createAsyncThunk(
  'intervention_question/fetchQuestionById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchQuestionById,
      data,
      action: 'Intervention_SliceAction_FetchQuestionById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateQuestion = createAsyncThunk(
  'intervention_question/updateQuestion',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _updateQuestion,
      data,
      action: 'Intervention_SliceAction_UpdateQuestion',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(() => {
      dispatch(
        fetchQuestion({
          interventionId: data.interventionId,
          rangeId: data.rangeId,
        }),
      );
    });
  },
);

export const fetchRange = createAsyncThunk(
  'intervention_question/fetchRange',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchRange,
      data,
      action: 'Intervention_SliceAction_FetchRange',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: true,
  moreLoading: false,
  isListEnd: false,
  questionlist: [],

  loadingQuestion: true,
  question: {},

  loadingRangeList: true,
  rangeList: [],
};

const questionSlice = createSlice({
  name: 'intervention_question',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchQuestion, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'questionlist',
    });
    builder.addCase(fetchQuestionById.pending, state => {
      state.loadingQuestion = true;
    });
    builder.addCase(fetchQuestionById.fulfilled, (state, action) => {
      state.loadingQuestion = false;
      state.question = action.payload;
    });
    builder.addCase(fetchRange.pending, state => {
      state.loadingRangeList = true;
    });
    builder.addCase(fetchRange.fulfilled, (state, action) => {
      state.loadingRangeList = false;
      state.rangeList = action.payload;
    });
  },
});

export const questionReducer = questionSlice.reducer;
