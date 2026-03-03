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

import React, {useCallback} from 'react';
import {
  useDispatch,
  useSelector,
  useTranslator,
  getNowDateZonesISOString,
  usePermitted,
} from '@axelor/aos-mobile-core';
import {Button} from '@axelor/aos-mobile-ui';
import {Ticket} from '../../../types';
import {updateTicketStatus} from '../../../features/ticketSlice';

const TicketStatusButton = ({}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const {readonly} = usePermitted({
    modelName: 'com.axelor.apps.helpdesk.db.Ticket',
  });

  const {ticket} = useSelector(state => state.ticket);
  const {helpdesk: helpdeskConfig} = useSelector(state => state.appConfig);

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

  if (readonly) {
    return null;
  }

  if (ticket?.ticketStatus?.id === helpdeskConfig?.defaultTicketStatus?.id) {
    return (
      <Button
        title={I18n.t('Helpdesk_Start')}
        iconName="play-fill"
        onPress={() => updateStatus(Ticket.stopWatchStatus.start)}
      />
    );
  }

  if (ticket?.ticketStatus?.id === helpdeskConfig?.inProgressTicketStatus?.id) {
    return (
      <Button
        title={I18n.t('Helpdesk_Resolve')}
        iconName="check-lg"
        onPress={() => updateStatus(Ticket.stopWatchStatus.stop)}
      />
    );
  }

  return null;
};

export default TicketStatusButton;
