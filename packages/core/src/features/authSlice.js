/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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
import {getActiveUserInfo, loginApi} from '../api/login-api';
import {apiProviderConfig} from '../apiProviders/config';
import {saveUrlInStorage} from '../sessions';
import {checkNullString} from '../utils';
import {testUrl} from '../utils/api';

export const login = createAsyncThunk(
  'auth/login',
  async ({url, username, password, closePopup}) => {
    const urlWithProtocol = await testUrl(url);
    const {token, jsessionId, requestInterceptorId, responseInterceptorId} =
      await loginApi(urlWithProtocol, username, password);
    const {userId, applicationMode} = await getActiveUserInfo();

    saveUrlInStorage(urlWithProtocol);

    apiProviderConfig.setSessionExpired(false);

    closePopup?.();

    return {
      url: urlWithProtocol,
      token,
      jsessionId,
      userId,
      requestInterceptorId,
      responseInterceptorId,
      applicationMode,
    };
  },
);

export const isUrlValid = createAsyncThunk('auth/isUrlValid', async ({url}) => {
  if (!checkNullString(url)) {
    const urlWithProtocol = await testUrl(url);
    return urlWithProtocol;
  }

  return url;
});

export const logout = createAsyncThunk(
  'auth/logout',
  async function (data, {getState}) {
    const {requestInterceptorId, responseInterceptorId} = getState()?.auth;
    axios.interceptors.request.eject(requestInterceptorId);
    axios.interceptors.request.eject(responseInterceptorId);
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
  requestInterceptorId: null,
  responseInterceptorId: null,
  applicationMode: null,
  error: null,
  appVersion: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setAppVersion: (state, action) => {
      state.appVersion = action.payload.appVersion;
    },
    updateAuthState: (state, action) => {
      const {key, value} = action.payload;
      if (key in state) {
        state[key] = value;
      }
    },
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
      const {
        url,
        token,
        jsessionId,
        userId,
        requestInterceptorId,
        responseInterceptorId,
        applicationMode,
      } = action.payload;
      state.logged = token != null;
      state.loading = false;
      state.userId = userId;
      state.baseUrl = url;
      state.token = token;
      state.jsessionId = jsessionId;
      state.error = null;
      state.requestInterceptorId = requestInterceptorId;
      state.responseInterceptorId = responseInterceptorId;
      state.applicationMode = applicationMode;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = {...action.error, url: action.meta?.arg?.url};
    });
    builder.addCase(isUrlValid.fulfilled, (state, action) => {
      state.error = null;
    });
    builder.addCase(isUrlValid.rejected, (state, action) => {
      state.error = {...action.error, url: action.meta?.arg?.url};
    });
    builder.addCase(logout.fulfilled, state => {
      state.logged = false;
      state.loading = false;
      state.userId = null;
      state.token = null;
      state.jsessionId = null;
      state.error = null;
      state.requestInterceptorId = null;
      state.responseInterceptorId = null;
      state.applicationMode = null;
    });
  },
});

export const {clearError, setAppVersion, updateAuthState} = authSlice.actions;

export const authReducer = authSlice.reducer;
