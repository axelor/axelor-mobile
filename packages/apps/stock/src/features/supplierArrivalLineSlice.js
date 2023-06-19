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
  updateAgendaItems,
} from '@axelor/aos-mobile-core';
import {
  searchSupplierArrivalLines,
  updateLine,
  fetchSupplierArrivalLine as _fetchSupplierArrivalLine,
} from '../api/supplier-arrival-line-api';

export const fetchSupplierArrivalLines = createAsyncThunk(
  'supplierLine/fetchSupplierArrivalLines',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchSupplierArrivalLines,
      data,
      action: 'Stock_SliceAction_FetchSupplierArrivalLines',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

export const updateSupplierArrivalLine = createAsyncThunk(
  'supplierLine/updateSupplierArrivalLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateLine,
      data,
      action: 'Stock_SliceAction_UpdateSupplierArrivalLine',
      getState,
      responseOptions: {showToast: true},
    }).then(res => {
      return handlerApiCall({
        fetchFunction: _fetchSupplierArrivalLine,
        data: {supplierArrivalLineId: res?.id},
        action: 'Stock_SliceAction_FetchSupplierArrivalLine',
        getState,
        responseOptions: {isArrayResponse: false},
      });
    });
  },
);

export const fetchSupplierArrivalLine = createAsyncThunk(
  'supplierLine/fetchSupplierArrivalLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _fetchSupplierArrivalLine,
      data,
      action: 'Stock_SliceAction_FetchSupplierArrivalLine',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingSALines: false,
  moreLoading: false,
  isListEnd: false,
  supplierArrivalLineList: [],
  totalNumberLines: 0,
  loadingSupplierArrivalLine: false,
  supplierArrivalLine: {},
};

const supplierArrivalLineSlice = createSlice({
  name: 'supplierArrivalLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(
      builder,
      fetchSupplierArrivalLines,
      {
        loading: 'loadingSALines',
        moreLoading: 'moreLoading',
        isListEnd: 'isListEnd',
        list: 'supplierArrivalLineList',
        total: 'totalNumberLines',
      },
      {
        manageTotal: true,
      },
    );
    builder.addCase(updateSupplierArrivalLine.pending, state => {
      state.loadingSALines = true;
    });
    builder.addCase(updateSupplierArrivalLine.fulfilled, (state, action) => {
      state.loadingSALines = false;
      state.supplierArrivalLine = action.payload;
      state.supplierArrivalLineList = updateAgendaItems(
        state.supplierArrivalLineList,
        [action.payload],
      );
    });
    builder.addCase(fetchSupplierArrivalLine.pending, state => {
      state.loadingSupplierArrivalLine = true;
    });
    builder.addCase(fetchSupplierArrivalLine.fulfilled, (state, action) => {
      state.loadingSupplierArrivalLine = false;
      state.supplierArrivalLine = action.payload;
    });
  },
});

export const supplierArrivalLineReducer = supplierArrivalLineSlice.reducer;
