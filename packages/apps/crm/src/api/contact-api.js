import {axiosApiProvider} from '@aos-mobile/core';

const contactFields = ['simpleFullName', 'fixedPhone', 'emailAddress.address'];

export async function searchContactWithIds(idList) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.base.db.Partner/search/',
    data: {
      data: {
        criteria: [
          {
            operator: 'in',
            fieldName: 'id',
            value: idList,
          },
        ],
      },
      fields: contactFields,
    },
  });
}
