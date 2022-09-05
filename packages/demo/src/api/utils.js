import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import TraceBackApiAxelor from './TraceBackApiAxelor';

export const getApiResponseData = response => response.data.data;

export const getFirstData = data => {
  if (data instanceof Array) {
    return data[0];
  }
};

export const useHandleError = (error, action: String) => {
  const traceBackApiAxelor = new TraceBackApiAxelor(
    useSelector(state => state.auth.userId),
  );
  if (error.response) {
    console.log('Error got caugth: ');
    if (error.response.data) {
      // Error from API
      console.log(error.response.data);
    } else {
      // Error from path
      console.log(
        `Error ${error.response.status}: Request could not be completed.`,
      );

      traceBackApiAxelor.postError(
        'API request',
        error.response.data ? error.response.data : error,
      );
    }
    Toast.show({
      type: 'error',
      position: 'bottom',
      bottomOffset: 20,
      text1: `Error ${error.response.status}`,
      text2: `Failed to ${action}.`,
    });
  }
};
