import {axiosApiProvider} from '@aos-mobile/core';

export async function searchUnit() {
  return axiosApiProvider.get({url: '/ws/rest/com.axelor.apps.base.db.Unit'});
}
