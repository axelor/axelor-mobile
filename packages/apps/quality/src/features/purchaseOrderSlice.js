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
import {searchSupplierOrder as _searchSupplierOrder} from '../api/purchase-order-api';

export const searchSupplierOrder = createAsyncThunk(
  'quality_purchaseOrder/searchSupplierOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchSupplierOrder,
      data,
      action: 'Quality_SliceAction_SearchSupplierOrder',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingSupplierPurchaseOrders: false,
  moreLoadingSupplierPurchaseOrder: false,
  isListEndSupplierPurchaseOrder: false,
  supplierPurchaseOrderList: [],
};

const purchaseOrderSlice = createSlice({
  name: 'quality_purchaseOrder',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchSupplierOrder, {
      loading: 'loadingSupplierPurchaseOrders',
      moreLoading: 'moreLoadingSupplierPurchaseOrder',
      isListEnd: 'isListEndSupplierPurchaseOrder',
      list: 'supplierPurchaseOrderList',
    });
  },
});

export const purchaseOrderReducer = purchaseOrderSlice.reducer;
