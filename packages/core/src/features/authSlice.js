/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getActiveUserId, loginApi} from '../api/login-api';
import {testUrl} from '../utils/api';
import {formatURL} from '../utils/formatters';

export const login = createAsyncThunk(
  'auth/login',
  async ({url, username, password}) => {
    const urlWithProtocol = await testUrl(url);
    const {token, jsessionId} = await loginApi(
      urlWithProtocol,
      username,
      password,
    );
    const userId = await getActiveUserId();
    return {url: urlWithProtocol, token, jsessionId, userId};
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
    logout: state => ({...initialState, baseUrl: state.baseUrl}),
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
