/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
import {getActiveUserInfo, loginApi, logoutApi} from '../api/login-api';
import {ejectAxios} from '../api/axios-init';
import {apiProviderConfig} from '../apiProviders/config';
import {MfaVerifyErrorCode, saveUrlInStorage, verifyMfaApi} from '../sessions';
import {checkNullString, testUrl} from '../utils';
import {modulesProvider} from '../app';
import {webSocketProvider} from '../websocket';
import {resetConfigs} from './appConfigSlice';
import {userProvider} from '../config';

async function finalizeLogin(
  {token, jsessionId, requestInterceptorId, responseInterceptorId},
  url,
  dispatch,
) {
  const {userId, applicationMode} = await getActiveUserInfo();

  saveUrlInStorage(url);

  apiProviderConfig.setSessionExpired(false);

  modulesProvider.getModuleRegisters().forEach(_f => _f(userId));

  webSocketProvider.initWebSocket({
    baseUrl: url,
    token,
    jsessionId,
  });

  dispatch(resetConfigs());

  return {
    phase: 'session',
    url,
    token,
    jsessionId,
    userId,
    requestInterceptorId,
    responseInterceptorId,
    applicationMode,
  };
}

export const login = createAsyncThunk(
  'auth/login',
  async ({url, username, password, closePopup}, {dispatch}) => {
    const urlWithProtocol = await testUrl(url);
    const result = await loginApi(urlWithProtocol, username, password);

    if (result.kind === 'mfa') {
      closePopup?.();
      return {
        phase: 'mfa',
        url: urlWithProtocol,
        mfaState: {
          username: result.username,
          methods: result.methods,
          emailRetryAfter: result.emailRetryAfter,
        },
      };
    }

    closePopup?.();
    return finalizeLogin(result, urlWithProtocol, dispatch);
  },
);

export const verifyMfa = createAsyncThunk(
  'auth/verifyMfa',
  async ({mfaCode, mfaMethod}, {getState, dispatch, rejectWithValue}) => {
    const {baseUrl, mfaState} = getState()?.auth ?? {};

    if (!baseUrl || !mfaState?.username) {
      return rejectWithValue({code: MfaVerifyErrorCode.SESSION_LOST});
    }

    try {
      const result = await verifyMfaApi(baseUrl, {
        username: mfaState.username,
        mfaCode,
        mfaMethod,
      });
      return finalizeLogin(result, baseUrl, dispatch);
    } catch (e) {
      if (
        e?.code === MfaVerifyErrorCode.INVALID_CODE ||
        e?.code === MfaVerifyErrorCode.SESSION_LOST
      ) {
        return rejectWithValue({code: e.code});
      }
      throw e;
    }
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
    userProvider.clear();

    return;
  },
);

const initialState = {
  loading: false,
  logged: false,
  mfaPending: false,
  mfaState: null,
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
    cancelMfa: state => {
      state.mfaPending = false;
      state.mfaState = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.logged = false;
      state.loading = true;
      state.mfaPending = false;
      state.mfaState = null;
      state.baseUrl = null;
      state.token = null;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const payload = action.payload ?? {};
      state.loading = false;
      state.error = null;

      if (payload.phase === 'mfa') {
        state.logged = false;
        state.mfaPending = true;
        state.mfaState = payload.mfaState;
        state.baseUrl = payload.url;
        return;
      }

      const {
        url,
        token,
        jsessionId,
        userId,
        requestInterceptorId,
        responseInterceptorId,
        applicationMode,
      } = payload;
      state.logged = token != null;
      state.mfaPending = false;
      state.mfaState = null;
      state.userId = userId;
      state.baseUrl = url;
      state.token = token;
      state.jsessionId = jsessionId;
      state.requestInterceptorId = requestInterceptorId;
      state.responseInterceptorId = responseInterceptorId;
      state.applicationMode = applicationMode;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.mfaPending = false;
      state.mfaState = null;
      state.error = {...action.error, url: action.meta?.arg?.url};
    });
    builder.addCase(verifyMfa.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyMfa.fulfilled, (state, action) => {
      const {
        url,
        token,
        jsessionId,
        userId,
        requestInterceptorId,
        responseInterceptorId,
        applicationMode,
      } = action.payload ?? {};
      state.loading = false;
      state.logged = token != null;
      state.mfaPending = false;
      state.mfaState = null;
      state.userId = userId;
      state.baseUrl = url;
      state.token = token;
      state.jsessionId = jsessionId;
      state.requestInterceptorId = requestInterceptorId;
      state.responseInterceptorId = responseInterceptorId;
      state.applicationMode = applicationMode;
      state.error = null;
    });
    builder.addCase(verifyMfa.rejected, (state, action) => {
      state.loading = false;
      const code = action.payload?.code;

      if (code === MfaVerifyErrorCode.SESSION_LOST) {
        state.mfaPending = false;
        state.mfaState = null;
        state.error = {message: MfaVerifyErrorCode.SESSION_LOST};
        return;
      }

      if (code === MfaVerifyErrorCode.INVALID_CODE) {
        state.error = {message: MfaVerifyErrorCode.INVALID_CODE};
        return;
      }

      state.error = {...action.error};
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
      state.mfaPending = false;
      state.mfaState = null;
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

export const {clearError, setAppVersion, updateAuthState, cancelMfa} =
  authSlice.actions;

export const authReducer = authSlice.reducer;
