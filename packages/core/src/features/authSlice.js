import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getActiveUserId, loginApi} from '../api/login-api';
import {formatURL} from '../utils/string';

export const login = createAsyncThunk(
  'auth/login',
  async ({url, username, password}) => {
    const {token, jsessionId} = await loginApi(url, username, password);
    const userId = await getActiveUserId();
    return {url, token, jsessionId, userId};
  },
);

const initialState = {
  loading: false,
  logged: false,
  userId: null,
  baseUrl: null,
  token: null,
  jsessionId: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.logged = false;
      state.loading = true;
      state.baseUrl = null;
      state.token = null;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const {url, token, jsessionId, userId} = action.payload;
      state.logged = token != null;
      state.loading = false;
      state.userId = userId;
      state.baseUrl = formatURL(url);
      state.token = token;
      state.jsessionId = jsessionId;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const {logout} = authSlice.actions;

export const authReducer = authSlice.reducer;
