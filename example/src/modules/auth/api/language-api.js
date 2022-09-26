import {axiosApiProvider} from '@aos-mobile/core';

export async function searchLanguage() {
  return axiosApiProvider.get({
    url: '/ws/rest/com.axelor.apps.base.db.Language/',
  });
}
