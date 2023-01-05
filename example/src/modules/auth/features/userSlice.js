import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@axelor/aos-mobile-core';
import {getLoggedUser, postUser} from '@/modules/auth/api/user-api';

export const fetchActiveUser = createAsyncThunk(
  'user/fetchActiveUser',
  async function (userId, {getState}) {
    return handlerApiCall({
      fetchFunction: getLoggedUser,
      data: userId,
      action: 'fetch active user',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const updateActiveUser = createAsyncThunk(
  'user/updateActiveUser',
  async function (user, {getState}) {
    return handlerApiCall({
      fetchFunction: postUser,
      data: user,
      action: 'update active user',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

const initialState = {
  loadingUser: true,
  user: {},
  canModifyCompany: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeActiveCompany: (state, action) => {
      state.user = {...state.user, activeCompany: action.payload.newCompany};
    },
    changeDefaultStockLocation: (state, action) => {
      state.user = {
        ...state.user,
        workshopStockLocation: action.payload.newStockLocation,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchActiveUser.pending, state => {
      state.loadingUser = true;
    });
    builder.addCase(fetchActiveUser.fulfilled, (state, action) => {
      state.loadingUser = false;
      state.user = action.payload;
      if (state.user.activeCompany == null) {
        state.canModifyCompany = true;
      }
    });
    builder.addCase(updateActiveUser.pending, state => {
      state.loadingUser = true;
    });
    builder.addCase(updateActiveUser.fulfilled, (state, action) => {
      state.loadingUser = false;
      state.user = action.payload;
      if (state.user.activeCompany == null) {
        state.canModifyCompany = true;
      }
    });
  },
});

export const {changeActiveCompany, changeDefaultStockLocation} =
  userSlice.actions;

export const userReducer = userSlice.reducer;
