import {
  axiosApiProvider,
  getNextMonth,
  getPreviousMonth,
} from '@axelor/aos-mobile-core';

const eventFields = [
  'startDateTime',
  'endDateTime',
  'statusSelect',
  'typeSelect',
  'subject',
  'contactPartner',
  'user',
  'location',
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

export async function contactEventById(id) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Event/search/',
    data: {
      data: {
        criteria: [
          {
            fieldName: 'contactPartner.id',
            operator: '=',
            value: id,
          },
        ],
      },
      fields: eventFields,
    },
  });
}

export async function getPlannedEvent(date) {
  const startDate = getPreviousMonth(date).toISOString();
  const endDate = getNextMonth(date).toISOString();

  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Event/search',
    data: {
      data: {
        operator: 'or',
        criteria: [
          {
            operator: 'or',
            criteria: [
              {
                operator: 'and',
                criteria: [
                  {
                    fieldName: 'startDateTime',
                    operator: '>=',
                    value: startDate,
                  },
                  {
                    fieldName: 'startDateTime',
                    operator: '<=',
                    value: endDate,
                  },
                ],
              },
              {
                operator: 'and',
                criteria: [
                  {
                    fieldName: 'endDateTime',
                    operator: '>=',
                    value: startDate,
                  },
                  {
                    fieldName: 'startDateTime',
                    operator: '<=',
                    value: endDate,
                  },
                ],
              },
            ],
          },
        ],
      },
      fields: eventFields,
      sortBy: ['startDateTime'],
      limit: null,
    },
  });
}
