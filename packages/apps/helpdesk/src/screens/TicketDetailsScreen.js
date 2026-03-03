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

import React, {useCallback, useEffect} from 'react';
import {
  Screen,
  HeaderContainer,
  NotesCard,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';
import {fetchTicketById} from '../features/ticketSlice';
import {
  TicketHeader,
  TicketDropdownCards,
  TicketEditButton,
  TicketStopwatch,
} from '../components';

const TicketDetailsScreen = ({route}) => {
  const {idTicket} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {loadingTicket, ticket} = useSelector(state => state.ticket);
  const {helpdesk: helpdeskConfig} = useSelector(state => state.appConfig);

  const fetchTicket = useCallback(() => {
    dispatch(fetchTicketById({ticketId: idTicket}));
  }, [dispatch, idTicket]);

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  if (ticket?.id !== idTicket) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer expandableFilter={false} fixedItems={<TicketHeader />} />
      <ScrollView refresh={{loading: loadingTicket, fetcher: fetchTicket}}>
        <NotesCard
          title={I18n.t('Base_Description')}
          data={ticket.description}
        />
        <TicketDropdownCards />
        <TicketStopwatch />
      </ScrollView>
      {ticket?.ticketStatus?.id !== helpdeskConfig?.closedTicketStatus?.id && (
        <TicketEditButton idTicket={idTicket} />
      )}
    </Screen>
  );
};

export default TicketDetailsScreen;
