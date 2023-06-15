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
import {Screen, HeaderContainer, NotesCard} from '@axelor/aos-mobile-ui';
import {
  Stopwatch,
  useDispatch,
  useSelector,
  useTranslator,
  getNowDateZonesISOString,
} from '@axelor/aos-mobile-core';
import {
  fetchTicketById,
  updateTicketDuration,
  updateTicketStatus,
} from '../features/ticketSlice';
import {TicketHeader, TicketDropdownCards, TicketBottom} from '../components';
import {fetchTimerById, searchTimerHistoryById} from '../features/timerSlice';
import {Ticket} from '../types';

const TicketDetailsScreen = ({navigation, route}) => {
  const {idTicket, colorIndex} = route.params;
  const I18n = useTranslator();

  const dispatch = useDispatch();
  const {ticket} = useSelector(state => state.ticket);
  const {timer, timerHistory} = useSelector(state => state.timer);

  const duration = useMemo(() => {
    return ticket?.duration;
  }, [ticket?.duration]);

  useEffect(() => {
    dispatch(fetchTicketById({ticketId: idTicket}));
  }, [dispatch, idTicket]);

  useEffect(() => {
    if (ticket?.timerList?.length > 0) {
      console.log('ici');
      dispatch(fetchTimerById({timerId: ticket?.timerList[0]?.id}));
    }
  }, [dispatch, ticket?.timerList]);

  useEffect(() => {
    if (timer?.timerHistoryList?.length > 0) {
      dispatch(searchTimerHistoryById({idTimer: timer?.id}));
    }
  }, [dispatch, timer]);

  /*const updateDurationTicketAPI = useCallback(
    _timer => {
      dispatch(
        updateTicketDuration({
          ticketId: ticket.id,
          ticketVersion: ticket.version,
          duration: _timer,
        }),
      );
    },
    [dispatch, ticket],
  );*/

  const timerInProgress = useMemo(() => {
    console.log(timer?.statusSelect);
    if (timer?.statusSelect === 0) {
      return false;
    }
    return true;
  }, [timer]);

  const timerDuration = useMemo(() => {
    console.log(Ticket.getTotalDuration(timerHistory));
    return Ticket.getTotalDuration(timerHistory);
  }, [timerHistory]);

  const updateStatus = useCallback(
    status => {
      console.log('status', status);
      dispatch(
        updateTicketStatus({
          version: ticket?.id,
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

  //console.log('ticket', ticket);
  console.log('timer', timer);
  //console.log('timerHistory', timerHistory);
  //console.log('timerInProgress', timerInProgress);

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
        <Stopwatch
          startTime={timerDuration}
          timerFormat={I18n.t('Stopwatch_TimerFormat')}
          inProgressAtStart={timerInProgress}
          //onPause={updateDurationTicketAPI}
          onPlay={() => updateStatus(Ticket.stopWatchStatus.start)}
          onPause={() => updateStatus(Ticket.stopWatchStatus.pause)}
          onStop={() => updateStatus(Ticket.stopWatchStatus.stop)}
          onCancel={() => updateStatus(Ticket.stopWatchStatus.reset)}
        />
      </ScrollView>
      <TicketBottom idTicket={idTicket} />
    </Screen>
  );
};

export default TicketDetailsScreen;
