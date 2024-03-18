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
  searchEquipments as _searchEquipments,
  searchPlaceEquipments as _searchPlaceEquipments,
} from '../api/equipments-api';

export const searchEquipments = createAsyncThunk(
  'intervention_equipments/searchEquipments',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchEquipments,
      data,
      action: 'Intervention_SliceAction_SearchEquipments',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const searchPlaceEquipments = createAsyncThunk(
  'intervention_equipments/searchPlaceEquipments',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchPlaceEquipments,
      data,
      action: 'Intervention_SliceAction_SearchPlaceEquipments',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  equipmentList: [],
};

const equipmentsSlice = createSlice({
  name: 'intervention_equipments',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchEquipments, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'equipmentList',
    });
  },
});

export const equipmentsReducer = equipmentsSlice.reducer;
