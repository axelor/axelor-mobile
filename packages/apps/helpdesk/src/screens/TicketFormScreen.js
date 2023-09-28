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

import React, {useCallback, useMemo, useEffect} from 'react';
import {
  useSelector,
  useTranslator,
  useDispatch,
  FormView,
} from '@axelor/aos-mobile-core';
import {createTicket, updateTicket} from '../features/ticketSlice';
import {updateCustomer} from '../features/customerSlice';
import {Ticket} from '../types';

const TicketFormScreen = ({navigation, route}) => {
  const idTicket = route?.params?.idTicket;

  const _dispatch = useDispatch();
  const I18n = useTranslator();

  const {ticket} = useSelector(state => state.ticket);

  const defaultValue = useMemo(() => {
    const _default = {
      duration: 0,
    };

    if (idTicket != null) {
      return {
        ..._default,
        id: ticket?.id,
        version: ticket?.version,
        subject: ticket?.subject,
        progressSelect: ticket?.progressSelect,
        project: ticket.project,
        customerPartner: ticket?.customerPartner,
        contactPartner: ticket?.contactPartner,
        ticketType: ticket?.ticketType,
        prioritySelect: {
          title: Ticket.getPriority(ticket?.prioritySelect, I18n),
          key: ticket.prioritySelect,
        },
        startDateT: ticket?.startDateT,
        endDateT: ticket?.endDateT,
        deadlineDateT: ticket?.deadlineDateT,
        duration: ticket?.duration,
        assignedToUser: ticket?.assignedToUser,
        responsibleUser: ticket?.responsibleUser,
        description: ticket?.description,
      };
    }

    return _default;
  }, [idTicket, ticket, I18n]);

  const createTicketAPI = useCallback((_ticket, dispatch) => {
    const dataToSend = {
      ..._ticket,
      prioritySelect: _ticket?.prioritySelect?.key,
    };
    dispatch(
      createTicket({
        ticket: dataToSend,
      }),
    );
  }, []);

  const updateTicketAPI = useCallback(
    (_ticket, dispatch) => {
      const dataToSend = {
        ..._ticket,
        prioritySelect: _ticket?.prioritySelect?.key,
        ticket: _ticket,
        ticketId: _ticket?.id,
      };
      dispatch(
        updateTicket({
          ticket: dataToSend,
          ticketId: _ticket?.id,
        }),
      );
      navigation.navigate('TicketDetailsScreen', {
        idTicket: _ticket.id,
      });
    },
    [navigation],
  );

  useEffect(() => {
    _dispatch(updateCustomer(null));
  }, [_dispatch]);

  return (
    <FormView
      formKey="helpdesk_ticket"
      defaultValue={defaultValue}
      actions={[
        {
          key: 'create-ticket',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          hideIf: () => idTicket != null,
          customAction: ({dispatch, objectState, handleReset}) => {
            createTicketAPI(objectState, dispatch);
            handleReset();
          },
        },
        {
          key: 'update-ticket',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          hideIf: () => idTicket == null,
          customAction: ({dispatch, objectState}) => {
            return updateTicketAPI(objectState, dispatch);
          },
        },
      ]}
    />
  );
};

export default TicketFormScreen;
