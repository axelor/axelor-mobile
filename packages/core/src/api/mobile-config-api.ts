import {axiosApiProvider} from '../axios/AxiosApi';

export async function getMobileConfigs() {
  return axiosApiProvider
    .get({
      url: '/ws/rest/com.axelor.apps.mobilesettings.db.MobileConfig',
    })
    .then(res => {
      if (res?.status !== 0) {
        return {data: {data: []}};
      }
      return res;
    });
}
