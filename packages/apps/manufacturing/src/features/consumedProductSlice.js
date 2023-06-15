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
import {updateStockMoveLineTrackingNumber} from '@axelor/aos-mobile-stock';

export const addTrackingNumberToConsumedProductStockMoveLine = createAsyncThunk(
  'consumedProduct/addTrackingNumberToConsumedProductStockMoveLine',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: updateStockMoveLineTrackingNumber,
      data,
      action:
        'Manufacturing_SliceAction_AddTrackingNumberToConsumedProductStockMoveLine',
      getState,
      responseOptions: {showToast: true},
    });
  },
);

const initialState = {
  loadingConsumedProductStockMoveLine: false,
  consumedProductStockMoveLine: {},
};

const consumedProductSlice = createSlice({
  name: 'consumedProduct',
  initialState,
  extraReducers: builder => {
    builder.addCase(
      addTrackingNumberToConsumedProductStockMoveLine.pending,
      state => {
        state.loadingConsumedProductStockMoveLine = true;
      },
    );
    builder.addCase(
      addTrackingNumberToConsumedProductStockMoveLine.fulfilled,
      (state, action) => {
        state.loadingConsumedProductStockMoveLine = false;
        state.consumedProductStockMoveLine = action.payload;
      },
    );
  },
});

export const consumedProductReducer = consumedProductSlice.reducer;
