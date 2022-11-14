import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {searchWorkCenterFilter} from '../api/work-center-api';

export const searchWorkCenters = createAsyncThunk(
  'workCenter/searchWorkCenter',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchWorkCenterFilter,
      data,
      action: 'filter work center',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  workCenterList: [],
};

const workCentersSlice = createSlice({
  name: 'workCenters',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchWorkCenters.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchWorkCenters.fulfilled, (state, action) => {
      state.loading = false;
      state.workCenterList = action.payload;
    });
  },
});

export const workCentersReducer = workCentersSlice.reducer;
