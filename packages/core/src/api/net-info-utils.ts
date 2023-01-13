import {axiosApiProvider} from '../axios/AxiosApi';

interface NetInfoState {
  isConnected: boolean;
}

export async function getNetInfo(): Promise<NetInfoState> {
  return axiosApiProvider
    .get({
      url: 'https://www.google.com/',
    })
    .then(res => ({isConnected: res?.status === 200}))
    .catch(() => {
      return {isConnected: false};
    });
}
