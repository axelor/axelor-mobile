import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getActiveUserId, loginApi} from '@/modules/auth/api/login-api';

const initialState = {
  loading: false,
  logged: false,
  baseUrl: null,
  token: null,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({url, username, password}) => {
    const token = await loginApi(url, username, password);
    global.userId = await getActiveUserId();
    return {url, token};
  },
);

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
      const {url, token} = action.payload;
      state.logged = token != null;
      state.loading = false;
      state.baseUrl = url;
      state.token = token;
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
