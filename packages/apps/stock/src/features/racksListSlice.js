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
  async function (data, {getState}) {
    const productIds = [
      ...new Set(
        data.LineList.filter(line => line.product?.id != null).map(
          line => line.product.id,
        ),
      ),
    ];

    if (productIds.length === 0) {
      return {};
    }

    const results = await handlerApiCall({
      fetchFunction: searchStockLocationLineRacks,
      data: {stockId: data.stockId, productIds},
      action: 'Stock_SliceAction_FetchRacks',
      getState,
      responseOptions: {isArrayResponse: true},
    });

    const racksMap = {};
    results?.forEach(line => {
      if (line.product?.id != null) {
        racksMap[line.product.id] = line.rack ?? '';
      }
    });
    return racksMap;
  },
);

const initialState = {
  loadingRacks: false,
  racksMap: {},
};

const rackSlice = createSlice({
  name: 'rack',
  initialState,
  extraReducers: builder => {
    builder.addCase(getRacks.pending, state => {
      state.loadingRacks = true;
    });
    builder.addCase(getRacks.fulfilled, (state, action) => {
      state.loadingRacks = false;
      state.racksMap = action.payload;
    });
    builder.addCase(getRacks.rejected, state => {
      state.loadingRacks = false;
    });
  },
});

export const rackReducer = rackSlice.reducer;
