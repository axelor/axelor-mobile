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

import MyTicketListScreen from './MyTicketListScreen';
import MyTeamTicketListScreen from './MyTeamTicketListScreen';
import TicketDetailsScreen from './TicketDetailsScreen';
import TicketFormScreen from './TicketFormScreen';

export default {
  MyTicketListScreen: {
    title: 'Helpdesk_myTickets',
    component: MyTicketListScreen,
    options: {
      shadedHeader: false,
    },
  },
  MyTeamTicketListScreen: {
    title: 'Helpdesk_myTeamTickets',
    component: MyTeamTicketListScreen,
    options: {
      shadedHeader: false,
    },
  },
  TicketFormScreen: {
    title: 'Helpdesk_Ticket',
    component: TicketFormScreen,
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
