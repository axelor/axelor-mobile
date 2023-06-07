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

export async function searchTickets({searchValue, userId, page = 0, userTeam}) {
  return createStandardSearch({
    model: 'com.axelor.apps.helpdesk.db.Ticket',
    criteria: createTicketCriteria(searchValue, userId, userTeam),
    fieldKey: 'helpdesk_ticket',
    sortKey: 'helpdesk_ticket',
    page,
  });
}

export async function getTicketType() {
  return createStandardSearch({
    model: 'com.axelor.apps.helpdesk.db.TicketType',
    fieldKey: 'helpdesk_ticketType',
    numberElementsByPage: null,
    page: 0,
  });
}
