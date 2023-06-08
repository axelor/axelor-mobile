/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
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
  getSearchCriterias,
  createStandardFetch,
  axiosApiProvider,
} from '@axelor/aos-mobile-core';

const createTicketCriteria = (searchValue, userId, userTeam) => {
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
  return criteria;
};

const createTicketTypeCriteria = searchValue => {
  return [getSearchCriterias('helpdesk_ticketType', searchValue)];
};

export async function searchTickets({searchValue, userId, page = 0, userTeam}) {
  return createStandardSearch({
    model: 'com.axelor.apps.helpdesk.db.Ticket',
    criteria: createTicketCriteria(searchValue, userId, userTeam),
    fieldKey: 'helpdesk_ticket',
    sortKey: 'helpdesk_ticket',
    page,
  });
}

export async function getTicket({ticketId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.helpdesk.db.Ticket',
    id: ticketId,
    fieldKey: 'helpdesk_ticket',
  });
}

export async function getTicketType() {
  return createStandardSearch({
    model: 'com.axelor.apps.helpdesk.db.TicketType',
    fieldKey: 'helpdesk_ticketType',
    page: 0,
  });
}

export async function searchTicketType({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.helpdesk.db.TicketType',
    criteria: createTicketTypeCriteria(searchValue),
    fieldKey: 'helpdesk_ticketType',
    sortKey: 'helpdesk_ticketType',
    page: page,
  });
}

export async function updateStatusTicket({
  version,
  dateTime,
  targetStatus,
  ticketId,
}) {
  return axiosApiProvider.put({
    url: `ws/aos/ticket/${ticketId}`,
    data: {
      version: version,
      dateTime: dateTime,
      targetStatus: targetStatus,
    },
  });
}

export async function updateTicket({
  ticketId,
  ticketVersion,
  subject,
  projectId,
  progressSelect,
  customerId,
  contactPartnerId,
  ticketTypeId,
  prioritySelect,
  startDateT,
  endDateT,
  description,
}) {
  return axiosApiProvider.post({
    url: '/ws/rest/com.axelor.apps.helpdesk.db.Ticket',
    data: {
      data: {
        id: ticketId,
        version: ticketVersion,
        subject: subject,
        project: projectId ? {id: projectId} : null,
        progressSelect: progressSelect,
        customerPartner: customerId ? {id: customerId} : null,
        contactPartner: contactPartnerId ? {id: contactPartnerId} : null,
        ticketType: ticketTypeId ? {id: ticketTypeId} : null,
        prioritySelect: prioritySelect,
        startDateT: startDateT,
        endDateT: endDateT,
        description: description,
      },
    },
  });
}
