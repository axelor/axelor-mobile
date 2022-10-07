import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {fetchSupplychainConfig} from '../api/supplychain-config-api';

export const fetchSupplychainConfigForStockApp = createAsyncThunk(
  'stockAppConfig/fetchSupplychainConfigForStockApp',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: fetchSupplychainConfig,
      data,
      action: 'fetch supplychain config',
      getState,
      responseOptions: {isArrayResponse: false},
      errorOptions: {showErrorToast: false, errorTracing: false},
    });
  },
);

const initialState = {
  loadingConfig: false,
  supplychainConfig: {},
};

const stockAppConfigSlice = createSlice({
  name: 'stockAppConfig',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchSupplychainConfigForStockApp.pending, state => {
      state.loadingConfig = true;
    });
    builder.addCase(
      fetchSupplychainConfigForStockApp.fulfilled,
      (state, action) => {
        state.loadingConfig = false;
        state.supplychainConfig = action.payload;
      },
    );
  },
});

export const stockAppConfigReducer = stockAppConfigSlice.reducer;
