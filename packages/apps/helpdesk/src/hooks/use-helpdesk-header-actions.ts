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

import {headerActionsProvider, useSelector} from '@axelor/aos-mobile-core';
import {useEffect} from 'react';

const useHeldpeskTicketDetailsActions = () => {
  const {ticket} = useSelector((state: any) => state.ticket);

  useEffect(() => {
    headerActionsProvider.registerModel('helpdesk_ticket_details', {
      model: 'com.axelor.apps.helpdesk.db.Ticket',
      modelId: ticket?.id,
    });
  }, [ticket]);
};

const useHelpdeskMyTicketListActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('helpdesk_myTicket_list', {
      model: 'com.axelor.apps.helpdesk.db.Ticket',
      options: {core_modelFilters: {actionViewName: 'helpdesk.my.ticket.all'}},
    });
  }, []);
};

const useHelpdeskMyTeamTicketListActions = () => {
  useEffect(() => {
    headerActionsProvider.registerModel('helpdesk_myTeamTicket_list', {
      model: 'com.axelor.apps.helpdesk.db.Ticket',
      options: {
        core_modelFilters: {actionViewName: 'helpdesk.my.team.ticket.all'},
      },
    });
  }, []);
};

export const useHelpdeskHeaders = () => {
  useHelpdeskMyTicketListActions();
  useHelpdeskMyTeamTicketListActions();
  useHeldpeskTicketDetailsActions();
};
