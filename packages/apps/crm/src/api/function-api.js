import {axiosApiProvider} from '@axelor/aos-mobile-core';

export async function getFunction() {
  return axiosApiProvider.get({
    url: '/ws/rest/com.axelor.apps.base.db.Function/',
  });
}
