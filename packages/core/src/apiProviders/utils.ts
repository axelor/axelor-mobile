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

import {checkNullString} from '@axelor/aos-mobile-ui';
import {traceError} from '../api/traceback-api';
import {i18nProvider} from '../i18n';
import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {apiProviderConfig} from './config';
import {showToastMessage} from '../utils';
import {requestBuilder} from './Standard/requests.helper';

export const getApiResponseData = (response, {isArrayResponse = true}) => {
  if (response.data && response.data.object != null) {
    return response.data.object;
  }

  const result = response?.data?.data;

  return isArrayResponse
    ? Array.isArray(result)
      ? result
      : []
    : getFirstData(result);
};

const getApiResponseMessage = response =>
  response?.data?.messageStatus || response?.statusTxt;

const getApiResponseCode = response =>
  response?.data?.codeStatus || response?.status;

const getApiResponseTotal = response => response?.data?.total || 0;

export const getFirstData = data => {
  if (data instanceof Array) {
    return data[0];
  }
  return null;
};

const getUser = ({getState}: {getState: () => any}) => {
  return getState()?.auth?.userId;
};

const manageError = (
  error,
  action,
  userId,
  {showErrorToast = true, errorTracing = true},
) => {
  if (error.response) {
    const message =
      error?.response?.data?.messageStatus || error?.response?.statusText;
    const code = error.response?.data?.codeStatus || error?.response?.status;

    if (code === 401) {
      apiProviderConfig.setSessionExpired(true);
      return;
    }

    if (errorTracing) {
      traceError({
        message: 'API request',
        cause: {
          path: error?.response?.request?.responseURL,
          ...(error.response.data ? error.response.data : error),
        },
        userId,
      });
    }

    if (showErrorToast) {
      showToastMessage({
        type: 'error',
        position: 'bottom',
        bottomOffset: 20,
        text1: `${i18nProvider.i18n.t('Auth_Error')} ${code}`,
        text2: `${i18nProvider.i18n.t('Base_Failed_To')} ${i18nProvider.i18n.t(
          action,
        )}: ${i18nProvider.i18n.t(message)}.`,
      });
    }

    return null;
  }
};

export const handlerError = (message, {getState = () => {}}, options) => {
  return error => manageError(error, message, getUser({getState}), options);
};

const manageSucess = (
  response,
  action,
  {
    showToast = false,
    isArrayResponse,
    returnTotal = false,
    resturnTotalWithData = false,
    returnResponseMessage = false,
  },
) => {
  const data = getApiResponseData(response, {isArrayResponse});
  const message = getApiResponseMessage(response);
  const code = getApiResponseCode(response);
  const total = getApiResponseTotal(response);

  if (showToast) {
    showToastMessage({
      type: 'success',
      position: 'bottom',
      bottomOffset: 20,
      text1: i18nProvider.i18n.t('Base_Success'),
      text2: `${message ? message : i18nProvider.i18n.t(action)}.`,
    });
  }

  if (resturnTotalWithData || returnResponseMessage) {
    return {total, data, message, code};
  }

  if (returnTotal) {
    return total;
  }

  return data;
};

const handlerSuccess = (action, options) => {
  return response => manageSucess(response, action, options);
};

interface ApiHandlerProps {
  fetchFunction: (data: any) => Promise<any>;
  data: any;
  action: string;
  getState: () => any;
  responseOptions?: {
    showToast?: boolean;
    isArrayResponse?: boolean;
    returnTotal?: boolean;
    resturnTotalWithData?: boolean;
    returnResponseMessage?: boolean;
  };
  errorOptions?: {
    showErrorToast?: boolean;
    errorTracing?: boolean;
  };
}

export const handlerApiCall = ({
  fetchFunction,
  data,
  action,
  getState,
  responseOptions = {
    showToast: false,
    isArrayResponse: false,
    returnTotal: false,
    resturnTotalWithData: false,
    returnResponseMessage: false,
  },
  errorOptions = {showErrorToast: true, errorTracing: true},
}: ApiHandlerProps) => {
  return fetchFunction(data)
    .then(res => {
      if (res?.data?.status === -1) {
        throw {
          response: {
            status: 403,
            statusText: `${res.data.data?.title}: ${res.data.data?.message}`,
            request: {
              responseURL: res.request.responseURL,
            },
          },
        };
      } else {
        return handlerSuccess(action, responseOptions)(res);
      }
    })
    .catch(handlerError(action, {getState}, errorOptions));
};

type InfiniteScrollStateKeys = {
  loading: string;
  moreLoading: string;
  isListEnd: string;
  list: string;
  total?: string;
};

export const manageInfiteScrollState = (
  state: any,
  action: any,
  status: 'pending' | 'fulfilled' | 'rejected',
  keys: InfiniteScrollStateKeys,
  manageTotal: boolean = false,
  parseData: (data: any[]) => any[] = data => data,
) => {
  const data = parseData(manageTotal ? action.payload?.data : action.payload);
  const total = manageTotal ? action.payload?.total : null;

  if (status === 'pending') {
    if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
      state[keys.loading] = true;
    } else {
      state[keys.moreLoading] = true;
    }
  }

  if (status === 'fulfilled') {
    state[keys.loading] = false;
    state[keys.moreLoading] = false;

    if (!checkNullString(keys.total)) {
      state[keys.total] = total;
    }

    if (Array.isArray(data)) {
      if (action.meta.arg.page > 0) {
        state[keys.list] = [...state[keys.list], ...data];
      } else {
        state[keys.list] = data;
      }

      state[keys.isListEnd] = data.length < requestBuilder.getRequestLimit();
    } else {
      if (!(action.meta.arg.page > 0)) {
        state[keys.list] = [];
      }
      state[keys.isListEnd] = true;
    }
  }

  if (status === 'rejected') {
    state[keys.loading] = false;
    state[keys.moreLoading] = false;
    state[keys.isListEnd] = true;
  }

  return state;
};

export const generateInifiniteScrollCases = (
  builder: ActionReducerMapBuilder<any>,
  actionCreator: any,
  keys: InfiniteScrollStateKeys,
  options?: {
    manageTotal?: boolean;
    parseFunction?: (data: any[]) => any[];
  },
) => {
  builder.addCase(actionCreator.pending, (state, action) => {
    state = manageInfiteScrollState(
      state,
      action,
      'pending',
      keys,
      options?.manageTotal,
      options?.parseFunction,
    );
  });

  builder.addCase(actionCreator.fulfilled, (state, action) => {
    state = manageInfiteScrollState(
      state,
      action,
      'fulfilled',
      keys,
      options?.manageTotal,
      options?.parseFunction,
    );
  });

  builder.addCase(actionCreator.rejected, (state, action) => {
    state = manageInfiteScrollState(
      state,
      action,
      'rejected',
      keys,
      options?.manageTotal,
      options?.parseFunction,
    );
  });
};
