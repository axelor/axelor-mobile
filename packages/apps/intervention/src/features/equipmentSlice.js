/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
  getEquipmentById as _getEquipmentById,
  searchEquipment as _searchEquipment,
  searchPlaceEquipment as _searchPlaceEquipment,
  updateEquipment as _updateEquipment,
} from '../api/equipment-api';

export const searchEquipment = createAsyncThunk(
  'intervention_equipment/searchEquipment',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchEquipment,
      data,
      action: 'Intervention_SliceAction_SearchEquipment',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchPlaceEquipment = createAsyncThunk(
  'intervention_equipment/searchPlaceEquipment',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchPlaceEquipment,
      data,
      action: 'Intervention_SliceAction_SearchPlaceEquipment',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const getEquipmentById = createAsyncThunk(
  'intervention_equipment/getEquipmentById',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _getEquipmentById,
      data,
      action: 'Intervention_SliceAction_GetEquipmentById',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateEquipment = createAsyncThunk(
  'intervention_equipment/updateEquipment',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _updateEquipment,
      data,
      action: 'Intervention_SliceAction_UpdateEquipment',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

const initialState = {
  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  equipmentList: [],

  loadingListEquipPlace: false,
  moreLoadingEquipPlace: false,
  isListEndEquipPlace: false,
  equipmentPlaceList: [],

  loading: false,
  equipment: {},
};

const equipmentSlice = createSlice({
  name: 'intervention_equipment',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchEquipment, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'equipmentList',
    });
    generateInifiniteScrollCases(builder, searchPlaceEquipment, {
      loading: 'loadingListEquipPlace',
      moreLoading: 'moreLoadingEquipPlace',
      isListEnd: 'isListEndEquipPlace',
      list: 'equipmentPlaceList',
    });
    builder.addCase(getEquipmentById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getEquipmentById.fulfilled, (state, action) => {
      state.loading = false;
      state.equipment = action.payload;
    });
  },
});

export const equipmentReducer = equipmentSlice.reducer;
