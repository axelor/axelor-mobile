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
  checkNullString,
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {
  fetchInternalMove as _fetchInternalMove,
  searchInternalMoveFilter,
  createInternalStockMove,
  realizeInternalMove as _realizeInternalMove,
  modifyInternalMoveNotes,
} from '../api/internal-move-api';

export const searchInternalMoves = createAsyncThunk(
  'internalMove/searchInternalMoves',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchInternalMoveFilter,
      data,
      action: 'Stock_SliceAction_FilterInternalMoves',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchInternalMove = createAsyncThunk(
  'internalMove/fetchInternalMove',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchInternalMove,
      data,
      action: 'Stock_SliceAction_FetchInternalMove',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const createInternalMove = createAsyncThunk(
  'internalMove/createInternalMove',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: createInternalStockMove,
      data,
      action: 'Stock_SliceAction_CreateInternalMove',
      getState,
      responseOptions: {showToast: true, isArrayResponse: false},
    })
      .then(res => {
        if (checkNullString(data.notes)) {
          return res;
        }

        return handlerApiCall({
          fetchFunction: modifyInternalMoveNotes,
          data: {
            internalMoveId: res.id,
            notes: data.notes,
            version: res.version,
          },
          action: 'Stock_SliceAction_ModifyInternalMoveNotes',
          getState,
          responseOptions: {showToast: false},
        });
      })
      .then(() =>
        handlerApiCall({
          fetchFunction: searchInternalMoveFilter,
          data: {companyId: data.companyId},
          action: 'Stock_SliceAction_FilterInternalMoves',
          getState,
          responseOptions: {isArrayResponse: true},
        }),
      );
  },
);

export const realizeInternalMove = createAsyncThunk(
  'internalMove/realizeInternalMove',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _realizeInternalMove,
      data,
      action: 'Stock_SliceAction_RealizeInternalMove',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

const initialState = {
  loadingInternalMoveList: false,
  moreLoading: false,
  isListEnd: false,
  internalMoveList: [],

  loadingInternalMove: false,
  internalMove: null,
};

const internalMoveSlice = createSlice({
  name: 'internalMove',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchInternalMoves, {
      loading: 'loadingInternalMoveList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'internalMoveList',
    });
    builder.addCase(fetchInternalMove.pending, state => {
      state.loadingInternalMove = true;
    });
    builder.addCase(fetchInternalMove.fulfilled, (state, action) => {
      state.loadingInternalMove = false;
      state.internalMove = action.payload;
    });
    builder.addCase(createInternalMove.fulfilled, (state, action) => {
      state.internalMoveList = action.payload;
    });
  },
});

export const internalMoveReducer = internalMoveSlice.reducer;
