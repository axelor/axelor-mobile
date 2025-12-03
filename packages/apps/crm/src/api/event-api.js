/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
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
  createStandardFetch,
  createStandardSearch,
  formatRequestBody,
  getActionApi,
  getNextMonth,
  getPreviousMonth,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createEventCriteria = ({searchValue, date, isAssigned, userId}) => {
  const criteria = [getSearchCriterias('crm_event', searchValue)];

  if (date != null) {
    const startDate = getPreviousMonth(date, 2).toISOString();
    const endDate = getNextMonth(date, 2).toISOString();

    criteria.push({
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
    });
  }

  if (isAssigned && userId) {
    criteria.push({
      fieldName: 'user.id',
      operator: '=',
      value: userId,
    });
  }

  return criteria;
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

export async function getPlannedEvent({
  searchValue = null,
  date,
  isAssigned,
  userId,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.crm.db.Event',
    criteria: createEventCriteria({searchValue, date, isAssigned, userId}),
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
  const {formattedData, matchers} = formatRequestBody(event, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.crm.db.Event',
    method: 'put',
    body: {
      data: formattedData,
    },
    description: 'create event',
    matchers: {
      modelName: 'com.axelor.apps.crm.db.Event',
      id: Date.now(),
      fields: {
        ...matchers,
      },
    },
  });
}

export async function updateEvent({event}) {
  const {formattedData, matchers} = formatRequestBody(event, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.crm.db.Event',
    method: 'post',
    body: {
      data: formattedData,
    },
    description: 'update event',
    matchers: {
      modelName: 'com.axelor.apps.crm.db.Event',
      id: event.id,
      fields: {
        ...matchers,
      },
    },
  });
}
