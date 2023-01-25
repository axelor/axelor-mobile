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
      action: 'filter machines',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  machineList: [],
};

const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchMachines.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchMachines.fulfilled, (state, action) => {
      state.loading = false;
      state.machineList = action.payload;
    });
  },
});

export const machinesReducer = machinesSlice.reducer;
