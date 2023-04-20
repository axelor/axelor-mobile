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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {
  fetchChildrenManufacturingOrders,
  fetchManufacturingOrder,
  fetchManufacturingOrderOfProductionOrder,
  searchManufacturingOrderFilter,
  updateManufacturingOrderStatus,
} from '../api/manufacturing-order-api';

export const fetchManufacturingOrders = createAsyncThunk(
  'manufacturingOrder/fetchManufacturingOrders',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchManufacturingOrderFilter,
      data,
      action: 'Manufacturing_SliceAction_FetchManufacturingOrders',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchManufOrder = createAsyncThunk(
  'manufacturingOrder/fetchManufOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchManufacturingOrder,
      data,
      action: 'Manufacturing_SliceAction_FetchManufacturingOrderFromId',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const fetchLinkedManufOrders = createAsyncThunk(
  'manufacturingOrder/fetchLinkedManufOrders',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchManufacturingOrderOfProductionOrder,
      data,
      action: 'Manufacturing_SliceAction_FetchLinkedManufacturingOrders',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchChildrenOfManufacturingOrder = createAsyncThunk(
  'manufacturingOrder/fetchChildrenOfManufacturingOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchChildrenManufacturingOrders,
      data,
      action: 'Manufacturing_SliceAction_FetchChildrenManufacturingOrders',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const updateStatusOfManufOrder = createAsyncThunk(
  'manufacturingOrder/updateStatusOfManufOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: updateManufacturingOrderStatus,
      data,
      action: 'Manufacturing_SliceAction_UpdateManufacturingOrderStatus',
      getState,
      responseOptions: {showToast: true},
    }).then(() =>
      handlerApiCall({
        fetchFunction: fetchManufacturingOrder,
        data: {manufOrderId: data?.manufOrderId},
        action: 'Manufacturing_SliceAction_FetchManufacturingOrderFromId',
        getState,
        responseOptions: {isArrayResponse: false},
      }),
    );
  },
);

const initialState = {
  loading: false,
  moreLoading: false,
  isListEnd: false,
  manufOrderList: [],
  loadingOrder: false,
  manufOrder: {},
  loadingLinkMO: false,
  moreLoadingLinkMO: false,
  isListEndLinkMO: false,
  linkedManufOrders: [],
  loadingChildrenMO: false,
  moreLoadingChildrenMO: false,
  isListEndChildrenMO: false,
  childrenManufOrders: [],
};

const manufacturingOrderSlice = createSlice({
  name: 'manufacturingOrder',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchManufacturingOrders.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchManufacturingOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.manufOrderList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.manufOrderList = [...state.manufOrderList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
    builder.addCase(fetchManufOrder.pending, state => {
      state.loadingOrder = true;
    });
    builder.addCase(fetchManufOrder.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.manufOrder = action.payload;
    });
    builder.addCase(fetchLinkedManufOrders.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingLinkMO = true;
      } else {
        state.moreLoadingLinkMO = true;
      }
    });
    builder.addCase(fetchLinkedManufOrders.fulfilled, (state, action) => {
      state.loadingLinkMO = false;
      state.moreLoadingLinkMO = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.linkedManufOrders = action.payload;
        state.isListEndLinkMO = false;
      } else {
        if (action.payload != null) {
          state.isListEndLinkMO = false;
          state.linkedManufOrders = [
            ...state.linkedManufOrders,
            ...action.payload,
          ];
        } else {
          state.isListEndLinkMO = true;
        }
      }
    });
    builder.addCase(
      fetchChildrenOfManufacturingOrder.pending,
      (state, action) => {
        if (action.meta.arg.page === 0) {
          state.loadingChildrenMO = true;
        } else {
          state.moreLoadingChildrenMO = true;
        }
      },
    );
    builder.addCase(
      fetchChildrenOfManufacturingOrder.fulfilled,
      (state, action) => {
        state.loadingChildrenMO = false;
        state.moreLoadingChildrenMO = false;
        if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
          state.childrenManufOrders = action.payload;
          state.isListEndChildrenMO = false;
        } else {
          if (action.payload != null) {
            state.isListEndChildrenMO = false;
            state.childrenManufOrders = [
              ...state.childrenManufOrders,
              ...action.payload,
            ];
          } else {
            state.isListEndChildrenMO = true;
          }
        }
      },
    );
    builder.addCase(updateStatusOfManufOrder.fulfilled, (state, action) => {
      state.manufOrder = action.payload;
    });
  },
});

export const manufacturingOrderReducer = manufacturingOrderSlice.reducer;
