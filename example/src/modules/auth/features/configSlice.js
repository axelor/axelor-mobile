import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall, postTranslations} from '@axelor/aos-mobile-core';
import {getBaseConfig, getMobileSettings} from '../api/config-api';

export const fetchBaseConfig = createAsyncThunk(
  'base/fetchBaseConfig',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getBaseConfig,
      data,
      action: 'fetch base config',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const uploadTranslations = createAsyncThunk(
  'base/uploadTranslations',
  async function ({language, translations}) {
    return postTranslations(language, translations);
  },
);

export const fetchMobileSettings = createAsyncThunk(
  'mobile-settings/fetchMobileSettings',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getMobileSettings,
      data,
      action: 'fetch app mobile settings',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loading: false,
  baseConfig: {},
  mobileSettings: {},
  message: null,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    clearMessage: state => {
      state.message = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBaseConfig.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchBaseConfig.fulfilled, (state, action) => {
      state.loading = false;
      state.baseConfig = action.payload;
    });
    builder.addCase(uploadTranslations.pending, state => {
      state.loading = true;
    });
    builder.addCase(uploadTranslations.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(fetchMobileSettings.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchMobileSettings.fulfilled, (state, action) => {
      state.loading = false;
      state.mobileSettings = action.payload;
    });
  },
});

export const {clearMessage} = configSlice.actions;

export const configReducer = configSlice.reducer;
