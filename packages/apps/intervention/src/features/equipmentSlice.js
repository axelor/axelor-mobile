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
  archiveEquipment as _archiveEquipment,
  copyEquipment as _copyEquipment,
  deleteEquipment as _deleteEquipment,
  getEquipmentById as _getEquipmentById,
  saveEquipment as _saveEquipment,
  searchEquipment as _searchEquipment,
  searchEquipmentToLink as _searchEquipmentToLink,
  searchInterventionEquipment as _searchInterventionEquipment,
  searchPlaceEquipment as _searchPlaceEquipment,
} from '../api/equipment-api';
import {linkEquipment} from './interventionSlice';

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

export const fetchNumberClientEquipment = createAsyncThunk(
  'intervention_equipment/fetchNumberClientEquipment',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchEquipment,
      data: {isCountFetch: true, ...data},
      action: 'Intervention_SliceAction_FetchNumberClientEquipment',
      getState,
      responseOptions: {isArrayResponse: false, resturnTotalWithData: true},
    });
  },
);

export const searchInterventionEquipment = createAsyncThunk(
  'intervention_equipment/searchInterventionEquipment',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchInterventionEquipment,
      data,
      action: 'Intervention_SliceAction_SearchInterventionEquipment',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchNumberInterventionEquipment = createAsyncThunk(
  'intervention_equipment/fetchNumberInterventionEquipment',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchInterventionEquipment,
      data: {isCountFetch: true, ...data},
      action: 'Intervention_SliceAction_FetchNumberInterventionEquipment',
      getState,
      responseOptions: {isArrayResponse: false, resturnTotalWithData: true},
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

export const saveEquipment = createAsyncThunk(
  'intervention_equipment/saveEquipment',
  async function (data, {getState, dispatch}) {
    return handlerApiCall({
      fetchFunction: _saveEquipment,
      data,
      action: 'Intervention_SliceAction_SaveEquipment',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(equipment => {
      const equipmentId = equipment?.id;
      if (equipmentId != null) {
        if (data.isCreation) {
          dispatch(
            fetchNumberClientEquipment({
              partnerId: data.partnerId,
            }),
          );

          if (data.interventionId && data.interventionVersion) {
            dispatch(linkEquipment({...data, equipmentId}));
          }
        }
      }
    });
  },
);

export const archiveEquipment = createAsyncThunk(
  'intervention_equipment/archiveEquipment',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _archiveEquipment,
      data,
      action: 'Intervention_SliceAction_ArchiveEquipment',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    });
  },
);

export const copyEquipment = createAsyncThunk(
  'intervention_equipment/copyEquipment',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _copyEquipment,
      data,
      action: 'Intervention_SliceAction_CopyEquipment',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const deleteEquipment = createAsyncThunk(
  'intervention_equipment/deleteEquipment',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _deleteEquipment,
      data,
      action: 'Intervention_SliceAction_DeleteEquipment',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const searchEquipmentToLink = createAsyncThunk(
  'intervention_equipment/searchEquipmentToLink',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _searchEquipmentToLink,
      data,
      action: 'Intervention_SliceAction_SearchEquipmentToLink',
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
  totalNumberClientEquipment: 0,

  loadingInterventionEquipmentList: false,
  moreLoadingInterventionEquipment: false,
  isInterventionEquipmentListEnd: false,
  interventionEquipmentList: [],
  totalNumberInterventionEquipment: 0,

  loadingListEquipPlace: false,
  moreLoadingEquipPlace: false,
  isListEndEquipPlace: false,
  equipmentPlaceList: [],

  loadingListEquipToLink: false,
  moreLoadingEquipToLink: false,
  isListEndEquipToLink: false,
  equipmentToLinkList: [],

  loading: false,
  equipment: {},
};

const equipmentSlice = createSlice({
  name: 'intervention_equipment',
  initialState,
  reducers: {
    clearEquipment: state => {
      state.equipment = {};
    },
  },
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchEquipment, {
      loading: 'loadingList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'equipmentList',
    });
    builder.addCase(fetchNumberClientEquipment.fulfilled, (state, action) => {
      state.totalNumberClientEquipment = action.payload.total;
    });
    generateInifiniteScrollCases(builder, searchInterventionEquipment, {
      loading: 'loadingInterventionEquipmentList',
      moreLoading: 'moreLoadingInterventionEquipment',
      isListEnd: 'isInterventionEquipmentListEnd',
      list: 'interventionEquipmentList',
    });
    builder.addCase(
      fetchNumberInterventionEquipment.fulfilled,
      (state, action) => {
        state.totalNumberInterventionEquipment = action.payload.total;
      },
    );
    generateInifiniteScrollCases(builder, searchPlaceEquipment, {
      loading: 'loadingListEquipPlace',
      moreLoading: 'moreLoadingEquipPlace',
      isListEnd: 'isListEndEquipPlace',
      list: 'equipmentPlaceList',
    });
    builder.addCase(getEquipmentById.pending, state => {
      state.loading = true;
    });
    builder.addCase(getEquipmentById.fulfilled, (state, action) => {
      state.loading = false;
      state.equipment = action.payload;
    });
    generateInifiniteScrollCases(builder, searchEquipmentToLink, {
      loading: 'loadingListEquipToLink',
      moreLoading: 'moreLoadingEquipToLink',
      isListEnd: 'isListEndEquipToLink',
      list: 'equipmentToLinkList',
    });
  },
});

export const {clearEquipment} = equipmentSlice.actions;

export const equipmentReducer = equipmentSlice.reducer;
