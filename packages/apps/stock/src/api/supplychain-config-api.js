import {axiosApiProvider} from '@axelor/aos-mobile-core';

export async function fetchSupplychainConfig() {
  return axiosApiProvider.get({
    url: '/ws/rest/com.axelor.apps.base.db.AppSupplychain',
  });
}
