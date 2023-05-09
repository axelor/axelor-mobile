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
import axios from 'axios';
import {getActiveUserId, loginApi} from '../api/login-api';
import {storage} from '../storage/Storage';
import {testUrl} from '../utils/api';
import {URL_STORAGE_KEY} from '../utils/storage-keys';

export const login = createAsyncThunk(
  'auth/login',
  async ({url, username, password}) => {
    const urlWithProtocol = await testUrl(url);
    const {token, jsessionId, interceptorId} = await loginApi(
      urlWithProtocol,
      username,
      password,
    );
    const userId = await getActiveUserId();
    storage.setItem(URL_STORAGE_KEY, urlWithProtocol);
    return {url: urlWithProtocol, token, jsessionId, userId, interceptorId};
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async function (data, {getState}) {
    const interceptorId = getState()?.auth?.interceptorId;
    axios.interceptors.request.eject(interceptorId);
    return;
  },
);

const initialState = {
  loading: false,
  logged: false,
  userId: null,
  baseUrl: null,
  token: null,
  jsessionId: null,
  interceptorId: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.logged = false;
      state.loading = true;
      state.baseUrl = null;
      state.token = null;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const {url, token, jsessionId, userId, interceptorId} = action.payload;
      state.logged = token != null;
      state.loading = false;
      state.userId = userId;
      state.baseUrl = url;
      state.token = token;
      state.jsessionId = jsessionId;
      state.error = null;
      state.interceptorId = interceptorId;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = {...action.error, url: action.meta?.arg?.url};
    });
    builder.addCase(logout.fulfilled, state => {
      state.logged = false;
      state.loading = false;
      state.userId = null;
      state.token = null;
      state.jsessionId = null;
      state.error = null;
      state.interceptorId = null;
    });
  },
});

export const authReducer = authSlice.reducer;
