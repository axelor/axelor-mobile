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

import Toast from 'react-native-toast-message';
import {traceError} from '../api/traceback-api';
import {i18nProvider} from '../i18n';

export const getApiResponseData = (response, {isArrayResponse = true}) => {
  if (response.data && response.data.object != null) {
    return response.data.object;
  }
  return isArrayResponse
    ? response?.data?.data
    : getFirstData(response?.data?.data);
};

const getApiResponseMessage = response =>
  response?.data?.messageStatus || response?.statusTxt;

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

    if (errorTracing) {
      traceError({
        message: 'API request',
        cause: error.response.data ? error.response.data : error,
        userId,
      });
    }

    if (showErrorToast) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        bottomOffset: 20,
        text1: `Error ${code}`,
        text2: `${i18nProvider.i18n.t('Base_Failed_To')} ${i18nProvider.i18n.t(
          action,
        )}: ${message}.`,
      });
    }
  }
};

export const handlerError = (
  message,
  {getState = () => {}},
  {showErrorToast, errorTracing}: errorOptionsProps,
) => {
  return error =>
    manageError(error, message, getUser({getState}), {
      showErrorToast,
      errorTracing,
    });
};

const manageSucess = (
  response,
  action,
  {
    showToast = false,
    isArrayResponse,
    returnTotal = false,
    resturnTotalWithData = false,
  },
) => {
  const data = getApiResponseData(response, {isArrayResponse});
  const message = getApiResponseMessage(response);
  const total = getApiResponseTotal(response);

  if (showToast) {
    Toast.show({
      type: 'success',
      position: 'bottom',
      bottomOffset: 20,
      text1: i18nProvider.i18n.t('Base_Success'),
      text2: `${message ? message : i18nProvider.i18n.t(action)}.`,
    });
  }

  if (resturnTotalWithData) {
    return {total, data};
  }

  if (returnTotal) {
    return total;
  }

  return data;
};

const handlerSuccess = (
  action,
  {showToast, isArrayResponse, returnTotal, resturnTotalWithData},
) => {
  return response =>
    manageSucess(response, action, {
      showToast,
      isArrayResponse,
      returnTotal,
      resturnTotalWithData,
    });
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
  };
  errorOptions?: errorOptionsProps;
}

interface errorOptionsProps {
  showErrorToast?: boolean;
  errorTracing?: boolean;
}

export const handlerApiCall = ({
  fetchFunction,
  data,
  action,
  getState,
  responseOptions: {
    showToast = false,
    isArrayResponse = false,
    returnTotal = false,
    resturnTotalWithData = false,
  },
  errorOptions = {showErrorToast: true, errorTracing: true},
}: ApiHandlerProps) => {
  return fetchFunction(data)
    .catch(handlerError(action, {getState}, errorOptions))
    .then(
      handlerSuccess(action, {
        showToast,
        isArrayResponse,
        returnTotal,
        resturnTotalWithData,
      }),
    );
};

export const manageInfiteScrollState = (
  state: any,
  action: any,
  status: 'pending' | 'fulfilled' | 'rejected',
  keys: {loading: string; moreLoading: string; list: string; isListEnd: string},
) => {
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
    if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
      state[keys.list] = action.payload;
      state[keys.isListEnd] = false;
    } else {
      if (action.payload != null) {
        state[keys.isListEnd] = false;
        state[keys.list] = [...state[keys.list], ...action.payload];
      } else {
        state[keys.isListEnd] = true;
      }
    }
  }

  if (status === 'rejected') {
    state[keys.loading] = false;
    state[keys.moreLoading] = false;
  }

  return state;
};
