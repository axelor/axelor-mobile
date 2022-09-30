import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@/api/utils';
import {getBaseConfig} from '../api/config-api';
import {postTranslations} from '@aos-mobile/core';

export const fetchBaseConfig = createAsyncThunk(
  'base/fetchBaseConfig',
  async function (data = {}, {getState}) {
    return handlerApiCall(
      {fetchFunction: getBaseConfig},
      data,
      'fetch base config',
      {getState},
      {array: false},
    );
  },
);

export const uploadTranslations = createAsyncThunk(
  'base/uploadTranslations',
  async function ({language, translations}) {
    return postTranslations(language, translations);
  },
);

const initialState = {
  loading: false,
  baseConfig: {},
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
  },
});

export const {clearMessage} = configSlice.actions;

export const configReducer = configSlice.reducer;
