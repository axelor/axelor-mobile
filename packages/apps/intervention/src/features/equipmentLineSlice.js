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
import {searchEquipmentLine as _searchEquipmentLine} from '../api/equipment-line-api';

export const searchEquipmentLine = createAsyncThunk(
  'intervention_equipmentLine/searchEquipmentLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchEquipmentLine,
      data,
      action: 'Intervention_SliceAction_SearchEquipmentLine',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  equipmentLineList: [],
};

const equipmentLineSlice = createSlice({
  name: 'intervention_equipmentLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchEquipmentLine, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'equipmentLineList',
    });
  },
});

export const equipmentLineReducer = equipmentLineSlice.reducer;
