/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
  formatRequestBody,
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
    provider: 'model',
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
    provider: 'model',
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
    provider: 'model',
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
    provider: 'model',
  });
}

export async function getEvent({eventId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.crm.db.Event',
    id: eventId,
    fieldKey: 'crm_event',
    provider: 'model',
  });
}

export async function createEvent({event}) {
  return axiosApiProvider.put({
    url: '/ws/rest/com.axelor.apps.crm.db.Event',
    data: {
      data: formatRequestBody(event),
    },
  });
}

export async function updateEvent({event}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.crm.db.Event',
    data: {
      data: formatRequestBody(event),
    },
  });
}
