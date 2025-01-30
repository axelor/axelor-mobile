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

import React, {useCallback} from 'react';
import {
  useDispatch,
  useSelector,
  useTranslator,
  getNowDateZonesISOString,
} from '@axelor/aos-mobile-core';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {Ticket} from '../../../types';
import {updateTicketStatus} from '../../../features/ticketSlice';

const TicketsStatusButton = ({}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {ticket} = useSelector(state => state.ticket);

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

  if (ticket?.statusSelect === Ticket.status.New) {
    return (
      <Button
        title={I18n.t('Helpdesk_Start')}
        iconName="play"
        onPress={() => updateStatus(Ticket.stopWatchStatus.start)}
        color={Colors.primaryColor}
      />
    );
  }

  if (ticket?.statusSelect === Ticket.status.In_Progress) {
    return (
      <Button
        title={I18n.t('Helpdesk_Resolve')}
        iconName="check"
        onPress={() => updateStatus(Ticket.stopWatchStatus.stop)}
      />
    );
  }

  return null;
};

export default TicketsStatusButton;
