/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
import {
  ejectAxios,
  getActiveUserInfo,
  loginApi,
  logoutApi,
} from '../api/login-api';
import {apiProviderConfig} from '../apiProviders/config';
import {saveUrlInStorage} from '../sessions';
import {checkNullString, testUrl} from '../utils';
import {modulesProvider} from '../app';
import {webSocketProvider} from '../websocket';
import {resetConfigs} from './appConfigSlice';

export const login = createAsyncThunk(
  'auth/login',
  async ({url, username, password, closePopup}, {dispatch}) => {
    const urlWithProtocol = await testUrl(url);
    const {token, jsessionId, requestInterceptorId, responseInterceptorId} =
      await loginApi(urlWithProtocol, username, password);
    const {userId, applicationMode} = await getActiveUserInfo();

    saveUrlInStorage(urlWithProtocol);

    apiProviderConfig.setSessionExpired(false);

    closePopup?.();

    modulesProvider.getModuleRegisters().forEach(_f => _f(userId));

    webSocketProvider.initWebSocket({
      baseUrl: urlWithProtocol,
      token,
      jsessionId,
    });

    dispatch(resetConfigs());

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
  async function (_, {getState}) {
    await logoutApi();

    const {requestInterceptorId, responseInterceptorId} = getState()?.auth;
    ejectAxios({requestInterceptorId, responseInterceptorId});

    webSocketProvider.closeWebSocket();

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
      Object.entries(action.payload ?? {}).forEach(([key, value]) => {
        state[key] = value;
      });
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
