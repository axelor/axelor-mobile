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
import {useSelector, useDispatch, FormView} from '@axelor/aos-mobile-core';
import {createTicket, updateTicket} from '../features/ticketSlice';
import {updateCustomer} from '../features/customerSlice';

const TicketFormScreen = ({navigation, route}) => {
  const idTicket = route?.params?.idTicket;
  const _dispatch = useDispatch();

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
        prioritySelect: ticket?.prioritySelect,
        startDateT: ticket?.startDateT,
        endDateT: ticket?.endDateT,
        deadlineDateT: ticket?.deadlineDateT,
        duration: ticket?.dureation,
        assignedToUser: ticket?.assignedToUser,
        responsibleUser: ticket?.responsibleUser,
        description: ticket?.description,
      };
    }
    return _default;
  }, [idTicket, ticket]);

  const createTicketAPI = useCallback((__ticket, dispatch) => {
    dispatch(
      createTicket({
        ticket: __ticket,
      }),
    );
  }, []);

  const updateTicketAPI = useCallback(
    (__ticket, dispatch) => {
      dispatch(
        updateTicket({
          ticket: __ticket,
          ticketId: ticket?.id,
        }),
      );
      navigation.navigate('TicketDetailsScreen', {
        idTicket: ticket.id,
      });
    },
    [navigation, ticket],
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
          customAction: ({dispatch, objectState}) => {
            return createTicketAPI(objectState, dispatch);
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
