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
import {searchEquipmentPicture as _searchEquipmentPicture} from '../api/equipment-picture-api';

export const searchEquipmentPicture = createAsyncThunk(
  'intervention_equipmentPicture/searchEquipmentPicture',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchEquipmentPicture,
      data,
      action: 'Intervention_SliceAction_SearchEquipmentPicture',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingList: false,
  moreLoading: false,
  isListEnd: false,
  equipmentPictureList: [],
};

const equipmentPictureSlice = createSlice({
  name: 'intervention_equipmentPicture',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchEquipmentPicture, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'equipmentPictureList',
    });
  },
});

export const equipmentPictureReducer = equipmentPictureSlice.reducer;
