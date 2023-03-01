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
  'organizer',
  'description',
  'lead',
  'partner',
];

const createEventCriteria = (searchValue, startDate, endDate) => {
  let criterias = [];
  criterias.push({
    operator: 'and',
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
  });
  if (searchValue != null) {
    criterias.push({
      operator: 'or',
      criteria: [
        {
          fieldName: 'contactPartner.fullName',
          operator: 'like',
          value: searchValue,
        },
      ],
    });
  }
  return criterias;
};

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

export async function getPlannedEvent({date, searchValue = null}) {
  const startDate = getPreviousMonth(date).toISOString();
  const endDate = getNextMonth(date).toISOString();

  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Event/search',
    data: {
      data: {
        criteria: [
          {
            operator: 'and',
            criteria: createEventCriteria(searchValue, startDate, endDate),
          },
        ],
      },
      fields: eventFields,
      sortBy: ['startDateTime'],
      limit: null,
    },
  });
}

export async function getEvent({eventId}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.crm.db.Event/${eventId}/fetch`,
    data: {
      fields: eventFields,
    },
  });
}
