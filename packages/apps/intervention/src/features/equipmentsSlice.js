import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {searchEquipments as _searchEquipments} from '../api/equipments-api';

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
