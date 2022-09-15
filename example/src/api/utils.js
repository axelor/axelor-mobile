import Toast from 'react-native-toast-message';
import {traceError} from './traceback-api';

export const getApiResponseData = (response, {array = true}) => {
  if (response.data && response.data.object != null) {
    return response.data.object;
  }
  return array ? response?.data?.data : getFirstData(response?.data?.data);
};

const getApiResponseCode = response =>
  response?.data?.codeStatus || response?.status;

const getApiResponseMessage = response =>
  response?.data?.messageStatus || response?.statusTxt;

export const getFirstData = data => {
  if (data instanceof Array) {
    return data[0];
  }
  return null;
};

const getUser = ({getState = () => {}}) => {
  return getState()?.auth?.userId;
};

const manageError = (error, action, userId) => {
  if (error.response) {
    const message =
      error?.response?.data?.messageStatus || error?.response?.statusText;
    const code = error.response?.data?.codeStatus || error?.response?.status;

    traceError({
      message: 'API request',
      cause: error.response.data ? error.response.data : error,
      userId,
    });

    Toast.show({
      type: 'error',
      position: 'bottom',
      bottomOffset: 20,
      text1: `Error ${code}`,
      text2: `Failed to ${action}: ${message}.`,
    });
  }
};

export const handlerError = (message, {getState = () => {}}) => {
  return error => manageError(error, message, getUser({getState}));
};

const manageSucess = (response, {showToast = false, array}) => {
  const data = getApiResponseData(response, {array});
  const code = getApiResponseCode(response);
  const message = getApiResponseMessage(response);

  if (showToast) {
    Toast.show({
      type: 'success',
      position: 'bottom',
      bottomOffset: 20,
      text1: `Success ${code}`,
      text2: `${message ? message : 'Request successful'}.`,
    });
  }

  return data;
};

const handlerSuccess = ({showToast = false, array}) => {
  return response => manageSucess(response, {showToast, array});
};

export const handlerApiCall = (
  {fetchFunction = () => {}},
  data = {},
  action = null,
  {getState = () => {}},
  {showToast = false, array = false},
) => {
  return fetchFunction(data)
    .catch(handlerError(action, {getState}))
    .then(handlerSuccess({showToast, array}));
};
