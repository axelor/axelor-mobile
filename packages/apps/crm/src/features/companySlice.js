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
import {getCompany} from '../api/company-api';

export const fetchCompanyById = createAsyncThunk(
  'lead/getLead',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getCompany,
      data,
      action: 'Crm_SliceAction_FetchCompanyById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingCompany: true,
  company: {},
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchCompanyById.pending, (state, action) => {
      state.loadingCompany = true;
    });
    builder.addCase(fetchCompanyById.fulfilled, (state, action) => {
      state.loadingCompany = false;
      state.company = action.payload;
    });
  },
});

export const companyReducer = companySlice.reducer;
