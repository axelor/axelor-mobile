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
import {searchStockLocationLine} from '../api/stock-location-line-api';

export const getRacks = createAsyncThunk(
  'Utils/racks',
  async function (data, {getState}) {
    let promises = [];
    data.LineList.forEach(line => {
      promises.push(fetchData(data.stockId, line, {getState}));
    });
    return Promise.all(promises).then(resultes => {
      return resultes;
    });
  },
);

var getRack = async (stockId, productId, {getState}) => {
  return handlerApiCall({
    fetchFunction: searchStockLocationLine,
    data: {
      stockId: stockId,
      productId: productId,
    },
    action: 'Stock_SliceAction_FetchRacks',
    getState,
    responseOptions: {isArrayResponse: true},
  });
};

async function fetchData(stockId, line, {getState}) {
  return await getRack(stockId, line.product.id, {getState});
}

const initialState = {
  loadingRacks: false,
  racksList: [],
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
      state.racksList = action.payload;
    });
  },
});

export const rackReducer = rackSlice.reducer;
