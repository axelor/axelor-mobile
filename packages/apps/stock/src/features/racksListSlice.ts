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
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {searchStockLocationLineRacks} from '../api/stock-location-line-api';

export const getRacks = createAsyncThunk(
  'Utils/racks',
  async function (data: any, {getState}) {
    const stockId = data.stockId;
    const productIds = [
      ...new Set(
        data.LineList.filter((line: any) => line.product?.id != null).map(
          (line: any) => line.product.id,
        ),
      ),
    ];

    if (stockId == null || productIds.length === 0) return null;

    const results = await handlerApiCall({
      fetchFunction: searchStockLocationLineRacks,
      data: {stockId, productIds},
      action: 'Stock_SliceAction_FetchRacks',
      getState,
      responseOptions: {isArrayResponse: true},
    });

    const racksMap: any = {};

    results?.forEach((line: any) => {
      if (line.product?.id != null) {
        racksMap[line.product.id] = line.rack ?? '';
      }
    });

    return {stockId, racksMap};
  },
);

const initialState = {
  loadingRacks: false,
  racksMap: {} as {[stockId: string]: {[productId: string]: string}},
};

const rackSlice = createSlice({
  name: 'rack',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getRacks.pending, state => {
      state.loadingRacks = true;
    });
    builder.addCase(getRacks.fulfilled, (state, action) => {
      state.loadingRacks = false;
      if (action.payload?.stockId != null) {
        const {stockId, racksMap} = action.payload;

        state.racksMap = {
          ...(state.racksMap ?? {}),
          [stockId]: {...(state.racksMap?.[stockId] ?? {}), ...racksMap},
        };
      }
    });
    builder.addCase(getRacks.rejected, state => {
      state.loadingRacks = false;
    });
  },
});

export const rackReducer = rackSlice.reducer;
