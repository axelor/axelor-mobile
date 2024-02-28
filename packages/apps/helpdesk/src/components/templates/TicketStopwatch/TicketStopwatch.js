/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  Stopwatch,
  isEmpty,
  StopwatchType,
  useDispatch,
  useSelector,
  getNowDateZonesISOString,
} from '@axelor/aos-mobile-core';
import {Ticket} from '../../../types';
import TicketsStatusButton from '../TicketsStatusButton/TicketsStatusButton';
import {updateTicketStatus} from '../../../features/ticketSlice';
import {
  fetchTimerById,
  clearTimer,
  searchTimerHistoryById,
} from '../../../features/timerSlice';

const DEFAULT_STATUS = StopwatchType.status.Ready;
const DEFAULT_TIME = 0;

const TicketStopwatch = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {ticket} = useSelector(state => state.ticket);
  const {timer, timerHistory} = useSelector(state => state.helpdesk_timer);
  const {helpdeskConfig} = useSelector(state => state.helpdeskConfig);

  const [timerStatus, setTimerStatus] = useState(DEFAULT_STATUS);
  const [time, setTime] = useState(DEFAULT_TIME);

  useEffect(() => {
    if (ticket?.timerList?.length > 0) {
      dispatch(fetchTimerById({timerId: ticket?.timerList[0]?.id}));
    } else {
      dispatch(clearTimer());
    }
  }, [dispatch, ticket?.timerList]);

  useEffect(() => {
    dispatch(searchTimerHistoryById({idTimer: timer?.id}));
  }, [dispatch, timer]);

  const getTimerState = useCallback(() => {
    const status = !isEmpty(ticket)
      ? Ticket.getTimerState(ticket?.statusSelect, timer?.statusSelect)
      : DEFAULT_STATUS;

    const _time =
      !Array.isArray(ticket?.timerList) ||
      ticket.timerList.length === 0 ||
      ticket.timerList[0]?.id !== timer?.id
        ? DEFAULT_TIME
        : Ticket.getTotalDuration(timerHistory);

    setTimerStatus(status);
    setTime(_time);

    return {status, _time};
  }, [ticket, timer, timerHistory]);

  useEffect(() => {
    getTimerState();
  }, [getTimerState]);

  const disbaled = useMemo(
    () =>
      ticket?.statusSelect === Ticket.status.Closed ||
      ticket?.statusSelect === Ticket.status.Resolved,
    [ticket],
  );

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

  return (
    <View>
      {!helpdeskConfig?.manageTimer ? (
        <TicketsStatusButton />
      ) : (
        <Stopwatch
          startTime={time}
          status={timerStatus}
          getTimerState={getTimerState}
          timerFormat={I18n.t('Stopwatch_TimerFormat')}
          disableStop={timerStatus === StopwatchType.status.Paused}
          onPlay={() => updateStatus(Ticket.stopWatchStatus.start)}
          onPause={() => updateStatus(Ticket.stopWatchStatus.pause)}
          onStop={() => updateStatus(Ticket.stopWatchStatus.stop)}
          onCancel={() => updateStatus(Ticket.stopWatchStatus.reset)}
          disable={disbaled}
        />
      )}
      {ticket?.statusSelect !== Ticket.status.Closed &&
        ticket?.statusSelect !== Ticket.status.New && (
          <Button
            title={I18n.t('Helpdesk_Close')}
            iconName="power-off"
            onPress={() => updateStatus(Ticket.stopWatchStatus.validate)}
            color={Colors.primaryColor}
            disabled={
              ticket?.statusSelect === Ticket.status.Closed ||
              ticket?.statusSelect === Ticket.status.New
            }
          />
        )}
    </View>
  );
};

export default TicketStopwatch;
