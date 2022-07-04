import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handleError} from '@/api/utils';
import {getBaseConfig} from '../api/config-api';

export const fetchBaseConfig = createAsyncThunk(
  'base/fetchBaseConfig',
  async function () {
    return getBaseConfig()
      .catch(function (error) {
        handleError(error, 'fetch base config');
      })
      .then(response => response.data.data[0]);
  },
);

const initialState = {
  loading: false,
  baseConfig: {},
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchBaseConfig.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchBaseConfig.fulfilled, (state, action) => {
      state.loading = false;
      state.baseConfig = action.payload;
    });
  },
});

export const configReducer = configSlice.reducer;
