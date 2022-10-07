import {axiosApiProvider} from '@aos-mobile/core/lib';

export async function fetchSupplychainConfig() {
  return axiosApiProvider.get({
    url: '/ws/rest/com.axelor.apps.base.db.AppSupplychain',
  });
}
