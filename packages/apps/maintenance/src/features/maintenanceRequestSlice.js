/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {searchMaintenanceRequests as _searchMaintenanceRequests} from '../api/maintenance-request-api';

export const searchMaintenanceRequests = createAsyncThunk(
  'maintenance_maintenanceRequest/searchMaintenanceRequests',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchMaintenanceRequests,
      data,
      action: 'Maintenance_SliceAction_SearchMaintenanceRequests',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingMaintenanceRequests: false,
  moreLoadingMaintenanceRequest: false,
  isListEndMaintenanceRequest: false,
  maintenanceRequestList: [],
};

const maintenanceRequestSlice = createSlice({
  name: 'maintenance_maintenanceRequest',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchMaintenanceRequests, {
      loading: 'loadingMaintenanceRequests',
      moreLoading: 'moreLoadingMaintenanceRequest',
      isListEnd: 'isListEndMaintenanceRequest',
      list: 'maintenanceRequestList',
    });
  },
});

export const maintenanceRequestReducer = maintenanceRequestSlice.reducer;
