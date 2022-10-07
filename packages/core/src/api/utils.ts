import Toast from 'react-native-toast-message';
import {traceError} from './traceback-api';

export const getApiResponseData = (response, {isArrayResponse = true}) => {
  if (response.data && response.data.object != null) {
    return response.data.object;
  }
  return isArrayResponse
    ? response?.data?.data
    : getFirstData(response?.data?.data);
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
        text2: `Failed to ${action}: ${message}.`,
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

const manageSucess = (response, {showToast = false, isArrayResponse}) => {
  const data = getApiResponseData(response, {isArrayResponse});
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

const handlerSuccess = ({showToast, isArrayResponse}) => {
  return response => manageSucess(response, {showToast, isArrayResponse});
};

interface ApiHandlerProps {
  fetchFunction: (data: any) => Promise<any>;
  data: any;
  action: string;
  getState: () => any;
  responseOptions?: {showToast?: boolean; isArrayResponse?: boolean};
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
  responseOptions: {showToast = false, isArrayResponse = false},
  errorOptions = {showErrorToast: true, errorTracing: true},
}: ApiHandlerProps) => {
  return fetchFunction(data)
    .catch(handlerError(action, {getState}, errorOptions))
    .then(handlerSuccess({showToast, isArrayResponse}));
};
