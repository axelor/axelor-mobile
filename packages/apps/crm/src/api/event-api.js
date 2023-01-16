import {axiosApiProvider} from '@axelor/aos-mobile-core';

const eventFields = [
  'startDateTime',
  'endDateTime',
  'statusSelect',
  'typeSelect',
  'subject',
];

export async function postEventBIdList(idList) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Event/search/',
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
      fields: eventFields,
    },
  });
}

export async function partnerEventById(id) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Event/search/',
    data: {
      data: {
        criteria: [
          {
            fieldName: 'partner.id',
            operator: '=',
            value: id,
          },
        ],
      },
      fields: eventFields,
    },
  });
}
