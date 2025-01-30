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

import React, {useCallback, useMemo, useEffect} from 'react';
import {useSelector, useDispatch, FormView} from '@axelor/aos-mobile-core';
import {useThemeColor} from '@axelor/aos-mobile-ui';
import {createTicket, updateTicket} from '../features/ticketSlice';
import {getCustomerbyId} from '../features/customerSlice';

const TicketFormScreen = ({navigation, route}) => {
  const idTicket = route?.params?.idTicket;

  const Colors = useThemeColor();
  const _dispatch = useDispatch();

  const {ticket} = useSelector(state => state.ticket);

  const defaultValue = useMemo(() => {
    const _default = {
      duration: 0,
    };

    if (idTicket != null) {
      return {
        ...ticket,
        duration: ticket.duration || _default.duration,
      };
    }

    return _default;
  }, [idTicket, ticket]);

  const createTicketAPI = useCallback((_ticket, dispatch) => {
    dispatch(
      createTicket({
        ticket: _ticket,
      }),
    );
  }, []);

  const updateTicketAPI = useCallback(
    (_ticket, dispatch) => {
      dispatch(
        updateTicket({
          ticket: _ticket,
        }),
      );

      navigation.navigate('TicketDetailsScreen', {
        idTicket: _ticket.id,
      });
    },
    [navigation],
  );

  useEffect(() => {
    _dispatch(getCustomerbyId(null));
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
          color: Colors.cautionColor,
          key: 'reset-ticket',
          type: 'reset',
          hideIf: () => idTicket != null,
        },
        {
          key: 'update-ticket',
          type: 'update',
          needValidation: true,
          needRequiredFields: true,
          hideIf: () => idTicket == null,
          customAction: ({dispatch, objectState}) => {
            updateTicketAPI(objectState, dispatch);
          },
        },
      ]}
    />
  );
};

export default TicketFormScreen;
