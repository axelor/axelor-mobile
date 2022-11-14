import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {searchMachineFilter} from '../api/machine-api';

export const searchMachines = createAsyncThunk(
  'machines/searchMachine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchMachineFilter,
      data,
      action: 'filter machines',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loading: false,
  machineList: [],
};

const machinesSlice = createSlice({
  name: 'machines',
  initialState,
  extraReducers: builder => {
    builder.addCase(searchMachines.pending, state => {
      state.loading = true;
    });
    builder.addCase(searchMachines.fulfilled, (state, action) => {
      state.loading = false;
      state.machineList = action.payload;
    });
  },
});

export const machinesReducer = machinesSlice.reducer;
