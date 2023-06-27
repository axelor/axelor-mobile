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

import React, {useEffect, useMemo, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {
  Screen,
  HeaderContainer,
  NotesCard,
  Button,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  Stopwatch,
  useDispatch,
  useSelector,
  useTranslator,
  getNowDateZonesISOString,
} from '@axelor/aos-mobile-core';
import {fetchTicketById, updateTicketStatus} from '../features/ticketSlice';
import {
  TicketHeader,
  TicketDropdownCards,
  TicketEditButton,
  TicketsStatusButton,
} from '../components';
import {fetchTimerById, searchTimerHistoryById} from '../features/timerSlice';
import {Ticket} from '../types';
import {fetchHelpdeskConfig} from '../features/helpdeskConfigSlice';

const TicketDetailsScreen = ({navigation, route}) => {
  const {idTicket, colorIndex} = route.params;
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const dispatch = useDispatch();
  const {ticket} = useSelector(state => state.ticket);
  const {timer, timerHistory} = useSelector(state => state.timer);
  const {helpdeskConfig} = useSelector(state => state.helpdeskConfig);

  useEffect(() => {
    dispatch(fetchHelpdeskConfig());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTicketById({ticketId: idTicket}));
  }, [dispatch, idTicket]);

  useEffect(() => {
    if (ticket?.timerList?.length > 0) {
      dispatch(fetchTimerById({timerId: ticket?.timerList[0]?.id}));
    }
  }, [dispatch, ticket?.timerList]);

  useEffect(() => {
    if (timer?.timerHistoryList?.length > 0) {
      dispatch(searchTimerHistoryById({idTimer: timer?.id}));
    }
  }, [dispatch, timer]);

  const statustimer = useMemo(() => {
    return Ticket.getTimerState(ticket?.statusSelect, timer?.statusSelect);
  }, [ticket, timer]);

  const disbaled = useMemo(() => {
    if (
      ticket?.statusSelect === Ticket.status.Closed ||
      ticket?.statusSelect === Ticket.status.Resolved
    ) {
      return true;
    }
    return false;
  }, [ticket]);

  const timerDuration = useMemo(() => {
    return Ticket.getTotalDuration(timerHistory);
  }, [timerHistory]);

  const updateStatus = useCallback(
    status => {
      dispatch(
        updateTicketStatus({
          version: ticket?.version,
          dateTime: getNowDateZonesISOString(),
          targetStatus: status,
          ticketId: ticket?.id,
        }),
      );
    },
    [dispatch, ticket],
  );

  if (ticket?.id !== idTicket) {
    return null;
  }

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={<TicketHeader colorIndex={colorIndex} />}
      />
      <ScrollView>
        <NotesCard
          title={I18n.t('Base_Description')}
          data={ticket.description}
        />
        <TicketDropdownCards />
        {helpdeskConfig?.manageTimer ? (
          <Stopwatch
            startTime={timerDuration}
            timerFormat={I18n.t('Stopwatch_TimerFormat')}
            status={statustimer}
            onPlay={() => updateStatus(Ticket.stopWatchStatus.start)}
            onPause={() => updateStatus(Ticket.stopWatchStatus.pause)}
            onStop={() => updateStatus(Ticket.stopWatchStatus.stop)}
            onCancel={() => updateStatus(Ticket.stopWatchStatus.reset)}
            disable={disbaled}
          />
        ) : (
          <TicketsStatusButton />
        )}
        {ticket?.statusSelect !== Ticket.status.Closed &&
          ticket?.statusSelect !== Ticket.status.New && (
            <Button
              title={I18n.t('Helpdesk_Close')}
              onPress={() => updateStatus(Ticket.stopWatchStatus.validate)}
              color={Colors.cautionColor}
              disabled={
                ticket?.statusSelect === Ticket.status.Closed ||
                ticket?.statusSelect === Ticket.status.New
              }
            />
          )}
      </ScrollView>
      <TicketEditButton idTicket={idTicket} />
    </Screen>
  );
};

export default TicketDetailsScreen;
