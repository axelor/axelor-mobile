import {axiosApiProvider} from '@aos-mobile/core';

export async function getBaseConfig() {
  return axiosApiProvider.get({
    url: '/ws/rest/com.axelor.apps.base.db.AppBase/',
  });
}
