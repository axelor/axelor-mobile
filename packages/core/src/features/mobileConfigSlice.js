import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getMobileConfigs} from '../api/mobile-config-api';
import {handlerApiCall} from '../api/utils';

export const fetchMobileConfig = createAsyncThunk(
  'mobileConfig/fetchMobileConfig',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getMobileConfigs,
      data,
      action: 'fetch mobile configs',
      getState,
      responseOptions: {isArrayResponse: true},
      errorOptions: {showErrorToast: false, errorTracing: false},
    });
  },
);

const initialState = {
  loadingConfig: false,
  mobileConfigs: [],
};

const mobileConfigSlice = createSlice({
  name: 'mobileConfig',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchMobileConfig.pending, state => {
      state.loadingConfig = true;
    });
    builder.addCase(fetchMobileConfig.rejected, state => {
      state.loadingConfig = false;
    });
    builder.addCase(fetchMobileConfig.fulfilled, (state, action) => {
      state.loadingConfig = false;
      state.mobileConfigs = action.payload;
    });
  },
});

export const mobileConfigReducer = mobileConfigSlice.reducer;
