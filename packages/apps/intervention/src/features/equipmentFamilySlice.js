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
import {searchEquipmentFamily as _searchEquipmentFamily} from '../api/equipment-family-api';

export const searchEquipmentFamily = createAsyncThunk(
  'intervention_equipmentFamily/searchEquipmentFamily',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchEquipmentFamily,
      data,
      action: 'Intervention_SliceAction_SearchEquipmentFamily',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  equipmentFamilyList: [],
};

const equipmentFamilySlice = createSlice({
  name: 'intervention_equipmentFamily',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchEquipmentFamily, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'equipmentFamilyList',
    });
  },
});

export const equipmentFamilyReducer = equipmentFamilySlice.reducer;
