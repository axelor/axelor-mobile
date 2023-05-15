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
import {searchMachineFilter} from '../api/machine-api';

export const searchMachines = createAsyncThunk(
  'machines/searchMachine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchMachineFilter,
      data,
      action: 'Manufacturing_SliceAction_FilterMachines',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  machineList: [],
  moreLoading: false,
  isListEnd: false,
};

const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchMachines.pending, (state, action) => {
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.loading = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(searchMachines.fulfilled, (state, action) => {
      state.loading = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.machineList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.machineList = [...state.machineList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
  },
});

export const machinesReducer = machinesSlice.reducer;
