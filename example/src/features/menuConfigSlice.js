import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getStockMenuConfig} from '../api/menu-config-api';
import {handlerApiCall} from '@aos-mobile/core';

export const fetchStockMenuConfig = createAsyncThunk(
  'menuConfig/fetchStockMenuConfig',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getStockMenuConfig,
      data,
      action: 'fetch Stock App Config',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingConfig: false,
  restrictedMenus: [],
};

const menuConfigSlice = createSlice({
  name: 'menuConfig',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchStockMenuConfig.pending, state => {
      state.loadingConfig = true;
    });
    builder.addCase(fetchStockMenuConfig.fulfilled, (state, action) => {
      state.loadingConfig = false;
      state.restrictedMenus = [...action.payload];
    });
  },
});

export const menuConfigReducer = menuConfigSlice.reducer;
