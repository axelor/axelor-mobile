import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {useHandleError} from '@/api/utils';
import {getBaseConfig} from '../api/config-api';

export const fetchBaseConfig = createAsyncThunk(
  'base/fetchBaseConfig',
  async function () {
    return getBaseConfig()
      .catch(function (error) {
        useHandleError(error, 'fetch base config');
      })
      .then(response => response.data.data[0]);
  },
);

const initialState = {
  loading: false,
  baseConfig: {},
  zebraConfig: false,
  filterShowConfig: true,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setZebraConfig: (state, action) => {
      state.zebraConfig = action.payload.zebraConfig;
    },
    toggleZebraConfig: state => {
      state.zebraConfig = !state.zebraConfig;
    },
    setFilterShowConfig: (state, action) => {
      state.filterShowConfig = action.payload.filterShowConfig;
    },
    toggleFilterShowConfig: state => {
      state.filterShowConfig = !state.filterShowConfig;
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
  },
});

export const {
  setFilterShowConfig,
  toggleFilterShowConfig,
  setZebraConfig,
  toggleZebraConfig,
} = configSlice.actions;

export const configReducer = configSlice.reducer;
