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

import MyTicketListScreen from './MyTicketListScreen';
import MyTeamTicketListScreen from './MyTeamTicketListScreen';
import TicketDetailsScreen from './TicketDetailsScreen';
import TicketFormScreen from './TicketFormScreen';

export default {
  MyTicketListScreen: {
    title: 'Helpdesk_myTickets',
    actionID: 'helpdesk_ticket_list',
    component: MyTicketListScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  MyTeamTicketListScreen: {
    title: 'Helpdesk_myTeamTickets',
    actionID: 'helpdesk_ticket_list',
    component: MyTeamTicketListScreen,
    options: {
      shadedHeader: false,
    },
    isUsableOnShortcut: true,
  },
  TicketFormScreen: {
    title: 'Helpdesk_Ticket',
    component: TicketFormScreen,
    isUsableOnShortcut: true,
  },
  TicketDetailsScreen: {
    title: 'Helpdesk_Ticket',
    component: TicketDetailsScreen,
    actionID: 'helpdesk_ticket_details',
    options: {
      shadedHeader: false,
    },
  },
};

export {MyTicketListScreen};
export {MyTeamTicketListScreen};
export {TicketDetailsScreen};
export {TicketFormScreen};
