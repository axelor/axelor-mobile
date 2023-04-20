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
import {handlerApiCall, updateAgendaItems} from '@axelor/aos-mobile-core';
import {
  searchOperationOrderFilter,
  fetchOperationOrder,
  updateOperationOrderStatus,
  getPlannedOperationOrder,
} from '../api/operation-order-api';

export const fetchOperationOrders = createAsyncThunk(
  'OperationOrder/fetchOperationOrders',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchOperationOrderFilter,
      data,
      action: 'Manufacturing_Fetch_Operation_Orders',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchPlannedOperationOrder = createAsyncThunk(
  'OperationOrder/fetchPlannedOperationOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: getPlannedOperationOrder,
      data,
      action: 'Manufacturing_Fetch_Planned_Operation_Orders',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchOperationOrderById = createAsyncThunk(
  'OperationOrder/fetchOperationOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchOperationOrder,
      data,
      action: 'Manufacturing_Fetch_Operation_Orders_ById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateOperationOrder = createAsyncThunk(
  'OperationOrder/updateOperationOrderStatus',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateOperationOrderStatus,
      data: data,
      action: 'Manufacturing_Update_Operation_Status_Order',
      getState: getState,
      responseOptions: {showToast: false},
    }).then(object =>
      handlerApiCall({
        fetchFunction: fetchOperationOrder,
        data: {operationOrderId: object.id},
        action: 'Manufacturing_Fetch_Operation_Orders_ById',
        getState: getState,
        responseOptions: {isArrayResponse: false},
      }),
    );
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  operationOrderList: [],
  loadingOrder: false,
  operationOrder: {},
  plannedOperationOrderList: [],
};

const operationOrderSlice = createSlice({
  name: 'operationOrder',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchOperationOrders.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchPlannedOperationOrder.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPlannedOperationOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.plannedOperationOrderList = updateAgendaItems(
        state.plannedOperationOrderList,
        action.payload,
      );
    });
    builder.addCase(fetchOperationOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.operationOrderList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.operationOrderList = [
            ...state.operationOrderList,
            ...action.payload,
          ];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchOperationOrderById.pending, state => {
      state.loadingOrder = true;
    });
    builder.addCase(fetchOperationOrderById.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.operationOrder = action.payload;
    });
    builder.addCase(updateOperationOrder.fulfilled, (state, action) => {
      state.operationOrder = action.payload;
    });
  },
});

export const operationOrderReducer = operationOrderSlice.reducer;
