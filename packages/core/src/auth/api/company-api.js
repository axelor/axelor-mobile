import {axiosApiProvider} from '@axelor/aos-mobile-core';

const companyFields = ['code', 'name', 'id'];

export async function searchCompany() {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Company/search',
    data: {
      data: null,
      fields: companyFields,
      limit: null,
      offset: 0,
    },
  });
}
