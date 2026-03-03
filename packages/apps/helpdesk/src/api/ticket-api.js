/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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
  createStandardSearch,
  getActionApi,
  getSearchCriterias,
  createStandardFetch,
  formatRequestBody,
} from '@axelor/aos-mobile-core';

const createTicketCriteria = (
  searchValue,
  userId,
  userTeam,
  statusList,
  typeList,
  priorityList,
) => {
  const criteria = [getSearchCriterias('helpdesk_ticket', searchValue)];

  if (userId != null) {
    criteria.push({
      fieldName: 'assignedToUser.id',
      operator: '=',
      value: userId,
    });
  }

  if (userTeam != null) {
    criteria.push({
      fieldName: 'assignedToUser.activeTeam',
      operator: '=',
      value: userTeam,
    });
  }

  if (Array.isArray(statusList) && statusList.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: statusList.map(status => ({
        fieldName: 'ticketStatus.id',
        operator: '=',
        value: status.key,
      })),
    });
  }

  if (Array.isArray(typeList) && typeList.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: typeList.map(type => ({
        fieldName: 'ticketType.id',
        operator: '=',
        value: type.key,
      })),
    });
  }

  if (Array.isArray(priorityList) && priorityList.length > 0) {
    criteria.push({
      operator: 'or',
      criteria: priorityList.map(priority => ({
        fieldName: 'prioritySelect',
        operator: '=',
        value: priority.key,
      })),
    });
  }

  return criteria;
};

const createTicketTypeCriteria = searchValue => {
  return [getSearchCriterias('helpdesk_ticketType', searchValue)];
};

const createTicketStatusCriteria = searchValue => {
  return [getSearchCriterias('helpdesk_ticketStatus', searchValue)];
};

export async function searchTickets({
  searchValue,
  userId,
  userTeam,
  statusList,
  typeList,
  priorityList,
  page = 0,
  filterDomain,
}) {
  return createStandardSearch({
    model: 'com.axelor.apps.helpdesk.db.Ticket',
    criteria: createTicketCriteria(
      searchValue,
      userId,
      userTeam,
      statusList,
      typeList,
      priorityList,
    ),
    fieldKey: 'helpdesk_ticket',
    sortKey: 'helpdesk_ticket',
    page,
    provider: 'model',
    filter: filterDomain,
  });
}

export async function getTicket({ticketId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.helpdesk.db.Ticket',
    id: ticketId,
    fieldKey: 'helpdesk_ticket',
    provider: 'model',
  });
}

export async function getTicketType() {
  return createStandardSearch({
    model: 'com.axelor.apps.helpdesk.db.TicketType',
    fieldKey: 'helpdesk_ticketType',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function getTicketStatus() {
  return createStandardSearch({
    model: 'com.axelor.apps.helpdesk.db.TicketStatus',
    fieldKey: 'helpdesk_ticketStatus',
    numberElementsByPage: null,
    page: 0,
    provider: 'model',
  });
}

export async function searchTicketType({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.helpdesk.db.TicketType',
    criteria: createTicketTypeCriteria(searchValue),
    fieldKey: 'helpdesk_ticketType',
    sortKey: 'helpdesk_ticketType',
    page: page,
    provider: 'model',
  });
}

export async function searchTicketStatus({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.helpdesk.db.TicketStatus',
    criteria: createTicketStatusCriteria(searchValue),
    fieldKey: 'helpdesk_ticketStatus',
    sortKey: 'helpdesk_ticketStatus',
    page: page,
    provider: 'model',
  });
}

export async function updateStatusTicket({
  version,
  dateTime,
  targetStatus,
  ticketId,
}) {
  return getActionApi().send({
    url: `ws/aos/ticket/${ticketId}`,
    method: 'put',
    body: {
      version,
      dateTime,
      targetStatus,
    },
    description: 'update status ticket',
  });
}

export async function updateTicket({ticket}) {
  const {matchers, formattedData} = formatRequestBody(ticket, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.helpdesk.db.Ticket',
    method: 'post',
    body: {
      data: formattedData,
    },
    description: 'update ticket',
    matchers: {
      id: ticket?.id,
      modelName: 'com.axelor.apps.helpdesk.db.Ticket',
      fields: matchers,
    },
  });
}

export async function createTicket({ticket}) {
  const {matchers, formattedData} = formatRequestBody(ticket, 'data');

  return getActionApi().send({
    url: '/ws/rest/com.axelor.apps.helpdesk.db.Ticket',
    method: 'put',
    body: {
      data: formattedData,
    },
    description: 'create ticket',
    matchers: {
      id: Date.now(),
      modelName: 'com.axelor.apps.helpdesk.db.Ticket',
      fields: matchers,
    },
  });
}
