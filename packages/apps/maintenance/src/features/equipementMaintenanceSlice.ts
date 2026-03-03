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
import {searchEquipementMaintenance as _searchEquipementMaintenance} from '../api/equipement-maintenance-api';

export const searchEquipementMaintenance = createAsyncThunk(
  'maintenance_equipementMaintenance/searchEquipementMaintenance',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchEquipementMaintenance,
      data,
      action: 'Maintenance_SliceAction_SearchEquipementMaintenance',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingEquipementMaintenances: false,
  moreLoadingEquipementMaintenance: false,
  isListEndEquipementMaintenance: false,
  equipementMaintenanceList: [],
};

const equipementMaintenanceSlice = createSlice({
  name: 'maintenance_equipementMaintenance',
  initialState,
  reducers: {},
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchEquipementMaintenance, {
      loading: 'loadingEquipementMaintenances',
      moreLoading: 'moreLoadingEquipementMaintenance',
      isListEnd: 'isListEndEquipementMaintenance',
      list: 'equipementMaintenanceList',
    });
  },
});

export const equipementMaintenanceReducer = equipementMaintenanceSlice.reducer;
