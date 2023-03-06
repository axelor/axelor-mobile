import {
  createStandardFetch,
  createStandardSearch,
  getNextMonth,
  getPreviousMonth,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createEventCriteria = (searchValue, date) => {
  const startDate = getPreviousMonth(date).toISOString();
  const endDate = getNextMonth(date).toISOString();

  return [
    {
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
    },
    getSearchCriterias('crm_event', searchValue),
  ];
};

export async function searchEventsByIds(idList) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Event',
    criteria: [
      {
        fieldName: 'id',
        operator: 'in',
        value: idList,
      },
    ],
    fieldKey: 'crm_event',
    numberElementsByPage: null,
    page: 0,
  });
}

export async function partnerEventById(id) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Event',
    criteria: [
      {
        fieldName: 'partner.id',
        operator: '=',
        value: id,
      },
    ],
    fieldKey: 'crm_event',
    numberElementsByPage: null,
    page: 0,
  });
}

export async function contactEventById(id) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Event',
    criteria: [
      {
        fieldName: 'contactPartner.id',
        operator: '=',
        value: id,
      },
    ],
    fieldKey: 'crm_event',
    numberElementsByPage: null,
    page: 0,
  });
}

export async function getPlannedEvent({date, searchValue = null}) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Event',
    criteria: createEventCriteria(searchValue, date),
    fieldKey: 'crm_event',
    sortKey: 'crm_event',
    numberElementsByPage: null,
    page: 0,
  });
}

export async function getEvent({eventId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.crm.db.Event',
    id: eventId,
    fieldKey: 'crm_event',
  });
}
