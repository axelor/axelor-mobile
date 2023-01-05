import {axiosApiProvider} from '@axelor/aos-mobile-core';

export async function searchLanguage() {
  return axiosApiProvider.get({
    url: '/ws/rest/com.axelor.apps.base.db.Language/',
  });
}
