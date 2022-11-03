import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getModulesConfig} from '../api/menu-config-api';
import {handlerApiCall} from '../api/utils';

export const fetchMenuConfig = createAsyncThunk(
  'menuConfig/fetchMenuConfig',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getModulesConfig,
      data,
      action: 'fetch menu config',
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
    builder.addCase(fetchMenuConfig.pending, state => {
      state.loadingConfig = true;
    });
    builder.addCase(fetchMenuConfig.fulfilled, (state, action) => {
      state.loadingConfig = false;
      state.restrictedMenus = [...action.payload];
    });
  },
});

export const menuConfigReducer = menuConfigSlice.reducer;
