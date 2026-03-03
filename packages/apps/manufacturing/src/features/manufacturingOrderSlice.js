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
    generateInifiniteScrollCases(builder, fetchManufacturingOrders, {
      loading: 'loading',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'manufOrderList',
    });
    builder.addCase(fetchManufOrder.pending, state => {
      state.loadingOrder = true;
    });
    builder.addCase(fetchManufOrder.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.manufOrder = action.payload;
    });
    generateInifiniteScrollCases(builder, fetchLinkedManufOrders, {
      loading: 'loadingLinkMO',
      moreLoading: 'moreLoadingLinkMO',
      isListEnd: 'isListEndLinkMO',
      list: 'linkedManufOrders',
    });
    generateInifiniteScrollCases(builder, fetchChildrenOfManufacturingOrder, {
      loading: 'loadingChildrenMO',
      moreLoading: 'moreLoadingChildrenMO',
      isListEnd: 'isListEndChildrenMO',
      list: 'childrenManufOrders',
    });
    builder.addCase(updateStatusOfManufOrder.fulfilled, (state, action) => {
      state.manufOrder = action.payload;
    });
  },
});

export const manufacturingOrderReducer = manufacturingOrderSlice.reducer;
