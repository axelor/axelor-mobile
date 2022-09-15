import {getStockMenuConfig} from '@/api/app-config';
import {handlerApiCall} from '@/api/utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchStockAppConfig = createAsyncThunk(
  'appConfig/fetchStockAppConfig',
  async function (data = {}, {getState}) {
    return handlerApiCall(
      {fetchFunction: getStockMenuConfig},
      data,
      'fetch Stock App Config',
      {getState},
      {array: true},
    );
  },
);

const initialState = {
  loadingConfig: false,
  stockMenus: [],
};

const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchStockAppConfig.pending, state => {
      state.loadingConfig = true;
    });
    builder.addCase(fetchStockAppConfig.fulfilled, (state, action) => {
      state.loadingConfig = false;
      state.stockMenus = action.payload;
    });
  },
});

export const appConfigReducer = appConfigSlice.reducer;
