import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {searchUnit} from '@/modules/stock/api/unit-api';

export const fetchUnit = createAsyncThunk(
  'unit/fetchUnit',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchUnit,
      data,
      action: 'fetch units',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingUnit: false,
  unitList: [],
};

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUnit.pending, state => {
      state.loadingUnit = true;
    });
    builder.addCase(fetchUnit.fulfilled, (state, action) => {
      state.loadingUnit = false;
      state.unitList = action.payload;
    });
  },
});

export const unitReducer = unitSlice.reducer;
