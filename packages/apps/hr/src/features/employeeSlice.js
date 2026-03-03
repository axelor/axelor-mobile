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
  searchEmployee as _searchEmployee,
  searchManagedEmployee as _searchManagedEmployee,
} from '../api/employee-api';

export const searchManagedEmployee = createAsyncThunk(
  'employee/searchManagedEmployee',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchManagedEmployee,
      data,
      action: 'Hr_SliceAction_SearchManagedEmployee',
      getState,
      responseOptions: {isArrayResponse: true, returnTotal: true},
    });
  },
);

export const searchEmployee = createAsyncThunk(
  'hr_employee/searchEmployee',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchEmployee,
      data,
      action: 'Hr_SliceAction_SearchEmployee',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingEmployees: false,
  moreLoadingEmployee: false,
  isListEndEmployee: false,
  employeeList: [],

  managedEmployeeTotal: 0,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchManagedEmployee.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchManagedEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.managedEmployeeTotal = action.payload;
    });
    generateInifiniteScrollCases(builder, searchEmployee, {
      loading: 'loadingEmployees',
      moreLoading: 'moreLoadingEmployee',
      isListEnd: 'isListEndEmployee',
      list: 'employeeList',
    });
  },
});

export const employeeReducer = employeeSlice.reducer;
